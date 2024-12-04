import { Alert, AlertProps, Snackbar } from "@mui/material";

interface NotificationProps {
  open: boolean;
  message: string;
  severity: string;
  onClose: () => void;
}

export default function Notification({
  open,
  message,
  severity,
  onClose
}: NotificationProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
    >
      <Alert
        onClose={onClose}
        severity={severity as AlertProps["severity"]}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
