
import React, { useState, useEffect } from 'react';
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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const MinsDataTable = ({

    totalRecords,
      data,
      page,
      rowsPerPage,
      searchText,
      sortColumn,
      sortDirection,
      selectedRows,
      columnLabels,
      formedTrows,
      onPageChange,
      onRowsPerPageChange,
      onhandleSort,
      onhandleRowSelect,
      onhandleSelectAllRows,
      onhandleExport,
      onSearchTextChange      
}) => {
    

    const handleSearchTextChange = (event) => {
        onSearchTextChange(event.target.value);
      };

    const handleChangePage = (event, newPage) => {
        onPageChange(newPage);
      };

      

      const handleChangeRowsPerPage = (event) => {
        onRowsPerPageChange(event.target.value);
      };
    
      const handleSort = (column) => {
        onhandleSort(column);
      };

      const handleRowSelect = (event, row) => {
        onhandleRowSelect(row);
      };
    
      const handleSelectAllRows = (event) => {
        onhandleSelectAllRows(event.target.checked);
      };
    
      const handleExport = () => {
        onhandleExport(selectedRows);
      };


    







return (
  <div>    
   <Grid container justifyContent="flex-start" alignItems="center">

    <Grid item>
        <Typography
        sx={{ flex: '1 1 100%', pl: 2, pt: 3, pb: 3, fontSize: '18px', textAlign: 'left' }}
        variant="h6"
        id="tableTitle"
        component="div"
        >
        List of Instance
        </Typography>
    </Grid>

    <Grid item sx={{ marginLeft: 'auto' }}>
        <Grid container alignItems="center" spacing={2}>
    <Grid item>
    <TextField
    size="small"
      label="Search"
      value={searchText}
                onChange={handleSearchTextChange}
    />
  </Grid>
  <Grid item>
    <Button disabled={selectedRows.length === 0} onClick={handleExport} startIcon={<CloudDownloadIcon />} ></Button>
  </Grid>
  </Grid></Grid>

</Grid>
    <TableContainer component={Paper}>
        
    
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedRows.length === data.length}
                onChange={handleSelectAllRows}
              />
            </TableCell>
           

            {Object.keys(columnLabels).map((column) => (
                
                 <TableCell
                 key={column} // Add key prop
                 onClick={() => handleSort(column)}
                 style={{ cursor: 'pointer', fontWeight: sortColumn === column ? 'bold' : 'normal' }}
               >
                 {columnLabels[column]}
                 {sortColumn === column && (
                   <span>&nbsp;{sortDirection === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</span>
                 )}
               </TableCell>
                
              ))}


            
          </TableRow>
        </TableHead>
        <TableBody>
        {formedTrows()}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={totalRecords}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </div>
);
};

export default MinsDataTable;

