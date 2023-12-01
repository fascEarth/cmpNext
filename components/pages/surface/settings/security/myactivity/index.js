// ** React Imports
import * as React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

// ** MUI Components
import { styled } from "@mui/material/styles";
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
  Box,
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import ComDataTable from "../../../../../tools/datatable";

// ** MUI ICON Components
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";

// ** Table ODD AND EVEN Styles
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFF",
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function MyActivityDataTable() {
  const { clientIP } = useClientIP();

  // default Table items
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);

  const cookies = Cookies.get("userData");
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData) {
      fetchData(cachData);
    }
    getTableDatas();
  }, [cookies, page, rowsPerPage, searchText, sortColumn, sortDirection]);

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
    eventDate: "Date & Time (UTC)",
    eventDec: "Description",
    ipAddress: "IP Address",
  });

  const fetchData = async (tdata) => {
    const newData = {
      eventType: "myactivity",
      search: searchText,
      start: getPage() * rowsPerPage,
      length: rowsPerPage,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getAllmyactivityInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/security/myactivity",
        finalData
      ); // call the new API route

      setData(data.data);
      setTotalRecords(data.totalRecords);
      if (data.recordsSize === 0 && page > 0) {
        setPage(page - 1);
        Cookies.set("myActivityTablePage", page - 1);
      }
      getTableDatas();

      sethideSkeletonTbl(true);
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const formedTrows = () => {
    return (
      <>
        {data.map((row, index) => (
          <StyledTableRow
            key={index}
            selected={isRowSelected(row)}
            style={{ cursor: "pointer" }}
          >
            {/*
            <TableCell padding="checkbox" onClick={(event) => handleRowSelect(row)} >
              <Checkbox checked={isRowSelected(row)} sx={{color: "#6b6f82",'&.Mui-checked': {color: '#6DCCDD',},}}/>
        </TableCell> */}
            {Object.keys(columnLabels).map((column) => {
              if (column === "power_status") {
                if (row[column] === 1) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <FiberManualRecordIcon
                          fontSize="small"
                          color="error"
                          sx={{ marginRight: 0.5 }}
                        />
                        Failed
                      </Box>
                    </TableCell>
                  );
                } else if (row[column] === 0) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <FiberManualRecordIcon
                          fontSize="small"
                          color="success"
                          sx={{ marginRight: 0.5 }}
                        />
                        Running
                      </Box>
                    </TableCell>
                  );
                } else if (row[column] === 2) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <FiberManualRecordIcon
                          fontSize="small"
                          color="success"
                          sx={{ marginRight: 0.5 }}
                        />
                        Running
                      </Box>
                    </TableCell>
                  );
                }
              } else if (column === "action") {
                return (
                  <TableCell
                    key={column}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleMenuClick}
                  >
                    <Stack>
                      <Avatar
                        sx={{ bgcolor: "#6DCCDD", width: 30, height: 30 }}
                      >
                        <MoreHorizOutlinedIcon />
                      </Avatar>
                    </Stack>
                  </TableCell>
                );
              } else {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column]}
                  </TableCell>
                );
              }
            })}

            <Menu
              sx={{ top: "-10px !important" }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <MenuItem onClick={handleClose}>
                <DeleteOutlineOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} />
                Delete
              </MenuItem>
            </Menu>
          </StyledTableRow>
        ))}
      </>
    );
  };
  /* changing items */

  useEffect(() => {
    if (!cookies) {
      Cookies.remove("myActivityTableRowsPerPage");
      Cookies.remove("myActivityTablePage");
    }
  }, [cookies]);

  const getPage = () => {
    const myActivityTablePage = Cookies.get("myActivityTablePage");
    if (
      myActivityTablePage &&
      (myActivityTablePage !== undefined || myActivityTablePage !== null)
    ) {
      return myActivityTablePage;
    } else {
      return 0;
    }
  };

  const getTableDatas = () => {
    const myActivityTablePage = Cookies.get("myActivityTablePage");
    const myActivityTableRowsPerPage = Cookies.get(
      "myActivityTableRowsPerPage"
    );
    if (myActivityTablePage && myActivityTablePage !== null) {
      setPage(parseInt(myActivityTablePage, 10));
    }
    if (myActivityTableRowsPerPage && myActivityTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(myActivityTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    Cookies.set("myActivityTablePage", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    Cookies.set("myActivityTableRowsPerPage", newRowsPerPage);
    Cookies.remove("myActivityTablePage");
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setPage(0);
    Cookies.remove("myActivityTablePage");
  };

  const handleRowSelect = (row) => {
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
      .join(",");

    const selectedData = selectedRows.map((row) =>
      Object.keys(columnLabels)
        .map((column) => row[column])
        .join(",")
    );

    const csvContent = `data:text/csv;charset=utf-8,${encodeURIComponent(
      headerRow + "\n" + selectedData.join("\n")
    )}`;

    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "selected_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleSearchTextChange = (value) => {
    setSearchText(value);
  };
  const isRowSelected = (row) => selectedRows.indexOf(row) !== -1;

  const addInstancePopup = () => {};

  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);

  return (
    <>
      <ComDataTable
        hideSkeletonTbl={hideSkeletonTbl}
        searchLabel={"Search Activity"}
        showSearch={true}
        showDownload={false}
        showAddButton={false}
        handleAddEvent={addInstancePopup}
        tableTitle={"My Activity Logs"}
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
    </>
  );
}

export default MyActivityDataTable;
