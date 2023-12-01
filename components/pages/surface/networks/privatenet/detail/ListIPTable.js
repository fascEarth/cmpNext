// ** React Imports
import * as React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";
import { useState, useEffect } from "react";

// ** MUI Components
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
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

import styles from "./index.module.css";
import Skeleton from "@mui/material/Skeleton";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { toast } from "react-toastify";
import { get } from "jquery";
// ** Table Skeleton CSS
// ** Table Skeleton CSS
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e1f3f6",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

// ** Table Skeleton Function
function TableSkeletonData(id, disk, type, size, cost, action) {
  return { id, disk, type, size, cost, action };
}
const Skeletonrows = [
  TableSkeletonData(1, "SSD", "Standard", "2TB", "$200", "View"),
  TableSkeletonData(2, "HDD", "Premium", "4TB", "$350", "View"),
  TableSkeletonData(3, "SSD", "Basic", "1TB", "$150", "View"),
  TableSkeletonData(4, "HDD", "Standard", "1TB", "$100", "View"),
  TableSkeletonData(5, "SSD", "Premium", "4TB", "$400", "View"),
];

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

function ListIPDataTable(sslugId) {

  const { clientIP } = useClientIP();


  const slugId = sslugId.sslugId;
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
  // console.log(data, "data");
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData && slugId) {
      fetchData(cachData);
    }
    getTableDatas();
  }, [
    slugId,
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
    ipAddress: "IP Address",
    vmName: "VM Name",
    team: "Team",
  });
  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);

  const fetchData = async (tdata) => {
    // const tdata = cookies ? JSON.parse(cookies) : [];
    const newData = {
      slugId: slugId,
      search: searchText,
      start: getPage() * rowsPerPage,
      length: rowsPerPage,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP
    };
    const finalData = {
      data: newData,
      endPoint: "getIPUsage",
      token: tdata.accessToken,
      ipaddress: clientIP
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/privatenet/detail/ipusage",
        finalData
      ); // call the new API route

      if (data) {
        if (data.recordsSize === 0 && page > 0) {
          Cookies.set("PN_ListIPTablePage", page - 1);
          setPage(page - 1);
        }
        getTableDatas();
        console.log(data);
        sethideSkeletonTbl(true);
        setData(data.data);
        setTotalRecords(data.totalRecords);
      }
    } catch (error) {
      toast.error("An error occurred", error);
      console.log(error);
    }
  };

  const formedTrows = () => {
    return (
      <>
        {data.length > 0 &&
          data.map((row, index) => (
            <StyledTableRow
              key={index}
              selected={isRowSelected(row)}
              style={{ cursor: "pointer" }}
            >
              {Object.keys(columnLabels).map((column) => {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column]}
                  </TableCell>
                );
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
      Cookies.remove("PN_ListIPTableRowsPerPage");
      Cookies.remove("PN_ListIPTablePage");
    }
  }, [cookies]);

  const getPage = () => {
    const PN_ListIPTablePage = Cookies.get("PN_ListIPTablePage");
    if (
      PN_ListIPTablePage &&
      (PN_ListIPTablePage !== undefined || PN_ListIPTablePage !== null)
    ) {
      return PN_ListIPTablePage;
    } else {
      return 0;
    }
  };

  const getTableDatas = () => {
    const PN_ListIPTablePage = Cookies.get("PN_ListIPTablePage");
    const PN_ListIPTableRowsPerPage = Cookies.get("PN_ListIPTableRowsPerPage");
    if (PN_ListIPTablePage && PN_ListIPTablePage !== null) {
      setPage(parseInt(PN_ListIPTablePage, 10));
    }

    if (PN_ListIPTableRowsPerPage && PN_ListIPTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(PN_ListIPTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    Cookies.set("PN_ListIPTablePage", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    Cookies.set("PN_ListIPTableRowsPerPage", newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    Cookies.remove("PN_ListIPTablePage");
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
    Cookies.remove("PN_ListIPTablePage");
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

  return (
    <>
      <ComDataTable
        hideSkeletonTbl={hideSkeletonTbl}
        searchLabel={"Search IPs"}
        showSearch={true}
        showDownload={false}
        showAddButton={false}
        handleAddEvent={addInstancePopup}
        tableTitle={"List of IPs"}
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

export default ListIPDataTable;
