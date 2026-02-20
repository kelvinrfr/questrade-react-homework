import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { SentimentDissatisfied, SearchOff } from '@mui/icons-material';
import type { Lottery } from '../services/LotteryService';
import LotteryCard from './LotteryCard';

interface LotteryListProps {
  lotteries: Lottery[];
  loading: boolean;
  selectedIds: string[];
  onSelect: (id: string) => void;
  hasFilter?: boolean;
}

export default function LotteryList({ lotteries, loading, selectedIds, onSelect, hasFilter }: LotteryListProps) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (lotteries.length === 0 && hasFilter) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <SearchOff fontSize="large" />
        <Typography variant="h6">No lotteries match your search</Typography>
      </Box>
    );
  }

  if (lotteries.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <SentimentDissatisfied fontSize="large" />
        <Typography variant="h6">There are no lotteries currently</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2, px: 4 }}>
      {lotteries.map((lottery) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={lottery.id}>
          <LotteryCard
            lottery={lottery}
            selected={selectedIds.includes(lottery.id)}
            onSelect={onSelect}
          />
        </Grid>
      ))}
    </Grid>
  );
}
