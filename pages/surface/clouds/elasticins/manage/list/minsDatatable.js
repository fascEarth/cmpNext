




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

import ComDataTable from '../../../../../../components/pages/datatable/index.js';

function MinsDataTable() {


  const [columnLabels, setColumnLabels] = useState({
    power_status: 'Status', 
    host_name: 'Label', 
    ip_adress: 'IP Address', 
    specification:'Specification',
    data_center:'DataCenter',
    os_details:'OS',
    action:'Action'
  });
  const [tpath, settpath] = useState('/api/surface/clouds/elasticins/manage/list');
  const [tAddress, settAddress] = useState("getallvmsInfo");

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
    const cachData = (cookies? JSON.parse(cookies) : false);
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



  const fetchData = async (tdata) => {
    console.log(tdata);
    
    
        const newData = {"search": searchText, "start": (page * rowsPerPage), "length": rowsPerPage, "sortColumn":sortColumn, "sortDirection":sortDirection, "tenantId": tdata.tenant_id, "userSerialId":tdata.user_serial_id };
        const finalData = {data:newData,endPoint:tAddress}
        try {
          const { data } = await axios.post(tpath, finalData); // call the new API route      
          console.log(data);
          setData(data.data);
          setTotalRecords(data.totalRecords)
        } catch (error) {      
         // toast.error('An error occurred');
        }
    
   /* try {
    const response = await fetch(
        `/api/data?start=${page * rowsPerPage}&length=${rowsPerPage}&search=${searchText}&sortColumn=${sortColumn}&sortDirection=${sortDirection}`
    );
    const result = await response.json();
    console.log(result.data);
    setData(result.data);
    setTotalRecords(result.total)
    } catch (error) {
    console.error('Error fetching data:', error);
    }*/
  };

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

              if (row[column] === 1) {

                return (
                  <TableCell key={column} onClick={(event) => handleRowSelect(row)} >
                    <Box sx={{ display: 'flex' }}>
                      <FiberManualRecordIcon fontSize="small" color="success" sx={{ marginRight: 0.5 }} />
                      Running
                    </Box>
                  </TableCell>
                );
              }else if (row[column] === 0) {  

                return (
                  <TableCell key={column} onClick={(event) => handleRowSelect(row)} >
                    <Box sx={{ display: 'flex' }}>
                      <FiberManualRecordIcon fontSize="small" color="success" sx={{ marginRight: 0.5 }} />
                      Running
                    </Box>
                  </TableCell>
                );

              }else if (row[column] === 2) {  
                
                return (
                  <TableCell key={column} onClick={(event) => handleRowSelect(row)} >
                    <Box sx={{ display: 'flex' }}>
                      <FiberManualRecordIcon fontSize="small" color="success" sx={{ marginRight: 0.5 }} />
                      Running
                    </Box>
                  </TableCell>
                );

              }  
              
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

export default MinsDataTable;
