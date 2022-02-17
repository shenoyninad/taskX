import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontFamily: 'Bebas Neue',
  width: 400,
  height: 500,
  bgcolor: '#faebd7',
  color: 'black',
  border: '2px solid #000',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
};

const stylePersonal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontFamily: 'Bebas Neue',
  width: 400,
  height: 500,
  bgcolor: '#faebd7',
  color: 'black',
  border: '2px solid #000',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
};

const styleProfessional = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontFamily: 'Bebas Neue',
  width: 400,
  height: 500,
  bgcolor: '#82c5c2;',
  color: 'black',
  border: '2px solid #000',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
};

export default function AddTaskModal(props) {

  const modalRef = useRef(null);
  const [modalTaskType, setModalTaskType] = useState("personal");
  const [modalDescription, setModalDescription] = useState("");
  const [modalEmail, setModalEmail] = useState("");

  const handleRadioChange = (event) => {
    setModalTaskType(event.target.value);
    console.log(modalRef.current);
    if (event.target.value === "personal") {
      modalRef.current.sx = { stylePersonal }
    } else {
      modalRef.current.sx = { styleProfessional }
    }
  }

  const handleModalCancel = () => {
    props.handleAddTaskClose();
    setModalDescription("");
    setModalEmail("");
    setModalTaskType("personal");
  }
  return (
    <>
      <Modal
        open={props.isModalOpen && true}
        onClose={props.handleAddTaskClose}
        aria-labelledby="add-task-title"
      >
        <Box sx={modalTaskType === "personal" ? stylePersonal : styleProfessional} ref={modalRef}>
          <Typography id="add-task-title" variant="h6" component="h2">
            Add Task
          </Typography>
          <br />
          <FormControl>
            <FormLabel id="task-type-modal-label">Task type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="task-type-modal-label"
              name="task-type-modal-group"
              value={modalTaskType}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="personal" control={<Radio />} label="Personal" />
              <FormControlLabel value="professional" control={<Radio />} label="Professional" />
            </RadioGroup>
            <br />
            <Box
              sx={{
                width: 400,
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth id="outlined-basic" label="Task description" variant="outlined" value={modalDescription} onChange={(e) => setModalDescription(e.target.value)} />
            </Box>
            <br />
            <Box
              sx={{
                width: 400,
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth id="outlined-basic" label="Send email to" variant="outlined" value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} />
            </Box>
            <br />
            <br />
            <Box
              sx={{
                width: 400,
                maxWidth: '100%',
              }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Date & Time picker"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <br />
            <br />
            <Stack spacing={2} direction="row">
              <Button variant="contained" color="success">Add</Button>
              <Button variant="contained" color="error" onClick={handleModalCancel}>Cancel</Button>
            </Stack>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}