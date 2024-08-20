import { useState, useRef, useEffect } from "react";
import {
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import styles from "../styles/RecoardingView.module.css";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import ReacodringLoader from "./RecoardingAnimation.jsx";
import ProcessingAnimation from "./ProcessingAnimation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Image from "next/image";
import AudioHeader from "./AudioHeader";
import Tooltip from "@mui/material/Tooltip";

const ReacodringView = () => {
  const [isTransAvbl, setIsTransAvbl] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [correctedTranscript, setCorrectedTranscript] = useState("");
  const [timer, setTimer] = useState(3 * 60); // 3 minutes in seconds
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [tooltipTexts, setTooltipTexts] = useState({
    copy: "Copy to clipboard",
    share: "Share note",
    download: "Download note",
    delete: "Delete note",
    restart: "Restart recording",
  });

  const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const handleToggleRecordingDialog = () => {
    setIsDialogOpen(true);
  };

  const handleKeepRecording = () => {
    setIsResetDialogOpen(false);
    
  };

  const handleCloseDialog = () => {
    setIsResetDialogOpen(true); // Open the reset confirmation dialog instead of closing the main dialog
  };

  const handleResetRecording = () => {
    setIsLoading(false); // Ensure the loading state is reset
    setIsRecord(false);
    setTranscript("");
    setCorrectedTranscript("");
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    clearInterval(timerRef.current);
    setTimer(3 * 60); // Reset timer to 3 minutes
    setIsResetDialogOpen(false); // Close the reset confirmation dialog

    setTimeout(() => {
      setIsDialogOpen(true); // Reopen the recording dialog
      handleStartRecording(); // Start the recording process immediately
    }, 100); // Small delay to ensure the dialog closes and reopens correctly
  };

  const handleResetRecordingLast = () => {
    setIsLoading(false); // Ensure the loading state is reset
    setIsRecord(false);
    // setTranscript("");
    // setCorrectedTranscript("");
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    clearInterval(timerRef.current);
    setTimer(3 * 60); // Reset timer to 3 minutes
    setIsDialogOpen(false); // Close the current dialog

    setTimeout(() => {
      setIsDialogOpen(true); // Reopen the dialog to start recording again
      handleStartRecording(); // Start the recording process immediately
    }, 100); // Small delay to ensure the dialog closes and reopens correctly
  };

  const handleStartRecording = () => {
    setCorrectedTranscript("");
    setIsRecord(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    // recognitionRef.current.lang = "en-US";

    let finalTranscript = "";

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + " ";
        } else {
          interimTranscript += result[0].transcript + " ";
        }
      }
      setTranscript(finalTranscript + interimTranscript.trim());
    };

    recognitionRef.current.start();
    startTimer();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleStopRecording();
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecord(false);
      // console.log("Recorded text:", transcript);
      setIsLoading(true);
      run(transcript);
    }
    clearInterval(timerRef.current);
    setTimer(3 * 60); // Reset timer to 3 minutes
  };

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  async function run(transcript) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Correct the following text for grammar, spelling, and clarity:\n\n"${transcript}"\n\n and return only the corrected text`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      // Simulate a 5-second delay before setting the corrected text
      setTimeout(() => {
        setCorrectedTranscript(text);
        // console.log("AI Corrected Text:", text);
        setIsLoading(false);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  const saveTranscriptToAPI = async (transcript) => {
    try {
      const response = await fetch(
        "https://dev-oscar.merakilearn.org/api/v1/transcriptions/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("googleToken")}`,
          },
          body: JSON.stringify({ transcribedText: transcript }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save transcript to API");
      }

      const data = await response.json();
      // console.log("Transcript saved:", data);
      return data; // Return the saved note
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const fetchTranscriptions = async () => {
    try {
      const response = await fetch(
        "https://dev-oscar.merakilearn.org/api/v1/transcriptions",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("googleToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transcriptions");
      }

      const data = await response.json();
      setNotes(data.data.map((item) => item));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTranscriptions();
  }, []);

  const handleSaveNote = async () => {
    const savedNote = await saveTranscriptToAPI(correctedTranscript);
    if (savedNote) {
      setNotes((prevNotes) => [...prevNotes, savedNote]);
      fetchTranscriptions(); // Fetch the updated list of notes
    }
    setCorrectedTranscript("");
    setIsDialogOpen(false);
  };

  const handleDeleteNote = (id) => {
    setNoteToDelete({ id });
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteNote = async () => {
    try {
      const response = await fetch(
        `https://dev-oscar.merakilearn.org/api/v1/transcriptions/${noteToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("googleToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete note from API");
      }

      // Remove the deleted note from the notes state
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteToDelete.id)
      );

      // If no notes are left, set isTransAvbl to false
      if (notes.length === 1) {
        setIsTransAvbl(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setNoteToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  useEffect(() => {
    if (isDialogOpen && !isRecord) {
      handleStartRecording();
    }
  }, [isDialogOpen]);

  const handleTooltipChange = (key, newValue) => {
    setTooltipTexts((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleDownloadNote = () => {
    handleTooltipChange("download", "Note downloaded");
    const element = document.createElement("a");
    const file = new Blob([correctedTranscript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
    setTimeout(() => handleTooltipChange("download", "Download note"), 2000);
  };

  const handleCopyNote = (correctedTranscript) => {
    navigator.clipboard.writeText(correctedTranscript).then(() => {
      handleTooltipChange("copy", "Copied!");
      setTimeout(() => handleTooltipChange("copy", "Copy to clipboard"), 2000);
    });
  };

  const handleDeleteCurrentNote = () => {
    // Delete the current note
    handleTooltipChange("delete", "Note deleted");
    setCorrectedTranscript("");
    setIsDialogOpen(false);
  };

  return (
    <Box
      style={{
        margin: 0,
        minHeight: "100vh",
        backgroundColor: notes.length > 0 ? "#fff" : "#EEF6F5",
      }}
    >
      <AudioHeader notes={notes} />
      <Box className={styles.container}>
        <Box className={styles.box}>
          <Typography variant="h5" mb={2} fontWeight={700} color={"#51A09B"}>
            My Transcripts ({notes.length})
          </Typography>
          {!notes.length > 0 ? (
            <Box className={styles.transcriptBox}>
              <Image
                src="/images/undraw_just_saying_re_kw9c 1.png"
                alt="Get it on Google Play"
                width={100}
                height={100}
              />
              <Typography variant="h6" align="center" color={"#4D4D4D"}>
                We are excited to see what your first transcription will be
              </Typography>
            </Box>
          ) : (
            <Box className={styles.notesBox}>
              {notes.map((note, index) => (
                <Box key={index} className={styles.noteBox}>
                  <Box className={styles.noteContent}>
                    <Typography variant="body1" className={styles.noteText}>
                      {note.transcribedText}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" gap="90px" mb={-1}>
                    <Tooltip title={tooltipTexts.copy}>
                      <IconButton
                        edge="end"
                        aria-label="copy"
                        onClick={() => handleCopyNote(note.transcribedText)}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={tooltipTexts.download}>
                      <IconButton
                        edge="end"
                        aria-label="download"
                        onClick={() => handleDownloadNote(note.transcribedText)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={tooltipTexts.delete}>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Box
          className={styles.micTextContainer}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: notes.length > 0 ? "fixed" : "static", // Adjust position
            bottom: notes.length > 0 ? "20px" : "auto", // Place at bottom if notes are available
            marginBottom: notes.length > 0 ? "0" : "20px", // Adjust margin bottom accordingly
          }}
        >
          <Box
            className={`${styles.micContainer}`}
            style={{ marginBottom: "10px" }}
          >
            <Box className={styles.outerCircle}>
              <Box className={styles.innerCircle}>
                <IconButton
                  sx={{ color: "#fff" }}
                  onClick={handleToggleRecordingDialog}
                >
                  <MicIcon sx={{ fontSize: "32px" }} />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Typography fontWeight={700} fontSize="18px" zIndex={1000}>
            {notes.length > 0 ? (
              "Transcribe your thoughts in a click"
            ) : (
              <Typography variant="h6" align="center" fontWeight={700} color={"#51A09B"}>
                Tap the mic to start
              </Typography>
            )}
          </Typography>
        </Box>
        <Dialog
          open={isDialogOpen}
          // onClose={handleCloseDialog}
          onClose={()=>setIsDialogOpen(false)}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#B9D9D7",
              // height: !isRecord ? "600px" : "auto",
              height: "500px",
              width:"1000px"
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DialogTitle sx={{ color: "#4d4d4d", textAlign: "center" ,fontWeight:"600"}}>
            {isRecord && !correctedTranscript && "Listening to your thoughts"}
            {correctedTranscript && "Your transcript is ready!"}
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
            }}
          >
            {!correctedTranscript && (
              <>
                <Typography variant="h6" sx={{ color: "#4d4d4d" }}>
                  {isRecord
                    ? `${Math.floor(timer / 60)}:${("0" + (timer % 60)).slice(
                        -2
                      )}`
                    : ""}
                </Typography>
                <Typography variant="body1" sx={{ color: "#4d4d4d" }}>
                  {isRecord ? (
                    <ReacodringLoader />
                  ) : (
                    <ProcessingAnimation time={timer} />
                  )}
                </Typography>
              </>
            )}
            {correctedTranscript && (
              <Typography variant="body1" sx={{ color: "#4d4d4d", mt: 2 }}>
                {correctedTranscript}
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center",gap:"60px" }}>
            {!correctedTranscript && isRecord && (
              <IconButton onClick={handleCloseDialog} color="secondary" sx={{padding:"12px",backgroundColor:"#51a09b"}}>
                <RestartAltIcon sx={{ color: "#fff" }} />
              </IconButton>
            )}
            {correctedTranscript && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  <Tooltip title={tooltipTexts.restart}>
                    <IconButton
                      onClick={handleResetRecordingLast}
                      color="secondary"
                    >
                      <RestartAltIcon sx={{ color: "#51A09B" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={tooltipTexts.copy}>
                    <IconButton
                      onClick={() => handleCopyNote(correctedTranscript)}
                      color="primary"
                    >
                      <ContentCopyIcon sx={{ color: "#51A09B" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={tooltipTexts.download}>
                    <IconButton onClick={handleDownloadNote} color="primary">
                      <DownloadIcon sx={{ color: "#51A09B" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={tooltipTexts.delete}>
                    <IconButton
                      onClick={handleDeleteCurrentNote}
                      color="primary"
                    >
                      <DeleteOutlineIcon sx={{ color: "#51A09B" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            )}
            {isRecord && !correctedTranscript ? (
              <IconButton onClick={handleStopRecording} color="primary" sx={{padding:"12px",backgroundColor:"#51a09b",}}>
                <StopIcon sx={{ color: "#fff" }} />
              </IconButton>
            ) : correctedTranscript ? (
              <Button
                onClick={handleSaveNote}
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
        <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this note?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={confirmDeleteNote}
              color="primary"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={isResetDialogOpen} onClose={handleKeepRecording}>
          <DialogTitle sx={{ fontWeight: 700, mb: "0" }}>
            Reset the Recording
          </DialogTitle>
          <DialogContent mt={0}>
            <Typography fontWeight={400} fontFamily="Karla" fontSize="18px">
              Resetting the recording will erase the current audio note and{" "}
              <br />
              start a new one.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleResetRecording} sx={{ border: "1px solid" }}>
              Reset
            </Button>
            <Button onClick={handleKeepRecording} variant="contained">
              Keep Recording
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};
export default ReacodringView;
