import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useIdleTimer } from "react-idle-timer";
import { Typography } from "@mui/material";

import style from "./session.module.css";

export default function SessionTimeout({ resetSession }) {
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120000);
  const timeout = 1000 * 60 * 20; // 15 minutes (adjust as needed)
  const idleTimerRef = useRef(null);

  const onIdle = () => {
    setIsSessionExpired(true);
  };
  const { reset } = useIdleTimer({
    ref: idleTimerRef,
    timeout: timeout,
    onIdle: onIdle,
  });

  const continueSession = () => {
    setIsSessionExpired(false);
    // if (!isSessionExpired) {
    resetTimer(); // Call the resetTimer function to reset the timer
    // }
  };
  const resetTimer = () => {
    // Reset the timer to 2 minutes
    setTimeLeft(120000);
  };
  useEffect(() => {
    if (isSessionExpired) {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1000); // Count down by 1 second
        } else {
          setIsSessionExpired(true); // Optionally set isSessionExpired to true again
          resetSession();
        }
      }, 1000);

      // Clear the timer when the component unmounts or when the session is continued
      return () => {
        clearInterval(timer);
      };
    }
  }, [isSessionExpired, timeLeft]);

  return (
    <>
      {/* <IdleTimer ref={idleTimerRef} timeout={timeout} onIdle={onIdle} /> */}
      <Dialog open={isSessionExpired}>
        <DialogContent>
          {/* <DialogContentText>
            Your session will expire in{" "}
            <Typography variant="span" sx={{ color: "red" }}>
              {Math.ceil(timeLeft / 1000)}
            </Typography>{" "}
            seconds. Do you want to log in again or continue your session?
          </DialogContentText> */}
          <DialogContentText>
            Your session will expire in{" "}
            <Typography variant="span" sx={{ color: "red" }}>
              {Math.floor(timeLeft / 60000)}:
              {((timeLeft % 60000) / 1000).toFixed(0).padStart(2, "0")}
            </Typography>{" "}
            minutes. Do you want to log out or continue your session?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={resetSession}
            sx={{
              border: "1px solid #6DCCDD",
              color: "#6DCCDD",
              "&:hover": {
                border: "1px solid #6DCCDD",
              },
            }}
            variant="outlined"
          >
            Log out
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={continueSession}
            className={style.commonBtn}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
