// ** React Imports
import * as React from 'react';
import PropTypes from 'prop-types'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

// ** MUI Components
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, TablePagination, Checkbox,
Button, Grid, Typography, Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import  Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import ComDataTable from '../../../../../components/tools/datatable';

// ** MUI ICON Components
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';

import styles from './index.module.css';

// ** Table ODD AND EVEN Styles
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FFF',
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// ** TextField Custom Style
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#015578',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    "& fieldset": {
      borderRadius: "7px"
    },
    '&:hover fieldset': {
      border:"2px solid",
      borderColor: '#6DCCDD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#015578',
    },
  },
});

// FormControl Custom Style
const CssFormControl = styled(FormControl)({
  '& label.Mui-focused': {
    color: '#015578',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    "& fieldset": {
      borderRadius: "7px"
    },
    '&:hover fieldset': {
      border:"2px solid",
      borderColor: '#6DCCDD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#015578',
    },
    // '& .MuiSvgIcon-root': {
    //   right: '45px',
    // },
  },
});

// ** Select Field Styles
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
PaperProps: {
  style: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 205,
  },
},
};

// Select Field CheckBox Names
const names = [
  'Windows - 742646',
  'RHEL - 127627',
  'Windows - 337057',
];

// Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: 'auto',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
const { children, onClose, ...other } = props;
return (
<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
{children}
{onClose ? (
  <IconButton
  aria-label="close"
  onClick={onClose}
  sx={{
      position: 'absolute',
      right: 8,
      top: 4,
      color: (theme) => theme.palette.grey[500],
  }}
  >
  <CloseIcon />
  </IconButton>
) : null}
</DialogTitle>
);
}
BootstrapDialogTitle.propTypes = {
children: PropTypes.node,
onClose: PropTypes.func.isRequired,
};
const ModalButton = styled(Button)(({ theme }) => ({
color: '#FFF',
backgroundImage: 'linear-gradient(45deg, #0288d1, #26c6da) !important',
'&:hover': {
backgroundImage: 'linear-gradient(45deg, #0288d1, #26c6da) !important',
},
}));

function AppPortDataTable() {

    // ** Modal Popup Function
    const [Modalopen, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const ModalhandleClose = () => {
        setOpen(false);
    };

    // Static IP Pools Popover Function
    const [anchorIppoolsEl, setAnchorIppoolsEl] = React.useState(null);
    const IppoolshandleClick = (event) => {
      setAnchorIppoolsEl(event.currentTarget);
    };
    const IppoolshandlePopoverClose = () => {
      setAnchorIppoolsEl(null);
    };
    const IppoolsPopopen = Boolean(anchorIppoolsEl);

  // default Table items
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedRows, setSelectedRows] = useState([]);

  const cookies = Cookies.get('userData') 
  useEffect(() => {
    const cachData = (cookies? JSON.parse(cookies) : true);
    console.log(cachData);
    if(cachData){
        fetchData(cachData);
    }
    
  }, [cookies,page, rowsPerPage, searchText, sortColumn, sortDirection]);

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  /* changing items */
  const [columnLabels, setColumnLabels] = useState({
    name: 'Name',
    power_status: 'Status',  
    desc: 'Description',
    port: 'Protocol & Destination Port',
    action:'Action'
  });

  const fetchData = async (tdata) => {    
    const data = {
      data:[
        {          
          "name": "AD Server",
          "power_status": 0,
          "desc": "AD Server",
          "port": "TCP : 2564",
        },
        {          
            "name": "Active Directory Server",
            "power_status": 1,
            "desc": "Active Directory Server",
            "port": "UDP : 2586",
          },
      ],
      totalRecords:15
    }
    console.log(data);
    setData(data.data);
    setTotalRecords(data.totalRecords)
        
  };

  const formedTrows = () => {
    return (
      <>
        {data.map((row, index) => (
          <StyledTableRow key={index} selected={isRowSelected(row)} style={{ cursor: 'pointer' }} >
           {/* <TableCell padding="checkbox" onClick={(event) => handleRowSelect(row)} >
              <Checkbox checked={isRowSelected(row)} sx={{color: "#6b6f82",'&.Mui-checked': {color: '#6DCCDD',},}}/>
        </TableCell>*/ }
            {Object.keys(columnLabels).map((column) => {
              if (column === 'power_status') {
                if (row[column] === 0) {
                  return (
                    <TableCell key={column} onClick={(event) => handleRowSelect(row)} >
                      <Chip label="Normal" color="success" sx={{width: '100px', fontSize: '14px', background: 'rgba(114, 225, 40, 0.12)', 
                      color: 'rgb(98 167 53)'}} />
                    </TableCell>
                  );
                }
                else if (row[column] === 1) {  
                  return (
                    <TableCell key={column} onClick={(event) => handleRowSelect(row)} >
                      <Chip label="Failed" sx={{width: '100px', fontSize: '14px', background: 'rgba(255, 77, 73, 0.12)', 
                      color: 'rgb(255, 77, 73)'}} />
                    </TableCell>
                  );

                }
              } 
              else if (column === 'action') {
                  return (
                    <TableCell 
                      key={column} 
                      aria-controls={open ? 'basic-menu' : undefined} 
                      aria-haspopup="true" 
                      aria-expanded={open ? 'true' : undefined} 
                      onClick={handleMenuClick} >
                        <Stack>
                          <Avatar sx={{ bgcolor: '#6DCCDD', width: 30, height: 30 }}>
                            <MoreHorizOutlinedIcon />
                          </Avatar>
                        </Stack>                                                
      
                    </TableCell>
                  );
              } else {
                return <TableCell key={column} onClick={(event) => handleRowSelect(row)} >{row[column]}</TableCell>;
              }
            })}

              <Menu sx={{top:'-10px !important'}} id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button',}}>
                <MenuItem><EditOutlinedIcon sx={{mr:1, fontSize: '18px'}} /> Edit</MenuItem>
                <MenuItem onClick={handleClose}><DeleteOutlineOutlinedIcon sx={{mr:1, fontSize: '18px'}} /> Delete</MenuItem>
              </Menu>

          </StyledTableRow>
        ))}
      </>
    );
  };
  /* changing items */

  const handleChangePage = ( newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSort = (column) => {
      if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
      setSortColumn(column);
      setSortDirection('asc');
      }
      setPage(0);
  };

  const handleRowSelect = ( row) => {
      const selectedIndex = selectedRows.indexOf(row);
      let newSelectedRows = [];

      if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, row);
      } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
      } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
      } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
          selectedRows.slice(0, selectedIndex),
          selectedRows.slice(selectedIndex + 1)
      );
      }

      setSelectedRows(newSelectedRows);
  };

  const handleSelectAllRows = (selectAll) => {
      if (selectAll) {
      const newSelectedRows = data.map((row) => row);
      setSelectedRows(newSelectedRows);
      } else {
      setSelectedRows([]);
      }
  };

  const handleExport = () => {
    const headerRow = Object.keys(columnLabels)
      .map((column) => columnLabels[column])
      .join(',');

      const selectedData = selectedRows.map((row) =>
      Object.keys(columnLabels)
        .map((column) => row[column])
        .join(',')
    );

    const csvContent = `data:text/csv;charset=utf-8,${encodeURIComponent(headerRow + '\n' + selectedData.join('\n'))}`;

    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'selected_data.csv');
    document.body.appendChild(link);
    link.click();
  };


  const handleSearchTextChange = (value) =>{
    setSearchText(value)
  }
  const isRowSelected = (row) => selectedRows.indexOf(row) !== -1;

  const addFirewallPopup = () => {
    console.log("testing");
  }


  return (

    <>

    <ComDataTable
    hideSkeletonTbl={true}
      searchLabel={"Search Application Port"}
      showSearch={true}
      showDownload={false}
      showAddButton={true}
      handleAddEvent={handleClickOpen}
      tableTitle={"List of Application Port"}
      totalRecords={totalRecords}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      searchText={searchText}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      selectedRows={selectedRows}
      columnLabels={columnLabels}
      formedTrows={formedTrows}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onhandleSort={handleSort}
      onhandleRowSelect={handleRowSelect}
      onhandleSelectAllRows={handleSelectAllRows}
      onhandleExport={handleExport}
      onSearchTextChange={handleSearchTextChange}
    />

    {/* Start Application Port Profile Modal Popup Design Here */}
    <BootstrapDialog onClose={ModalhandleClose} aria-labelledby="customized-dialog-title" open={Modalopen}>
        <BootstrapDialogTitle id="customized-dialog-title" align='left' onClose={ModalhandleClose} 
        sx={{padding: '10px 16px', fontSize: '16px'}}>New Application Port Profile</BootstrapDialogTitle>
        <DialogContent dividers>
            <Box component="form" autoComplete='off'>
                <CssTextField margin="normal" fullWidth autoFocus id="name" label="Name" name="name" />
                <CssTextField margin="normal" fullWidth id="desc" label="Description" name="desc" />
                <Grid container direction="row" rowSpacing={2} spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <CssFormControl margin="normal" fullWidth>
                            <InputLabel id="demo-simple-select-label">Application</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Application" MenuProps={MenuProps} >
                                <MenuItem value={11}>TCP</MenuItem>
                                <MenuItem value={12}>UDP</MenuItem>
                                <MenuItem value={13}>ICMPv4</MenuItem>
                                <MenuItem value={14}>ICMPv6</MenuItem>
                            </Select> 
                        </CssFormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <CssTextField margin="normal" fullWidth id="port" label="Port" name="port" />
                    </Grid>
                </Grid>
            </Box>
        </DialogContent>
        <DialogActions>
            <ModalButton variant="contained" size="medium" sx={{ position: 'absolute', left: '45%' }}>SAVE</ModalButton>
            <Button onClick={ModalhandleClose} sx={{ color: '#6DCCDD'}}>Close</Button>
        </DialogActions>
    </BootstrapDialog>
    {/* End Application Port Profile Modal Popup Design Here */}

    </>

  );
}

export default AppPortDataTable;
