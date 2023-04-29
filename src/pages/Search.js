import React from 'react'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAllGroups } from '../APICalls';
import { styled, createTheme,ThemeProvider } from "@mui/material/styles";
import Button from '@mui/material/Button';


function Search() {
    const [searchId, setSearchId] = React.useState("");
    const [searchGroup, setSearchGroup] = React.useState(null);
    const [groups, setGroups] = useState([]);
    const [inputGroupValue, setInputGroupValue] = React.useState('');
    const [min, setMin] = React.useState("");
    const [max, setMax] = React.useState("");
    const [type, setType] = React.useState(1);

    const StyledButton = styled(Button)(`
    text-transform: none;
    `);
    const theme = createTheme( { palette: { primary: { main: '#1d5a7a' } } } );
function getSearchResult(searchValue, type){
  navigate({
    pathname: '/searchresult',
    search: `type=${type}&value=${searchValue}`,
  });
  
}
function getAgeSpan(min, max){
  if(type === 1)
    navigate({
      pathname: '/searchresult',
      search: `type=agespan&min=${min}&max=${max}`,
    });
  else if(type === 2)
  navigate({
    pathname: '/searchresult',
    search: `type=birthyear&min=${min}&max=${max}`,
  });

}



    const navigate = useNavigate();


    useEffect(() => {
      getAllGroups().then((res) =>{
       setGroups(res.data);
   
      });
     }, []);

    
    return (
      <ThemeProvider theme={theme}>

        <div style={{position:'relative'}}>
            
            <div style={{marginTop: '50px', marginLeft: '50px'}}>
            <Typography variant ="h6">Sök efter Personnummer</Typography>   
            <TextField
                sx={{ m: 1,marginLeft:'0px', width:'353px' }}
                id="name"
                label="Personnummer"
                variant="outlined"
                value={searchId}
                onChange={(event) => setSearchId(event.target.value)}
                onKeyDown={(event) => {
                    if(event.key === 'Enter' && searchId!==""){
                      getSearchResult(searchId, "personnummer")
                    }
                }}
           />
              <StyledButton style={{ marginTop:"8px", marginLeft:"-8px", height:"56px" }} variant="contained" onClick={() => searchId!== ""  ? getSearchResult(searchId, "personnummer") : console.log("Error! search value is empty")}>
              <SearchIcon />
              </StyledButton>            

            
            </div>

            <div style={{marginTop: '40px', marginLeft: '50px'}}>
            <Typography variant ="h6">Testpersoner mellan ett visst åldersspann</Typography>

            <FormControl sx={{ m: 1, minWidth: 120, marginLeft:'0px' }}>
        <InputLabel id="Type">Typ</InputLabel>
        <Select
          labelId="ageSpan"
          id="ageSpan"
          value={type}
          label="AgeSpan"
          onChange={(event) => setType(event.target.value)}
        >

          <MenuItem value={1}>Ålder</MenuItem>
          <MenuItem value={2}>Födelseår</MenuItem>
          
        </Select>
        <FormHelperText>Välj söktyp</FormHelperText>
      </FormControl>





            <TextField
                
                id="min"
                label="F.o.m"
                variant="outlined"
                value={min}
                type='number'
                sx={{ m:1 , width: '100px' }}
                onKeyDown={(event) => {
                  if(event.key === 'Enter' && max!== "" && min!== "" ){
                    getAgeSpan(min,max);
                  }
              }}
                onChange={(event) => setMin(event.target.value)}
               
           />
           <TextField
                
                id="max"
                label="T.o.m"
                variant="outlined"
                value={max}
                type='number'

                onKeyDown={(event) => {
                  if(event.key === 'Enter' && max!== "" && min!== "" ){
                    getAgeSpan(min,max);
                  }
              }}
                sx={{m:1, width: '100px' }}
                onChange={(event) => setMax(event.target.value)}
           />

            <div style={{marginTop:'-80px', marginLeft: '375px'}}>


      <StyledButton style={{ marginTop:"-6.5px", marginLeft:"-22.5px", height:"56px" }} variant="contained" onClick={() => max!== "" && min!== "" ? getAgeSpan(min,max) : console.log("Error! search value is empty")}>
        <SearchIcon />
      </StyledButton>
      </div>

            </div>


            

            <div style={{marginTop: '50px', marginLeft: '50px'}}>
            <Typography variant ="h6">Lista alla bokningar som tillhör en grupp</Typography>   

            <Autocomplete
            style={{width: '353px', m:1, marginLeft:'0px' }}
            disablePortal
            id="Group-list"
            options={groups}
            autoHighlight
            
            getOptionLabel={(option) => `${option.groupName} (${option.group})`}
            
            value={searchGroup}
            onChange={(event, newValue) => {
              setSearchGroup(newValue);

            }}
            inputValue={inputGroupValue}
            onInputChange={(event, newInputValue) => {
                setInputGroupValue(newInputValue);

        }}
          onKeyDown={(event) => {
          if(event.key === 'Enter' && searchGroup!=null){

            getSearchResult(searchGroup.id, "group")

          }
      }}
      
            renderInput = {(params) => <TextField {...params} 
            helperText = {"Vänligen välj en grupp från listan"} label="Grupp" />}
    />
            <div style={{marginTop:'-70px', marginLeft: '305px'}}>


      <StyledButton style={{ marginTop:"-8.5px", marginLeft:"48px", height:"56px" }} variant="contained" onClick={() => searchGroup!=null ? getSearchResult(searchGroup.id, "group") : console.log("Error! search value is empty")}>
        <SearchIcon />
      </StyledButton>
      </div>

            </div>
        </div>
        </ThemeProvider>

    )
}


export default Search
