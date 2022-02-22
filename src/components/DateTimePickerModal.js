import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import StaticDateTimePicker   from '@mui/lab/StaticDateTimePicker';
import Button from '@mui/material/Button';

import moment from 'moment';

SimpleDialog.propTypes = {
    open : PropTypes.bool,
    handleClose : PropTypes.func,
    setDate : PropTypes.func,
    date : PropTypes.any
}

export default function SimpleDialog( { open, handleClose , setDate, date }) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose event date/time</DialogTitle>
      <LocalizationProvider dateAdapter={DateAdapter}>

            <StaticDateTimePicker
                displayStaticWrapperAs="desktop"
                value={date}
                minDate = {moment(new Date())}
                onChange={(newValue) => {
                  console.log(newValue);
                setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
            <DialogActions>
          <Button variant = "contained" onClick={() => {
              setDate(null);
              handleClose();
          }}>Cancel</Button>
          <Button variant = "contained" onClick={handleClose}>Confrim</Button>
        </DialogActions>
    </Dialog>
  );
}

