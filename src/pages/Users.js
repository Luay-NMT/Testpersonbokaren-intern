import React from 'react';
import { DataGrid, svSE, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector,GridActionsCellItem } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationQuestion from "../components/ConfirmationQuestion";
import AddOrUpdateUserForm from '../components/AddOrUpdateUserForm';
import ConfirmationMessage from '../components/ConfirmationMessage';
import { getAllUsers, deleteUser, getGroup } from '../APICalls';
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
        >Lägg till användare
        </Button>
    </GridToolbarContainer>
  );
  }

export default function Users() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [addUserForm, setAddUserForm] = useState(false);
    const [updateUserForm, setUpdateUserForm] = useState(false);

    const [refresh,setRefresh] = React.useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState(false);
    const [confirmationQuestion, setConfirmationQuestion] = useState(false);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");


    const [name, setName] = React.useState("");
    const [shortName, setShortName] = React.useState("");
    const [organisation, setOrganisation] = React.useState(null);

    const newUser = id => () => {
      setName("");
      setShortName("");
      setOrganisation(null);
      setAddUserForm(true);
      
    };
    
  const updateUser= id => () => {
    setUserId(id.userId);
    setShortName(id.shortName)
    setName(id.fullName)
    getGroup(id.group).then((res) =>{
      
      setOrganisation(res.data[0])
     });
    setUpdateUserForm(true);
    
  };

    
    const confirmNewUser = id => () => {
      setAddUserForm(false);
      setUpdateUserForm(false);
      setRefresh(!refresh);

      setConfirmationMessage(true);
     
    
      
    };
    
    const confirmationQuestiononConfirmUser = id => e => {
        setUserId(id.userId);
        setConfirmationQuestion(true);
        setUserName(id.fullName + " (" + id.shortName + ")");
      };

     const [rows, setRows] = useState([]);

     const debouncedSetName = useDebouncedCallback(
      (value) => {
        setName(value);
      },
      // delay in ms
      5
    );
  
    const debouncedSetShortName = useDebouncedCallback(
      (value) => {
        setShortName(value);
      },
      // delay in ms
      5
    );


  useEffect(() => {
    getAllUsers().then((res) =>{
     setRows(res.data);
 
    });
   }, [refresh]);

  const deleteUsers = id => () => {

    deleteUser(id).then(() => {
      setRows(
        rows.filter((val) => {
          return val.id !== id;
        })
      );
    });

    setConfirmationQuestion(false);
    setRefresh(!refresh);

  };

 const theme = createTheme(
  {
    palette: {
      primary: { main: '#1d5a7a' },
    },
  },
  svSE,  
);

const columns = [
  { field: 'shortName', headerName: 'Kortnamn', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'fullName' ,headerName: 'Namn', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'groupName', headerName: 'Grupp',  flex: 1, align: 'center', headerAlign: 'center' },
  { field: "actions",type: 'actions', sortable: false, disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
        icon={<Tooltip title="Redigera användare"><EditIcon /></Tooltip>}
        label="Redigera användare"
        onClick={updateUser(params.row)}
      />,
        <GridActionsCellItem
        icon={<Tooltip title="Ta bort användare"><DeleteIcon /></Tooltip>}
        label="Ta bort användare"
        onClick={confirmationQuestiononConfirmUser(params.row)}
      />
        ]
      }
 
];
  return (
    <ThemeProvider theme={theme}>
      
    <div style={{width: '99.9%' }}>

      <DataGrid 
        getRowId={(row) => row.userId}
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
        onSelectionModelChange={(newSelectionModel) => {
          setSelectedRows(newSelectionModel);
        }}
       
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{ toolbar: { onConfirm: newUser, selectedRows: selectedRows } }}

        
      />

        <AddOrUpdateUserForm
                open={addUserForm}
                onClose={() => setAddUserForm(false)}
                onConfirm={confirmNewUser(userId)}
                userId={userId}
                type={"newUser"}
                title={"Ny användare"}
                name={name}
                setName={debouncedSetName}
                shortName={shortName}
                setShortName={debouncedSetShortName}
                organisation={organisation}
                setOrganisation={setOrganisation}
        />
            <AddOrUpdateUserForm
                open={updateUserForm}
                onClose={() => setUpdateUserForm(false)}
                onConfirm={confirmNewUser(userId)}
                userId={userId}
                type={"updateUser"}
                title={"Redigera  användare"}
                name={name}
                setName={debouncedSetName}
                shortName={shortName}
                setShortName={debouncedSetShortName}
                organisation={organisation}
                setOrganisation={setOrganisation}
            />
          
    <ConfirmationQuestion
                open={confirmationQuestion}
                onClose={() => setConfirmationQuestion(false)}
                message={"Vill du ta bort"}
                Id={userName}
                warningMessage={"OBS! Alla bokningar som tillhör denna användare kommer att raderas."}
                title={"Ta bort användare"}
                onConfirm = {deleteUsers(userId)}
    />

<ConfirmationMessage
                open={confirmationMessage}
                onClose={() => setConfirmationMessage(false)}
                message ={"Användare har uppdaterats"}
                title={"Bekräftelse"}
          />
    </div>
    
    </ThemeProvider>
  );
      }