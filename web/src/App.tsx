import React from 'react';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { Add, Casino, Search } from '@mui/icons-material';
import AddLotteryModal from './components/AddLotteryModal';
import RegisterModal from './components/RegisterModal';
import LotteryList from './components/LotteryList';
import Notification from './components/Notification';
import { fetchLotteriesAsync, type Lottery} from './services/LotteryService';

function App() {
  const [lotteries, setLotteries] = React.useState<Lottery[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const [filter, setFilter] = React.useState('');
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openRegisterModal, setOpenRegisterModal] = React.useState(false);
  const [toast, setToast] = React.useState({ open: false, message: '' });

  const loadLotteries = React.useCallback(() => {
    setLoading(true);
    fetchLotteriesAsync()
      .then(setLotteries)
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    loadLotteries();
  }, [loadLotteries]);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleLotteryAdded = () => {
    setToast({ open: true, message: 'Lottery added successfully' });
    loadLotteries();
  };

  const handleRegistered = () => {
    setToast({ open: true, message: 'Registered to lotteries' });
    setSelectedIds([]);
  };

  const filteredLotteries = lotteries.filter((l) =>
    l.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ pb: 10 }}>
      <Typography variant="h3" align="center" sx={{ mt: 4 }}>
        Lotteries <Casino fontSize="large" />
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, px: 4 }}>
        <TextField
          placeholder="Search lotteries"
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: 300 }}
        />
      </Box>

      <LotteryList
        lotteries={filteredLotteries}
        loading={loading}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        hasFilter={filter.length > 0}
      />

      <AddLotteryModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSuccess={handleLotteryAdded}
      />

      <RegisterModal
        open={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
        onSuccess={handleRegistered}
        selectedLotteryIds={selectedIds}
      />

      <Notification
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: '' })}
      />

      <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          disabled={selectedIds.length === 0}
          onClick={() => setOpenRegisterModal(true)}
        >
          Register
        </Button>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenAddModal(true)}
        >
          Add Lottery
        </Button>
      </Box>
    </Box>
  );
}

export default App;
