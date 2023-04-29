import React from 'react';
import { DataGrid, svSE, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddOrUpdateBookingForm from '../components/AddOrUpdateBookingForm';
import ConfirmationMessage from '../components/ConfirmationMessage';
import { searchBasedOnTestpersonId, searchBasedOnAgeSpan, searchBasedOnBirthYear, searchBookingsBasedOnGroup } from '../APICalls';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';

function CustomToolbar({onConfirm, rowSelectionModel}) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button
        startIcon={<AddCircleIcon />}
        onClick={onConfirm(rowSelectionModel)}
        disabled={(rowSelectionModel.length === 0)}
        >Boka markerade testperson(er)
        </Button>
    </GridToolbarContainer>
  );
  }

export default function SearchResult() {
  const [searchParams] = useSearchParams();

 

    const [addOrUpdateBookingForm, setAddOrUpdateBookingForm] = useState(false);
    const [refresh,setRefresh] = React.useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState(false);
    const [name, setName] = React.useState("");
    const [organisation, setOrganisation] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [email, setEmail] = React.useState("");
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [bookedTestpersons, setBookedTestpersons] = React.useState([])


    const newBooking = id => () => {
      setBookedTestpersons([])

      setAddOrUpdateBookingForm(true);
      
    };
    
    const confirmNewBooking = id => () => {
      setBookedTestpersons(rowSelectionModel);
      setRowSelectionModel([]);

      setAddOrUpdateBookingForm(false);
      setRefresh(!refresh);
      setConfirmationMessage(true);

    };
    
    const debouncedSetName = useDebouncedCallback(
      (value) => {
        setName(value);
      },
      // delay in ms
      5
    );

    const debouncedSetEmail = useDebouncedCallback(
      (value) => {
        setEmail(value);
      },
      // delay in ms
      5
    );
     const [rows, setRows] = useState([]);
     const [columns, setColumns] = useState([]);
      

     useEffect(() => {
        if(searchParams.get('type') === "personnummer"){
          searchBasedOnTestpersonId(searchParams.get('value')).then((res) =>{
            setRows(res.data);

          })
          setColumns([
            { field: 'testpersonId', headerName: 'Personidentitet', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'isBooked' ,headerName: 'Bokad', flex: 0.5, align: 'center', headerAlign: 'center' },
            { field: 'bookingUserFullName', headerName: 'Bokad åt',  flex: 1, align: 'center', headerAlign: 'center' },
          ]);
        }
        else if(searchParams.get('type') === "group"){
          searchBookingsBasedOnGroup(searchParams.get('value')).then((res) =>{
            setRows(res.data);

          })
          setColumns([
            { field: 'testpersonId', headerName: 'Personidentitet', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'bookingUserFullName', headerName: 'Bokad åt',  flex: 1, align: 'center', headerAlign: 'center' },
          ]);
        } else if(searchParams.get('type') === "agespan"){
          searchBasedOnAgeSpan(searchParams.get('min'), searchParams.get('max')).then((res) =>{
            setRows(res.data);

          })
          setColumns([
            { field: 'testpersonId', headerName: 'Personidentitet', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'isBooked' ,headerName: 'Bokad', flex: 0.5, align: 'center', headerAlign: 'center' },
            { field: 'bookingUserFullName', headerName: 'Bokad åt',  flex: 1, align: 'center', headerAlign: 'center' },
          ]);
        }else if(searchParams.get('type') === "birthyear"){
          searchBasedOnBirthYear(searchParams.get('min'), searchParams.get('max')).then((res) =>{
            setRows(res.data);

          })
          setColumns([
            { field: 'testpersonId', headerName: 'Personidentitet', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'isBooked' ,headerName: 'Bokad', flex: 0.5, align: 'center', headerAlign: 'center' },
            { field: 'bookingUserFullName', headerName: 'Bokad åt',  flex: 1, align: 'center', headerAlign: 'center' },
          ]);
        }
        
   // eslint-disable-next-line   
    }, [refresh]);
    
  

 const theme = createTheme(
  {
    palette: {
      primary: { main: '#1d5a7a' },
    },
  },
  svSE,  
);


  return (
    <ThemeProvider theme={theme}>
      
     
    <div style={{width: '99.9%' }}>

      <DataGrid 
        getRowId={(row) => row.testpersonId}
        rows={rows}
        columns={columns}
        autoHeight={true}
        
        initialState={{
          ...rows.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50]}

        isRowSelectable={(params) => params.row.bookingUserFullName === null}

        checkboxSelection
        disableColumnSelector
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{ toolbar: { onConfirm: newBooking, rowSelectionModel: rowSelectionModel } }}/>
       <AddOrUpdateBookingForm
                open={addOrUpdateBookingForm}
                onClose={() => setAddOrUpdateBookingForm(false)}
                onConfirm={confirmNewBooking(rowSelectionModel)}
                testpersons={rowSelectionModel}
                type={"newBooking"}
                title={"Ny bokning(ar)"}
                name={name}
                setName={debouncedSetName}
                email={email}
                setEmail={debouncedSetEmail}
                organisation={organisation}
                setOrganisation={setOrganisation}
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
            <ConfirmationMessage
                open={confirmationMessage}
                onClose={() => setConfirmationMessage(false)}
                testpersons={bookedTestpersons}
                message ={"Följande testperson(er) har bokats:"}
                title={"Ny bokning(ar)"}/>
            
    </div>
    
    </ThemeProvider>
  );
      }
