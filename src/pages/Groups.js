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
import ConfirmationMessage from '../components/ConfirmationMessage';
import AddOrUpdateGroupForm from '../components/AddOrUpdateGroupForm';
import { getAllGroups, deleteGroup } from '../APICalls';


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
        >Lägg till grupp
        </Button>
    </GridToolbarContainer>
  );
  }

export default function Groups() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [addGroupForm, setAddGroupForm] = useState(false);
    const [updateGroupForm, setUpdateGroupForm] = useState(false);
    const [refresh,setRefresh] = React.useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState(false);
    const [confirmationQuestion, setConfirmationQuestion] = useState(false);
    const [groupId, setGroupId] = useState("");
    const [groupName, setGroupName] = useState("");
    const [name, setName] = React.useState("");
    const [shortName, setShortName] = React.useState("");
    const [rows, setRows] = useState([]); 
    const newGroup = id => () => {
        setName("");
        setShortName("");
        setAddGroupForm(true); 
      };
      
    const updateBooking= id => () => {
      setGroupId(id.id);
      setName(id.groupName);
      setShortName(id.group);
     
      setUpdateGroupForm(true);
      
    };
  
      
      const confirmNewGroup = id => () => {
        setAddGroupForm(false);
        setUpdateGroupForm(false);
        setRefresh(!refresh);
        setConfirmationMessage(true);
  
        
      };
      
      const confirmationQuestiononConfirmGroup = id => e => {
          setGroupId(id.id);
          setConfirmationQuestion(true);
        setGroupName(id.groupName + " (" + id.group + ")")
        };
  
    useEffect(() => {
          getAllGroups().then((res) =>{
           setRows(res.data);
       
          });
         }, [refresh]);

  const deleteGroups = id => () => {
    deleteGroup(id).then(() => {
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
{ field: 'group', headerName: 'Kortnamn',  flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'groupName' ,headerName: 'Namn', flex: 1, align: 'center', headerAlign: 'center' },
  { field: "actions",type: 'actions', sortable: false, disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
        icon={<Tooltip title="Redigera grupp"><EditIcon /></Tooltip>}
        label="Redigera grupp"
        onClick={updateBooking(params.row)}
      />,
        <GridActionsCellItem
        icon={<Tooltip title="Ta bort grupp"><DeleteIcon /></Tooltip>}
        label="Ta bort grupp"
        onClick={confirmationQuestiononConfirmGroup(params.row)}
      />
        ]
      }
 
];
  return (
    <ThemeProvider theme={theme}>
      
     
    <div style={{width: '99.9%' }}>

      <DataGrid 
        getRowId={(row) => row.id}
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
        componentsProps={{ toolbar: { onConfirm: newGroup, selectedRows: selectedRows } }}

        
      />

        <AddOrUpdateGroupForm
                open={addGroupForm}
                onClose={() => setAddGroupForm(false)}
                onConfirm={confirmNewGroup(groupId)}
                groupId={groupId}
                type={"newGroup"}
                title={"Ny grupp"}
                name={name}
                setName={setName}
                shortName={shortName}
                setShortName={setShortName}
            />
            <AddOrUpdateGroupForm
                open={updateGroupForm}
                onClose={() => setUpdateGroupForm(false)}
                onConfirm={confirmNewGroup(groupId)}
                groupId={groupId}
                name={name}
                setName={setName}
                shortName={shortName}
                setShortName={setShortName}
                type={"updateGroup"}
                title={"Redigera  grupp"}
            />
          
    <ConfirmationQuestion
                open={confirmationQuestion}
                onClose={() => setConfirmationQuestion(false)}
                Id={groupName}
                message={"Vill du ta bort gruppen"}
                warningMessage={"OBS! Alla användare och bokningar som tillhör denna grupp kommer att raderas."}
                title={"Ta bort grupp"}
                onConfirm = {deleteGroups(groupId)}
            />

<ConfirmationMessage
                open={confirmationMessage}
                onClose={() => setConfirmationMessage(false)}
                message ={"Gruppen har uppdaterats"}
                title={"Bekräftelse"}
    />
    </div>
    
    </ThemeProvider>
  );
      }
