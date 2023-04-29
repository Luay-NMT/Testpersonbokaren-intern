import React from "react";
import { DataGrid, svSE, GridActionsCellItem,  GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmationQuestion from "../components/ConfirmationQuestion.js"
import Tooltip from "@mui/material/Tooltip";
import AddOrUpdateBookingForm from '../components/AddOrUpdateBookingForm';
import ConfirmationMessage from '../components/ConfirmationMessage';
import { getAllBookings, deleteBooking, getUser } from '../APICalls';
import { useDebouncedCallback } from 'use-debounce';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      
    </GridToolbarContainer>
  );
}


function Bookings() {
  const [confirmationQuestion, setConfirmationQuestion] = useState(false);
  const [testpersonId, setTestpersonId] = useState("");
  const [addOrUpdateBookingForm, setAddOrUpdateBookingForm] = useState(false);
  const [refresh,setRefresh] = React.useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);

  const [name, setName] = React.useState("");
  const [organisation, setOrganisation] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [email, setEmail] = React.useState("");

  const updateBooking= id => () => {
    setTestpersonId(id.testpersonId);
    if(id.bookingLogRef){
      const bookingLogRef = id.bookingLogRef;
      const array = bookingLogRef.split(", ")
  
      setName(array[0]);
      setEmail(array[1]);
    }
   
    

    getUser(id.userId).then((res) =>{
      setOrganisation(res.data[0])
     });

    setAddOrUpdateBookingForm(true);
    
  };

  const confirmationQuestionOnUpdateBooking = id => () => {
    setAddOrUpdateBookingForm(false);
    setRefresh(!refresh);
    setName("");
    setEmail("");
    setOrganisation(null);
    setConfirmationMessage(true);
  };

  const cancelUpdateBooking = id => () => {
    setAddOrUpdateBookingForm(false);
    setName("");
    setEmail("");
    setOrganisation(null);
  };
  const confirmationQuestiononConfirmBooking = id => e => {
    setTestpersonId(id);
    setConfirmationQuestion(true);

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

    const theme = createTheme( { palette: { primary: { main: '#1d5a7a' } } }, svSE );


    const deleteBookings = id => () => {
      deleteBooking(id).then(() => {
        setRows(
          rows.filter((val) => {
            return val.id !== id;
          })
        );
      });
      setConfirmationQuestion(false);
      setRefresh(!refresh);

    };

    
    const columns = [
      { field: 'testpersonId', headerName: 'Personidentitet', flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'ownerName', headerName: 'Bokad åt',  flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'bookingLogRef', headerName: 'Bokare (Namn, E-postadress)',  flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'bookingTime', headerName: 'Bokningstid',  flex: 1, align: 'center', headerAlign: 'center' },
      { field: "actions",type: 'actions', sortable: false, disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
        icon={<Tooltip title="Redigera bokning"><EditIcon /></Tooltip>}
        label="Redigera bokning"
        onClick={updateBooking(params.row)}
      />,
        <GridActionsCellItem
        icon={<Tooltip title="Ta bort bokning"><DeleteIcon /></Tooltip>}
        label="Ta bort bokning"
        onClick={confirmationQuestiononConfirmBooking(params.row.testpersonId)}
      />
        ]
      }
    ];

    const [rows, setRows] = useState([]);

useEffect(() => {

 getAllBookings().then((res) =>{
  setRows(res.data);

 });
}, [refresh]);




 
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
      
       checkboxSelection
       disableColumnSelector
       components={{ Toolbar: CustomToolbar  }}


     />

<ConfirmationQuestion
                open={confirmationQuestion}
                onClose={() => setConfirmationQuestion(false)}
                Id={testpersonId}
                title={"Ta bort bokning"}
                message={"Vill du ta bort bokningen för"}
                onConfirm = {deleteBookings(testpersonId)}
            />



<AddOrUpdateBookingForm
                open={addOrUpdateBookingForm}
                onClose={cancelUpdateBooking()}
                onConfirm={confirmationQuestionOnUpdateBooking(testpersonId)}
                testpersons={testpersonId}
                type={"updateBooking"}
                title={"Redigera bokning"}
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
                testpersons={testpersonId}
                message ={"Följande bokning har ändrats:"}
                title={"Redigera bokning"}
            />
            
   </div>
   </ThemeProvider>

 );

}

export default Bookings
