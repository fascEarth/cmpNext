




import Cookies from 'js-cookie';
import axios from 'axios';
import { useState, useEffect } from 'react';


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,  
  TablePagination,
  Checkbox,
  Button,
  Grid,
  Typography,
  Box
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';


import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import SettingsPowerOutlinedIcon from '@mui/icons-material/SettingsPowerOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import InsertPageBreakOutlinedIcon from '@mui/icons-material/InsertPageBreakOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import  Divider from '@mui/material/Divider';


import ComDataTable from '../index.js';

function CollDataTable() {

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
      power_status: 'Status', 
      host_name: 'Label', 
      ip_adress: 'IP Address', 
      specification:'Specification',
      data_center:'DataCenter',
      os_details:'OS',
      action:'Action'
    });

    const fetchData = async (tdata) => {    
      const data = {
        data:[
          {          
            "power_status":1,
            "host_name":"Ubuntu-440505",
            "ip_adress":"192.168.38.15",
            "specification":"2vCPU/4GB/20G",
            "data_center":"Riyadh",
            "os_details":"Ubuntu 22.04 (LTS) x64",
            "os_logo_name":"ubuntu.png",
            "sizing_policy_name":"SAR 169.13",
            "currentstate":7000,
            "currentmsg":"Ubuntu-440505 is successful to power off",
            "vmpercentage":100,
          },
          {          
          "power_status":1,
          "host_name":"Photon-777106",
          "ip_adress":"192.168.38.18",
          "specification":"2vCPU/4GB/20G",
          "data_center":"Riyadh",
          "os_details":"Photon 4.0 x64",
          "os_logo_name":"photon.png",
          "sizing_policy_name":"SAR 169.13",
          "currentstate":7000,
          "currentmsg":"Photon-777106 is successful to power off",
          "vmpercentage":100,
          "isFailed":false
          },
          {
            "power_status":1,
          "host_name":"Ubuntu-515261",
          "ip_adress":"192.168.38.21",
          "specification":"2vCPU/4GB/20G",
          "data_center":"Riyadh",
          "os_details":"Ubuntu 22.04 (LTS) x64",
          "os_logo_name":"ubuntu.png",
          "sizing_policy_name":"SAR 169.13",
          "currentstate":7000,
          "currentmsg":"Ubuntu-515261 is successful to power off",
          "vmpercentage":100,
          "isFailed":false
          }

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
            <TableRow
            
              key={index}
              selected={isRowSelected(row)}
              
              style={{ cursor: 'pointer' }}
            >
              <TableCell padding="checkbox" onClick={(event) => handleRowSelect(row)} >
                <Checkbox checked={isRowSelected(row)} />
              </TableCell>
              {Object.keys(columnLabels).map((column) => {
                if (column === 'power_status') {
                  return (
                    <TableCell key={column} onClick={(event) => handleRowSelect(row)} >
                      <Box sx={{ display: 'flex' }}>
                        <FiberManualRecordIcon fontSize="small" color="success" sx={{ marginRight: 0.5 }} />
                        Running
                      </Box>
                    </TableCell>
                  );
                } else if (column === 'action') {
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
    
                <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                    MenuListProps={{'aria-labelledby': 'basic-button',}}>
                    <MenuItem onClick={handleClose} sx={{color: '#015578' }}><ViewInArOutlinedIcon sx={{mr:2, fontSize: '18px'}} /> View 
                    Details</MenuItem> 
                    <Divider />
                    <MenuItem onClick={handleClose}><PowerSettingsNewOutlinedIcon sx={{mr:2, fontSize: '18px'}} /> Power On</MenuItem>
                    <MenuItem onClick={handleClose}><SettingsPowerOutlinedIcon sx={{mr:2, fontSize: '18px'}} /> Power Off</MenuItem>
                    <MenuItem onClick={handleClose}><RestartAltOutlinedIcon sx={{mr:2, fontSize: '18px'}} /> Reset</MenuItem>
                    <MenuItem onClick={handleClose}><InsertPageBreakOutlinedIcon sx={{mr:2, fontSize: '18px'}} /> Suspend</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose} sx={{color: '#FF4D49' }}><DeleteOutlineOutlinedIcon sx={{mr:2, fontSize: '18px'}} /> 
                    Delete</MenuItem>
                    </Menu>
    
            </TableRow>
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


  return (
    
    <ComDataTable
    
    
      
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
  
  );
}

export default CollDataTable;
