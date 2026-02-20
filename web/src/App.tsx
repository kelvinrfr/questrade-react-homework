import { Box, Button, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import { createLotteryAsync } from './services/LotteryService';

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

const validationSchema = yup.object({
  name: yup.string().min(3, 'Must be at least 3 characters').required('Name is required'),
  prize: yup.string().min(3, 'Must be at least 3 characters').required('Prize is required'),
});

function App() {
  const [open, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [openToast, setOpenToast] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: { name: '', prize: '' },
    validationSchema,
    onSubmit: (values) => {
      console.log(`These are the values: ${values.name}, ${values.prize}`);
      setIsLoading(true);
      createLotteryAsync(values.name, values.prize)
        .then(() =>{
          setOpenToast(true);
          setOpenModal(false);
        }).finally(() => {
          setIsLoading(false);
        });
    },
  });

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
            onSubmit={formik.handleSubmit}>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new lottery 
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              use this form to add a new loterry
            </Typography>
            <Stack spacing={2} sx={{ mt: 2}}>
              <TextField 
                label="Lottery name" 
                variant="standard" 
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField 
                label="Lottery prize" 
                variant="standard" 
                name="prize"
                value={formik.values.prize}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.prize && Boolean(formik.errors.prize)}
                helperText={formik.touched.prize && formik.errors.prize}
              />
              <Button 
                variant="contained" 
                type="submit"
                loading={isLoading}>
                New
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Snackbar
          open={openToast}
          autoHideDuration={2000}
          onClose={() => setOpenToast(false)}
          message="Lottery added successfully"
        />
      </div>
    </>
  );
}

export default App;
