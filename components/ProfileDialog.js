import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Divider,
  Box,
} from "@mui/material";

const ProfileDialog = ({ open, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [openAccountDialog, setOpenAccountDialog] = useState(false);
  const [openPlanDialog, setOpenPlanDialog] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [openDemoDialog, setOpenDemoDialog] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("googleUser"));
    setUserDetails(user.user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("googleUser");
    localStorage.removeItem("googleToken");
    onClose();
    window.location.href = "/";
  };

  const handleOpenAccountDialog = () => setOpenAccountDialog(true);
  const handleOpenPlanDialog = () => setOpenPlanDialog(true);
  const handleOpenFeedbackDialog = () => setOpenFeedbackDialog(true);
  const handleOpenDemoDialog = () => setOpenDemoDialog(true);

  const handleCloseAccountDialog = () => setOpenAccountDialog(false);
  const handleClosePlanDialog = () => setOpenPlanDialog(false);
  const handleCloseFeedbackDialog = () => setOpenFeedbackDialog(false);
  const handleCloseDemoDialog = () => setOpenDemoDialog(false);
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle textAlign="center">Student Details</DialogTitle>
        <DialogContent>
          {userDetails ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={2}
            >
              <Avatar
                alt={userDetails.firstName}
                src={userDetails.profilePicUrl}
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography variant="h6">
                {userDetails.firstName} {userDetails.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {userDetails.email}
              </Typography>
              {/* Add other details as needed */}
              <Divider sx={{ width: "100%", my: 2 }} />
              <Button
                onClick={handleOpenAccountDialog}
                variant="outlined"
                fullWidth
              >
                Account & Wallet Balance
              </Button>
              <Button
                onClick={handleOpenPlanDialog}
                variant="outlined"
                fullWidth
                sx={{ mt: 1 }}
              >
                Plan Type
              </Button>
              <Button
                onClick={handleOpenFeedbackDialog}
                variant="outlined"
                fullWidth
                sx={{ mt: 1 }}
              >
                Feedback
              </Button>
              <Button
                onClick={handleOpenDemoDialog}
                variant="outlined"
                fullWidth
                sx={{ mt: 1 }}
              >
                Demo File
              </Button>
            </Box>
          ) : (
            <Typography variant="body1">No user details found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} variant="contained" color="primary">
            Logout
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Account Dialog */}
      <Dialog
        open={openAccountDialog}
        onClose={handleCloseAccountDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle textAlign="center">Account & Wallet Balance</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Name: {userDetails ? userDetails.name : "N/A"}
          </Typography>
          <Typography variant="body1">
            Free transcripts remaining:{" "}
            {userDetails ? userDetails.freeTranscripts : "N/A"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAccountDialog}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Plan Type Dialog */}
      <Dialog
        open={openPlanDialog}
        onClose={handleClosePlanDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle textAlign="center">Plan Type</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Plan Type: {userDetails ? userDetails.planType : "N/A"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClosePlanDialog}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog
        open={openFeedbackDialog}
        onClose={handleCloseFeedbackDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle textAlign="center">Feedback</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Click the button below to send your feedback to us.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              (window.location.href = "give specific email to send feedback")
            }
            variant="contained"
            color="primary"
          >
            Send Feedback
          </Button>
          <Button
            onClick={handleCloseFeedbackDialog}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Demo File Dialog */}
      <Dialog
        open={openDemoDialog}
        onClose={handleCloseDemoDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle textAlign="center">Demo File</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Click the button below to watch a demo video on how to use the app.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              window.open(
                "https://www.youtube.com/watch?v=demo_video_link",
                "_blank"
              )
            }
            variant="contained"
            color="primary"
          >
            Watch Demo
          </Button>
          <Button
            onClick={handleCloseDemoDialog}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileDialog;



// import React from "react";
// import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";

// const ProfileDialog = ({ open, onClose }) => {
//   const handleLogout = () => {
//     localStorage.removeItem("googleUser");
//     localStorage.removeItem("googleToken");
//     onClose();
//     window.location.href = "/";
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="xs"
//       fullWidth
//     >
//       <DialogTitle sx={{textAlign:"center"}}>Manage Your Profile</DialogTitle>
//       <DialogActions>
//         <Button onClick={handleLogout} variant="contained" color="primary">
//           Logout
//         </Button>
//         <Button onClick={onClose} variant="outlined" color="secondary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ProfileDialog;
