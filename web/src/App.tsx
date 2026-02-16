import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [lotteryName, setLotteryName] = React.useState("");
  const [lotteryPrize, setLotteryPrize] = React.useState("");

  const handleNewLottery = () => {
    console.log(`These are the values: ${lotteryName}, ${lotteryPrize}`);
  }

  return (
    <>
      <div>
        <h1>Vite + React</h1>
        
        <Button onClick={handleOpen} variant="contained" startIcon={<Add />}>
          Add Lottery
        </Button>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            component="form"
            autoComplete="off"
            onSubmit={(e: React.SubmitEvent) => {
              e.preventDefault();
              handleNewLottery();
            }}>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new lottery 
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              use this form to add a new loterry
            </Typography>
            <Stack spacing={2} sx={{ mt: 2}}>
              <TextField 
                required
                label="Lottery name" 
                variant="standard" 
                value={lotteryName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLotteryName(event.target.value);
                }}/>
              <TextField 
                required
                label="Lottery prize" 
                variant="standard" 
                value={lotteryPrize}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLotteryPrize(event.target.value);
                }}/>              
                <Button 
                  variant="contained"
                  type='submit'>
                  New
                </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default App;
