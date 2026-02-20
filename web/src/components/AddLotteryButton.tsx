import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

interface AddLotteryButtonProps {
  onClick: () => void;
}

export default function AddLotteryButton({ onClick }: AddLotteryButtonProps) {
  return (
    <Button onClick={onClick} variant="contained" startIcon={<Add />}>
      Add Lottery
    </Button>
  );
}
