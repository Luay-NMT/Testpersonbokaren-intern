import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { newGroup, updateGroup } from '../APICalls';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from "@mui/material/styles";

export default function AddOrUpdateGroupForm({ open , onClose, onConfirm, groupId, type, title, name, setName, shortName, setShortName}) {
  const [isShortNameInvalid, setIsShortNameInvalid] = useState(false);
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const StyledButton = styled(Button)(`
  text-transform: none;
  `);

  function setInitialState(){
    setName("");
    setShortName("");
    setIsShortNameInvalid(false);
    setIsNameInvalid(false);
  }
  const handleSubmit = e => {
    if(name !== ""){
      setIsNameInvalid(false);
    }else {
      setIsNameInvalid(true);
    }

    if(shortName !== ""){
      setIsShortNameInvalid(false);
    }else {
      setIsShortNameInvalid(true);
    }




    
    if (name !== "" && shortName !=="") {
      if (type === "newGroup"){
        newGroup(name, shortName);
      }else if (type === "updateGroup"){
        updateGroup(name, shortName, groupId);
      }
      onConfirm();

      
      setInitialState();

    } 

  };
  
  return (
    <div>
      
      <Dialog open={open} onClose={onClose}
        PaperProps={{
          sx: {
            width: "50%",
            height: '80%'
          }
        }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          
          <DialogContentText>För att lägga till grupp, vänligen fyll i alla uppgifter nedan</DialogContentText>
          <TextField
            error={isShortNameInvalid}
            helperText={isShortNameInvalid && "Vänligen ange ett kortnamn"}
            margin="dense"
            id="shortName"
            label="Kortnamn"
            type="name"
            fullWidth
            variant="outlined"
            value={shortName}
            onChange={(event) => {
              setShortName(event.target.value);
            }}
          />
          <TextField
            error={isNameInvalid}
            helperText={isNameInvalid && "Vänligen ange ett gruppnamn"}
            margin="dense"
            id="name"
            label="Fullständigt namn"
            type="name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          
           
          
        </DialogContent>
        <DialogActions>
          <StyledButton variant="contained" color ="success" startIcon={<CheckCircleIcon />} onClick={() => {handleSubmit(); }}>Bekräfta</StyledButton>
          <StyledButton variant="contained" color ="error" startIcon={<CancelIcon />} onClick={() => { setInitialState(); onClose()}} >Avbryt</StyledButton>
        </DialogActions>
      </Dialog>



    </div>
  );
}