import * as React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import {
    Stack,
    TextField,
  } from '@mui/material';

import { useAuth } from '../../../contexts/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

BasicModal.propTypes = {
  open: PropTypes.bool,
  setOpen : PropTypes.func
};
export default function BasicModal( { open, setOpen } ) {
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const EmailSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });
  const { forgotpassword } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: EmailSchema,
    onSubmit: async (values) => {

        const response = await forgotpassword(values.email);
        if(response) {
            handleClose();
            alert("An email has been sent to reset your password.")
            navigate('/login', { replace: true });  
        }
        else
            alert("Error occured while resetting!")
      }
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Reset password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Stack>
        <br/>

<Stack>
<LoadingButton
          fullWidth
          size="small"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Reset password
        </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}