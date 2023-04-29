import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from "@mui/material/styles";

export default function ConfirmationMessage({ open , onClose, testpersons, message, title}) {
  var text;
  if(testpersons!=null)
    text = testpersons.toString()
  const StyledButton = styled(Button)(`
  text-transform: none;
  `);
  return (
    <div>

      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}< br/>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton variant="contained" color ="success"startIcon={<CheckCircleIcon />} onClick={onClose} autoFocus>
            Okej
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}