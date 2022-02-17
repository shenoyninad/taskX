import './common.css';
import Image from '../src/images/tx.png'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import AddTaskModal from './components/AddTaskModal';

const theme = createTheme({
  palette: {
    primary: {
      main: '#adff2f',
    },
    secondary: {
      main: '#adff2f',
    },
  },
});

function TaskXApplication() {

  const [openModal, setOpenModal] = useState(false);
  const handleAddTaskOpen = () => setOpenModal(true);
  const handleAddTaskClose = () => setOpenModal(false);

  return (
    <div>
      <section className='header-section'>
        <img src={Image} />
      </section>
      <section className='auth-section'>
      </section>
      <section className='task-add-section'>
        <ThemeProvider theme={theme}>
          <Button size="small" variant="outlined" color='secondary' onClick={handleAddTaskOpen}>add task</Button>
        </ThemeProvider>
      </section>
      <AddTaskModal handleAddTaskClose={handleAddTaskClose} isModalOpen={openModal} />
    </div>
  );
}

export default TaskXApplication;
