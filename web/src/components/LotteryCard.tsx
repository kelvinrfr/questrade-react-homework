import { Card, CardContent, CardActionArea, Typography } from '@mui/material';
import { Sync } from '@mui/icons-material';
import type { Lottery } from '../services/LotteryService';

interface LotteryCardProps {
  lottery: Lottery;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function LotteryCard({ lottery, selected, onSelect }: LotteryCardProps) {
  const isFinished = lottery.status === 'finished';

  return (
    <Card
      variant="outlined"
      sx={{
        opacity: isFinished ? 0.5 : 1,
        borderColor: selected ? 'primary.main' : undefined,
        borderWidth: selected ? 2 : 1,
      }}
    >
      <CardActionArea
        disabled={isFinished}
        onClick={() => onSelect(lottery.id)}
      >
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {lottery.name}
            <Sync fontSize="small" color={isFinished ? 'disabled' : 'action'} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lottery.prize}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {lottery.id}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
