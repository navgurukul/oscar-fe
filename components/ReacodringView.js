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
  Snackbar,
  Alert,
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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ReacodringView = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Mobile
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md")); // Tablets
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
  const [showEraseConfirmation, setShowEraseConfirmation] = useState(false);
  const [tooltipTexts, setTooltipTexts] = useState({
    copy: "Copy to clipboard",
    share: "Share note",
    download: "Download note",
    delete: "Delete note",
    restart: "Restart recording",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedNoteOpen, setSelectedNoteOpen] = useState(false);

  const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const handleToggleRecordingDialog = async () => {
    try {
      // Check microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // If permission is granted, open the dialog and start recording
      setIsDialogOpen(true);
    } catch (error) {
      // Show an alert if microphone permission is denied
      alert(
        "Microphone permission is disabled. Please enable it in your browser settings to start recording."
      );
    }
  };

  const handleKeepRecording = () => {
    setIsResetDialogOpen(false);
    setShowEraseConfirmation(false);
    startTimer();
  };

  const handleCloseDialog = () => {
    setIsResetDialogOpen(true); // Open the reset confirmation dialog instead of closing the main dialog
    clearInterval(timerRef.current);
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
    setShowEraseConfirmation(false);
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
      // handleStartRecording(); // Start the recording process immediately
    }, 100); // Small delay to ensure the dialog closes and reopens correctly
  };

  const handleStartRecording = async () => {
    try {
      // Check microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Proceed with recording if permission is granted
      localStorage.setItem("finalText", "");
      setTranscript("");
      setCorrectedTranscript("");
      setIsRecord(true);
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

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
        localStorage.setItem(
          "finalText",
          finalTranscript + interimTranscript.trim()
        );
      };
      recognitionRef.current.start();
      startTimer();
    } catch (error) {
      // Show an alert if microphone permission is denied
      alert(
        "Microphone permission is disabled. Please enable it in your browser settings to start recording."
      );
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setTimeout(async () => {
            await handleStopRecording();
          }, 500);
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    const value = localStorage.getItem("finalText");
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecord(false);
      // console.log("Recorded text:", transcript);
      setIsLoading(true);
      // run(transcript);
      run(value);
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/transcriptions/add`,
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/transcriptions`,
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
      setSnackbarMessage("Note saved successfully!");
      setSnackbarOpen(true); // Show Snackbar
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/transcriptions/${noteToDelete.id}`,
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
      setSelectedNoteOpen(false);
      setSnackbarMessage("Note deleted successfully!");
      setSnackbarOpen(true); // Show Snackbar
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

  const ShowEraseConfirmationFunction = () => {
    setShowEraseConfirmation(true);
    clearInterval(timerRef.current);
  };

  const handleCloseShowEraseConfirmation = () => {
    setShowEraseConfirmation(false);
    setIsDialogOpen(false);
    setTranscript("");
    setCorrectedTranscript("");
    clearInterval(timerRef.current);
    setTimer(3 * 60); // Reset timer to 3 minutes

    setTimeout(() => {
      handleStartRecording(); // Start the recording process immediately
    }, 100);
  };

  // Function to close the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Function to open the dialog with the selected note
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setSelectedNoteOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setSelectedNoteOpen(false);
    setSelectedNote(null);
  };
  return (
    <Box
      style={{
        margin: 0,
        // minHeight: "100vh",
        height: "100vh",
        backgroundColor: notes.length > 0 ? "#fff" : "#EEF6F5",
      }}
    >
      <AudioHeader notes={notes} />
      <Box
        className={notes.length > 0 ? styles.container : styles.containerEmpty}
      >
        <Box className={styles.box}>
          <Typography variant="h6" color={"#4D4D4D"} pb={4}>
            My Transcripts ({notes.length})
          </Typography>
          {!notes.length > 0 ? (
            <Box className={styles.transcriptBox}>
              <Image
                src="/images/undraw_just_saying_re_kw9c 1.svg"
                alt="Get it on Google Play"
                width={100}
                height={100}
                style={{
    maxWidth: "100%",  // Allows the image to scale within its container
    height: "auto",    // Maintains the aspect ratio
  }}
              />
              <Typography
                variant="subtitle1"
                color={"#4D4D4D"}
                align="center"
                pt={2}
              >
                We are excited to see what your first transcription will be
              </Typography>
            </Box>
          ) : (
            <Box className={styles.notesContainer}>
              {notes.map((note, index) => (
                <Box
                  key={index}
                  className={styles.noteCard}
                  onClick={() => handleNoteClick(note)}
                >
                  <Box className={styles.noteTextContainer}>
                    <Typography variant="body2" className={styles.noteText}>
                      {note.transcribedText}
                    </Typography>
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
            position: notes.length > 0 ? "fixed" : "static",
            bottom: notes.length > 0 ? "0px" : "auto",
            backgroundColor: notes.length > 0 ? "#fff" : "#EEF6F5",
            padding: notes.length > 0 ? "10px" : "0px",
            textAlign: "center",
            height: "auto",
            width: "100%",
          }}
        >
          <Typography variant="subtitle1" color="#4D4D4D" pb={2}>
            {notes.length > 0 && "Transcribe your thoughts with a click"}
          </Typography>
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
                  <MicIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Typography>
            {!notes.length > 0 && (
              <Typography variant="body2" color={"#4D4D4D"}>
                Tap the mic to start
              </Typography>
            )}
          </Typography>
        </Box>
        <Dialog
          open={isDialogOpen}
          // onClose={handleCloseDialog}
          // onClose={() => setIsDialogOpen(false)}

          onClose={
            isRecord || correctedTranscript
              ? ShowEraseConfirmationFunction
              : null
          }
          // onClose={ShowEraseConfirmationFunction}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#B9D9D7",
              // height: !isRecord ? "600px" : "auto",
              height: isSmallScreen ? "auto" : "500px", // Adjust height for small screens
              width: isSmallScreen ? "90vw" : "1000px", // Responsive width
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DialogTitle
            sx={{ color: "#4d4d4d", textAlign: "center", fontWeight: "600" }}
          >
            {isRecord && !correctedTranscript && "Listening to your thoughts"}
            {correctedTranscript && transcript && "Your transcript is ready!"}
            {correctedTranscript && !transcript && "Please Provide Text"}
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
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: isSmallScreen ? "30px" : "60px",
            }}
          >
            {!correctedTranscript && isRecord && (
              <IconButton
                onClick={handleCloseDialog}
                color="secondary"
                sx={{
                  padding: isSmallScreen ? "8px" : "12px",
                  backgroundColor: "#51a09b",
                }}
              >
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
                      onClick={handleResetRecording}
                      color="secondary"
                    >
                      <RestartAltIcon sx={{ color: "#51A09B" }} />
                    </IconButton>
                  </Tooltip>
                  {correctedTranscript && transcript && (
                    <>
                      <Tooltip title={tooltipTexts.copy}>
                        <IconButton
                          onClick={() => handleCopyNote(correctedTranscript)}
                          color="primary"
                        >
                          <ContentCopyIcon sx={{ color: "#51A09B" }} />
                        </IconButton>
                      </Tooltip>
                      {/* <Tooltip title={tooltipTexts.download}>
                    <IconButton onClick={handleDownloadNote} color="primary">
                      <DownloadIcon sx={{ color: "#51A09B" }} />
                    </IconButton>
                  </Tooltip> */}
                      <Tooltip title={tooltipTexts.delete}>
                        <IconButton
                          onClick={handleDeleteCurrentNote}
                          color="primary"
                        >
                          <DeleteOutlineIcon sx={{ color: "#51A09B" }} />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Box>
              </>
            )}
            {isRecord && !correctedTranscript ? (
              <IconButton
                onClick={handleStopRecording}
                color="primary"
                sx={{
                  padding: isSmallScreen ? "8px" : "12px",
                  backgroundColor: "#51a09b",
                }}
              >
                <StopIcon sx={{ color: "#fff" }} />
              </IconButton>
            ) : correctedTranscript && transcript ? (
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
            <Button
              onClick={handleCloseDeleteDialog}
              color="secondary"
              variant="contained"
            >
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
            <Typography fontWeight={400} fontSize="18px">
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
        <Dialog
          open={showEraseConfirmation}
          // onClose={handleCloseShowEraseConfirmation}
        >
          <DialogTitle>
            {!correctedTranscript
              ? "Doing this action will erase the current audio recording. Do you still wish to continue?"
              : "Doing this action will delete your transcript. Do you still wish to continue?"}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={handleCloseShowEraseConfirmation}
              color="secondary"
              variant="contained"
              // sx={{ border: "2px solid gray" }}
            >
              {!correctedTranscript ? "Erase" : "Yes"}
            </Button>
            <Button
              onClick={handleKeepRecording}
              color="primary"
              variant="contained"
              // sx={{ border: "2px solid gray" }}
              autoFocus
            >
              {!correctedTranscript ? "Keep Recording" : "No"}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog to show selected note details */}
        <Dialog
          open={selectedNoteOpen}
          onClose={handleClose}
          fullWidth
          // PaperProps={{
          //   style: {
          //     backgroundColor: "transparent",
          //     boxShadow: "12px 12px 12px 12px #fff",
          //   },
          // }}
          // BackdropProps={{
          //   style: {
          //     backgroundColor: "transparent",
          //   },
          // }}
        >
          <DialogContent>
            {/* Container for both cards (Note card + Action card) */}
            <Box className={styles.popupContainer}>
              {/* Note content - full visibility */}
              <Box className={styles.popupNoteCard}>
                <Typography variant="body2">
                  {selectedNote && selectedNote.transcribedText}
                </Typography>
              </Box>

              {/* Action card with icons */}
              <Box className={styles.popupActionCard}>
                <Tooltip title="Copy">
                  <IconButton
                    className={styles.popupActionIcon}
                    onClick={() => handleCopyNote(selectedNote.transcribedText)}
                  >
                    <ContentCopyIcon
                      sx={{ color: "#51A09B", fontSize: "20px" }}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    className={styles.popupActionIcon}
                    onClick={() => handleDeleteNote(selectedNote.id)}
                  >
                    <DeleteOutlineIcon
                      sx={{ color: "#51A09B", fontSize: "23px" }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Separate Button below the cards */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Button variant="contained" onClick={handleClose}>
                Go to Dashboard
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Snackbar component */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};
export default ReacodringView;
