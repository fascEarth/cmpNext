



import Cookies from 'js-cookie';
import axios from 'axios';

import { useState, useEffect } from 'react';
import CommonDataTable from './oldindex';
function CollectCommonDataTable({columnLabels, tAddress, tpath}) {
    

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
    const titleRow = `<tr>
    <th>Column 1</th>
    <th>Column 2</th>
    <th>Column 3</th>
    </tr>`;

    const selectedData = selectedRows.map((row) => {
    // Customize the formatting of the data as needed
    return `<tr>
        <td>${row.column1}</td>
        <td>${row.column2}</td>
        <td>${row.column3}</td>
    </tr>`;
    });

    const csvContent = `data:text/csv;charset=utf-8,${titleRow}\n${selectedData.join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'selected_data.csv');
    document.body.appendChild(link);
    link.click();
};

const handleSearchTextChange = (value) =>{
  setSearchText(value)
}

  return (
    <CommonDataTable      
      totalRecords={totalRecords}
      data={data}
      page={page}
      rowsPerPage={rowsPerPage}
      searchText={searchText}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      selectedRows={selectedRows}
      columnLabels={columnLabels}
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

export default CollectCommonDataTable;
