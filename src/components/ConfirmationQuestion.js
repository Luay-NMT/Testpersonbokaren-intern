import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from "@mui/material/styles";

export default function ConfirmationQuestion({ open , onClose, Id, onConfirm, message, warningMessage, title}) {

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
            {message} {Id}?< br/>
            {warningMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton variant="contained" color ="success" startIcon={<CheckCircleIcon />} onClick={onConfirm}>Ja</StyledButton>
          <StyledButton variant="contained" color ="error" startIcon={<CancelIcon />} onClick={onClose} autoFocus>
            Nej
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}