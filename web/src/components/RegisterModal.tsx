import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import { registerForLotteryAsync } from '../services/LotteryService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedLotteryIds: string[];
}

export default function RegisterModal({ open, onClose, onSuccess, selectedLotteryIds }: RegisterModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await Promise.all(
          selectedLotteryIds.map((id) => registerForLotteryAsync(id, values.name))
        );
        formik.resetForm();
        onClose();
        onSuccess();
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" autoComplete="off" onSubmit={formik.handleSubmit}>
        <Typography variant="h6">Register for a lottery</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Enter your name"
            variant="standard"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Button variant="outlined" type="submit" loading={isLoading}>
            Register
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
