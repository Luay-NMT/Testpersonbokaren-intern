import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from "react";
import { getAllUsers, newBooking, updateBooking } from '../APICalls';
import { styled } from "@mui/material/styles";

export default function AddOrUpdateBookingForm({ open , onClose, onConfirm, testpersons, type, title, name, setName, email, setEmail, organisation, setOrganisation, inputValue, setInputValue}) {

  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isOrganisationInvalid, setIsOrganisationInvalid] = useState(false);
  const [users, setUsers] = useState([]);
  const StyledButton = styled(Button)(`
  text-transform: none;
  `);
  useEffect(() => {
    getAllUsers().then((res) =>{
     setUsers(res.data);
    });
   }, []);
  
  function setInitialState(){
    setEmail("");
    setName("");
    setOrganisation(null);
    setIsEmailInvalid(false);
    setIsNameInvalid(false);
    setIsOrganisationInvalid(false);
  }
  const handleSubmit = e => {
    let validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(name !== "" && name.toLowerCase().indexOf(",") === -1){
      setIsNameInvalid(false);
    }else {
      setIsNameInvalid(true);
    }

    if(validateEmail.test(email)){
      setIsEmailInvalid(false);
    }else {
      setIsEmailInvalid(true);
    }


    if(organisation !== null){
      setIsOrganisationInvalid(false);
    }else{
      setIsOrganisationInvalid(true);
    }

    
    if (name !== "" && name.toLowerCase().indexOf(",") === -1 && validateEmail.test(email) && organisation !== null) {
      const logRef = name + ", " +email;
      const userId = organisation.userId;
      if(type ==="newBooking"){
        newBooking(logRef, testpersons, userId)
      }else if (type === "updateBooking"){
        updateBooking(logRef, testpersons, userId)


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
          
          <DialogContentText>För att bekräfta bokningen, vänligen fyll i alla uppgifter nedan</DialogContentText>
          
          <TextField
            error={isNameInvalid}
            helperText={isNameInvalid && "Vänligen ange ett giltigt namn"}
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
          <TextField
            error={isEmailInvalid}
            helperText={isEmailInvalid && "Vänligen ange en giltig e-postadress"}
            margin="dense"
            id="email"
            label="E-postadress"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
           <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={users}
            autoHighlight
            fullWidth
            getOptionLabel={(option) => `${option.fullName}` ` (${option.shortName})`}
            isOptionEqualToValue={(option, value) => option.userId === value.userId}
            value={organisation}
            onChange={(event, newValue) => {
              setOrganisation(newValue);
            }}
            inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
           
            renderInput = {(params) => <TextField {...params}error={isOrganisationInvalid}
            helperText = {isOrganisationInvalid && "Vänligen välj en organisation från listan"} label="Organisation" />}
    />
          
        </DialogContent>
        <DialogActions>
          <StyledButton variant="contained" color ="success"startIcon={<CheckCircleIcon />} onClick={() => {
            handleSubmit();
            }}>Bekräfta</StyledButton>
          <StyledButton variant="contained" color ="error"startIcon={<CancelIcon />} onClick={() => { setInitialState(); onClose()}}> Avbryt </StyledButton>
        </DialogActions>
      </Dialog>




    </div>
  );
}