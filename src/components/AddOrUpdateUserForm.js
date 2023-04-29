import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from "react";
import{getAllGroups, newUser, updateUser} from '../APICalls'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from "@mui/material/styles";

export default function AddOrUpdateUserForm({ open , onClose, onConfirm, userId, type, title, name, setName, shortName, setShortName, organisation, setOrganisation}) {
  const [inputValue, setInputValue] = React.useState('');
  const [isShortNameInvalid, setIsShortNameInvalid] = useState(false);
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isOrganisationInvalid, setIsOrganisationInvalid] = useState(false);
  const [groups, setGroups] = useState([]);
  const StyledButton = styled(Button)(`
  text-transform: none;
  `);

  useEffect(() => {
    getAllGroups().then((res) =>{
     setGroups(res.data);
 
    });
   }, []);

  function setInitialState(){
    setName("");
    setShortName("");
    setOrganisation(null);
    setIsShortNameInvalid(false);
    setIsNameInvalid(false);
    setIsOrganisationInvalid(false);
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


    if(organisation !== null){
      setIsOrganisationInvalid(false);
    }else{
      setIsOrganisationInvalid(true);
    }

    
    if (name !== "" && shortName !=="" && organisation !== null) {
      if (type === "newUser"){
        newUser(name, shortName, organisation.group);
      }else if (type === "updateUser"){
        updateUser(name, shortName, userId, organisation.id);

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
          
          <DialogContentText>För att lägga till användare, vänligen fyll i alla uppgifter nedan</DialogContentText>
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
            helperText={isNameInvalid && "Vänligen ange ett användarnamn"}
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
          
           <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={groups}
            autoHighlight
            fullWidth
            
            getOptionLabel={(option) => `${option.groupName} (${option.group})`}
            isOptionEqualToValue={(option, value) => option.id === value.id}

            value={organisation}
            onChange={(event, newValue) => {
              setOrganisation(newValue);
            }}
            inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
           
            renderInput = {(params) => <TextField {...params}error={isOrganisationInvalid}
            helperText = {isOrganisationInvalid && "Vänligen välj en grupp från listan"} label="Grupp" />}
    />
          
        </DialogContent>
        <DialogActions>
          <StyledButton variant="contained" color ="success" startIcon={<CheckCircleIcon />} onClick={() => {handleSubmit();}}>Bekräfta</StyledButton>
          <StyledButton variant="contained" color ="error" startIcon={<CancelIcon />} onClick={() => { setInitialState(); onClose()}}>Avbryt</StyledButton>
        </DialogActions>
      </Dialog>



    </div>
  );
}