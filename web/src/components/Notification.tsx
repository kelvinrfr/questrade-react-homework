import { Snackbar } from '@mui/material';

interface NotificationProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export default function Notification({ open, message, onClose }: NotificationProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      message={message}
    />
  );
}
