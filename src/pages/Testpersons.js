import React from 'react';
import { DataGrid, svSE, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddOrUpdateBookingForm from '../components/AddOrUpdateBookingForm';
import ConfirmationMessage from '../components/ConfirmationMessage';
import { getAllTestpersons } from '../APICalls';

import { useDebouncedCallback } from 'use-debounce';


function CustomToolbar({onConfirm, selectedRows}) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button
        startIcon={<AddCircleIcon />}
        onClick={onConfirm(selectedRows)}
        disabled={(selectedRows.length === 0)}
        >Boka markerade testperson(er)
        </Button>
    </GridToolbarContainer>
  );
  }

export default function Personer() {
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
      setAddOrUpdateBookingForm(false);
      setRefresh(!refresh);
      setBookedTestpersons(rowSelectionModel);
      setConfirmationMessage(true);
      setRowSelectionModel([]);

      
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

useEffect(() => {
   getAllTestpersons().then((res) =>{
    setRows(res.data);

   });
  }, [refresh]);


 const theme = createTheme(
  {
    palette: {
      primary: { main: '#1d5a7a' },
    },
  },
  svSE,  
);

const columns = [
  { field: 'testpersonId', headerName: 'Personidentitet', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'isBooked' ,headerName: 'Bokad', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'bookingUserFullName', headerName: 'Bokad åt',  flex: 1, align: 'center', headerAlign: 'center' },
 
];
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

        isRowSelectable={(params) => params.row.isBooked !== 'Ja'}
        checkboxSelection
        disableColumnSelector

        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
       
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{ toolbar: { onConfirm: newBooking, selectedRows: rowSelectionModel } }}
      />

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
