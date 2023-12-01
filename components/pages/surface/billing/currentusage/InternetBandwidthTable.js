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
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ComDataTable from "../../../../tools/datatable";

// ** MUI ICON Components
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useClientIP } from "../../../../../utils/context/ClientIPContext";

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

function InternetBandwidthDataTable({
  expanded,
  setinternetbandwtcost,
  setinternetbandwtcount,
}) {
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
      if (expanded === "panel5") {
        fetchData(cachData);
      } else {
        sethideSkeletonTbl(false);
      }
    }
    getTableDatas();
  }, [
    expanded,
    cookies,
    page,
    rowsPerPage,
    searchText,
    sortColumn,
    sortDirection,
  ]);

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
    name: "Name",
    hours: "Hours",
    start: "Start (UTC)",
    end: "End (UTC)",
    cost: "Cost",
  });

  const fetchData = async (tdata) => {
    const newData = {
      search: searchText,
      start: getPage() * rowsPerPage,
      length: rowsPerPage,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      expandFilter: "internetbandwidth",
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getAllcurrentusageInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/billing/currentusage",
        finalData
      ); // call the new API route

      if (data.status === "ok" && data.message) {
        const cdata = data.message["Internet Bandwidth"]
          ? data.message["Internet Bandwidth"]
          : [];
        setData(cdata.details);
        getTableDatas();
        setTotalRecords(parseFloat(cdata.totalCount));

        setinternetbandwtcount(parseFloat(cdata.totalCount));
        setinternetbandwtcost(parseFloat(cdata.totalCost).toFixed(2));

        sethideSkeletonTbl(true);
      }
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
            </TableCell>
            */}

            {Object.keys(columnLabels).map((column) => {
              if (column === "action") {
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
              } else if (column === "cost") {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column] ? row[column].toFixed(2) : "-"}
                  </TableCell>
                );
              } else if (column === "end") {
                const time = row[column].split(":");
                const collectedTime = time[0] + ":" + time[1];
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {collectedTime}
                  </TableCell>
                );
              } else if (column === "start") {
                const time = row[column].split(":");
                const collectedTime = time[0] + ":" + time[1];
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {collectedTime}
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
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <MenuItem>
                <ReceiptOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} /> Payment
                Receipt
              </MenuItem>
              <MenuItem>
                <FileDownloadOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} />{" "}
                Invoice Download
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
      Cookies.remove("CU_VmInternetBandwidthTableRowsPerPage");
      Cookies.remove("CU_VmInternetBandwidthTablePage");
    }
  }, [cookies]);

  const getPage = () => {
    const CU_VmInternetBandwidthTablePage = Cookies.get(
      "CU_VmInternetBandwidthTablePage"
    );
    if (
      CU_VmInternetBandwidthTablePage &&
      (CU_VmInternetBandwidthTablePage !== undefined ||
        CU_VmInternetBandwidthTablePage !== null)
    ) {
      return CU_VmInternetBandwidthTablePage;
    } else {
      return 0;
    }
  };

  const getTableDatas = () => {
    const CU_VmInternetBandwidthTablePage = Cookies.get(
      "CU_VmInternetBandwidthTablePage"
    );
    const CU_VmInternetBandwidthTableRowsPerPage = Cookies.get(
      "CU_VmInternetBandwidthTableRowsPerPage"
    );
    if (
      CU_VmInternetBandwidthTablePage &&
      CU_VmInternetBandwidthTablePage !== null
    ) {
      setPage(parseInt(CU_VmInternetBandwidthTablePage, 10));
    }

    if (
      CU_VmInternetBandwidthTableRowsPerPage &&
      CU_VmInternetBandwidthTableRowsPerPage !== null
    ) {
      setRowsPerPage(parseInt(CU_VmInternetBandwidthTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    Cookies.set("CU_VmInternetBandwidthTablePage", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    Cookies.set("CU_VmInternetBandwidthTableRowsPerPage", newRowsPerPage);
    Cookies.remove("CU_VmInternetBandwidthTablePage");
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
    // Cookies.remove("CU_VmInternetBandwidthTablePage");
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
        searchLabel={"Search Invoice"}
        showSearch={false}
        showDownload={false}
        showAddButton={false}
        handleAddEvent={addInstancePopup}
        tableTitle={""}
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

export default InternetBandwidthDataTable;
