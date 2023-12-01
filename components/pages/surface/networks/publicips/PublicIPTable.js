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
  DialogContentText,
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
import styles from "./index.module.css";

// ** MUI ICON Components
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { toast } from "react-toastify";
import AddPublicIps from "./addPublicIps";
import AutorenewIcon from "@mui/icons-material/Autorenew";
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

function PublicIPDataTable({
  loadTableInfo,
  setloadTableInfo,
  setAddBtnBlock,
  setorderMapId,
  orderIPId,
  orderMapId,
  setorderId,
  setOpen,
  Modalopen,
  ctype,
  setCtype,
  page,
  setPage,
  getAllItemStatus,
}) {
  const { clientIP } = useClientIP();
  // default Table items
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setselectedFilter] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);

  const cookies = Cookies.get("userData");
  const [passfilterData, setpassfilterData] = useState(false);
  const [stcachdata, setstcachdata] = useState([]);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData) {
      setstcachdata(cachData);
      getAllInitItems(cachData);
    }
  }, [cookies]);

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData) {
      fetchData(cachData);
      setloadTableInfo(false);
      getAllItemStatus(cachData);
    }
    getTableDatas();
  }, [
    loadTableInfo,
    cookies,
    page,
    rowsPerPage,
    searchText,
    sortColumn,
    sortDirection,
    selectedFilter,
  ]);

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event, index) => {
    setOpenRowMenuIndex(index);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* changing items */
  const [columnLabels, setColumnLabels] = useState({
    orderIPAddress: "IP Address",
    orderIPStatus: "Status",
    orderIPName: "Name",
    orderIPDesc: "Description",
    teamName: "Team",
    orderIPUsage: "Usage",
    action: "Action",
  });

  const getAllInitItems = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getpublicipsinitialItems",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/publicips",
        finalData
      ); // call the new API route

      if (data) {
        const teams = data.find((x) => x.type === "teams");
        const ipquant = data.find((x) => x.type === "ipQuantity");

        setFilterItems(teams);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const setFilterItems = async (existingTeams) => {
    // Clone the existing teams list

    const updatedTeamsList = [...existingTeams.list];

    // Add a new list item
    const newItem = {
      id: 0, // Change this ID to a unique value
      value: "All",
      isUsed: true, // Modify as needed
      mappedWith: "", // Modify as needed
    };

    // const newItemNone = {
    //   id: 0, // Change this ID to a unique value
    //   value: "None of the team",
    //   isUsed: true, // Modify as needed
    //   mappedWith: "", // Modify as needed
    // };
    updatedTeamsList.push(newItem);

    // Change the defaultId
    const newDefaultId = 0; // Change this to the desired default ID

    // Create the updated teams object
    const updatedTeams = {
      ...existingTeams,
      defaultId: newDefaultId,
      list: updatedTeamsList,
    };

    // Now, you can set the updated teams object in state
    setpassfilterData(updatedTeams);

    setselectedFilter(0);
  };
  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);
  const [allDatas, setAllDatas] = useState([]);
  const fetchData = async (tdata) => {
    const newData = {
      filtervalue: selectedFilter === 0 ? "" : selectedFilter,
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
      endPoint: "getAllPublicIpInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/publicips",
        finalData
      ); // call the new API route

      if (data.data) {
        if (data.recordsSize === 0 && page > 0) {
          setPage(page - 1);
          Cookies.set("PublicIpTablePage", page - 1);
        }
        getTableDatas();
        const itemWithCurrentState1 = data.data.find(
          (item) => item.orderIPStatus === "process"
        );
        if (itemWithCurrentState1) {
          setTimeout(() => {
            fetchData(tdata);
          }, 40000);
        }
      }

      setData(data.data);
      setTotalRecords(data.totalRecords);

      sethideSkeletonTbl(true);
    } catch (error) {
      // toast.error('An error occurred');
    }

    const validation = {
      // filtervalue: "",
      search: "",
      start: 0,
      length: totalRecords + totalRecords,
      sortColumn: "",
      sortDirection: "asc",
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const validationFinalData = {
      data: validation,
      endPoint: "getAllPublicIpInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/publicips",
        validationFinalData
      ); // call the new API route

      if (data.data) {
        const itemWithCurrentState1 = data.data.find(
          (item) => item.orderIPStatus === "process"
        );
        if (itemWithCurrentState1) {
          setTimeout(() => {
            fetchData(tdata);
          }, 40000);
        }
        setAllDatas(data.data);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const handleClickOpen = (id, idAn, type) => {
    setCtype(type);

    if (type === "add") {
      if (!restrictAccess()) {
        setOpen(true);
      }
    } else if (type === "edit") {
      setorderMapId(id);
      setorderId(idAn);
      setOpen(true);
    }

    handleClose();
  };

  const ModalhandleClose = () => {
    setOpen(false);
  };
  const handleDeleteItem = async (mapOrderIPId, orderIPId) => {
    handleClose();
    setIsProceedLoading(true);
    setDeleteModal(true);
    const tdata = stcachdata;
    const newData = {
      mapOrderIPId: mapOrderIPId,
      orderIPId: orderIPId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "deletePublicIps",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/publicips",
        finalData
      ); // call the new API route

      if (data) {
        if (data.status === "ok") {
          toast.success("Public IP has been deleted successfully!");
          fetchData(tdata);
          setDeleteModal(false);
          setIsProceedLoading(false);
        } else if (data.status === "error") {
          setIsProceedLoading(false);
          setDeleteModal(false);
          toast.error(data.message);
        }
      }
    } catch (error) {
      // toast.error('An error occurred');
      setDeleteModal(false);
      setIsProceedLoading(false);
    }
  };

  const [openRowMenuIndex, setOpenRowMenuIndex] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [modalDeleteData, setModalDeleteData] = useState("");
  const [isProceedLoading, setIsProceedLoading] = useState(false);
  const handleDeleteModalOpen = (data) => {
    setDeleteModal(true);
    setModalDeleteData(data);
    handleClose();
  };
  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  const restrictAccess = () => {
    const res = allDatas?.some((obj) =>
      obj.currentmsg.toLowerCase().includes("processing")
    );
    setAddBtnBlock(res);
    return res;
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
              if (column === "orderIPStatus") {
                if (row[column] === "process") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Processing"
                        color="warning"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(253, 181, 40, 0.12)",
                          color: "rgb(253, 181, 40)",
                        }}
                      />
                    </TableCell>
                  );
                } else if (row[column] === "allocated") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Allocated"
                        color="success"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(114, 225, 40, 0.12)",
                          color: "rgb(98 167 53)",
                        }}
                      />
                    </TableCell>
                  );
                } else if (row[column] === "unallocated") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Unallocated"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(38, 198, 249, 0.12)",
                          color: "rgb(38, 198, 249)",
                        }}
                      />
                    </TableCell>
                  );
                } else if (row[column] === "reserverd") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Reserved"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(102, 108, 255, 0.12)",
                          color: "rgb(102, 108, 255)",
                        }}
                      />
                    </TableCell>
                  );
                } else if (row[column] === "failure") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Failure"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(255, 77, 73, 0.12)",
                          color: "rgb(255, 77, 73)",
                        }}
                      />
                    </TableCell>
                  );
                }
              } else if (column === "orderIPUsage") {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                    style={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                    title={row[column]}
                  >
                    {row[column].length > 0 ? row[column].join(", ") : "-"}
                  </TableCell>
                );
              } else if (column === "action") {
                if (
                  row.orderIPStatus === "process" ||
                  row.sysDefined ||
                  restrictAccess()
                  // ||  row.orderIPStatus === "failure"
                ) {
                  return (
                    <TableCell
                      key={column}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      // onClick={(event) => handleMenuClick(event, index)}
                    >
                      <Stack>
                        <Avatar
                          sx={{
                            bgcolor: "#6DCCDD",
                            width: 30,
                            height: 30,
                            cursor: "not-allowed",
                          }}
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
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleMenuClick(event, index)}
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
                }
              } else if (column === "orderIPDesc") {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                    style={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                    title={row[column]}
                  >
                    {row[column] ? row[column] : "-"}
                  </TableCell>
                );
              } else if (column === "teamName") {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                    style={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                    title={row[column]}
                  >
                    {row[column] ? row[column] : "-"}
                  </TableCell>
                );
              } else {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column] ? row[column] : "-"}
                  </TableCell>
                );
              }
            })}

            <Menu
              sx={{ top: "-10px !important" }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open && openRowMenuIndex === index}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <MenuItem
                onClick={() =>
                  handleClickOpen(row.mapOrderIPId, row.orderIPId, "edit")
                }
              >
                <EditOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} /> Edit
              </MenuItem>

              <MenuItem onClick={() => handleDeleteModalOpen(row)}>
                <DeleteOutlineOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} />{" "}
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
      Cookies.remove("PublicIpTableRowsPerPage");
      Cookies.remove("PublicIpTablePage");
    }
  }, [cookies]);

  const getPage = () => {
    const PublicIpTablePage = Cookies.get("PublicIpTablePage");
    if (
      PublicIpTablePage &&
      (PublicIpTablePage !== undefined || PublicIpTablePage !== null)
    ) {
      return PublicIpTablePage;
    } else {
      return 0;
    }
  };

  const getTableDatas = () => {
    const PublicIpTablePage = Cookies.get("PublicIpTablePage");
    const PublicIpTableRowsPerPage = Cookies.get("PublicIpTableRowsPerPage");
    if (PublicIpTablePage && PublicIpTablePage !== null) {
      setPage(parseInt(PublicIpTablePage, 10));
    }

    if (PublicIpTableRowsPerPage && PublicIpTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(PublicIpTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    Cookies.set("PublicIpTablePage", newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    Cookies.set("PublicIpTableRowsPerPage", newRowsPerPage);
    Cookies.remove("PublicIpTablePage");
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setPage(0);
    Cookies.remove("PublicIpTablePage");
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
    setPage(0);
    setSearchText(value);
  };
  const isRowSelected = (row) => selectedRows.indexOf(row) !== -1;

  const addInstancePopup = () => {
    console.log("testing");
  };

  return (
    <>
      <ComDataTable
        showFilter={true}
        filterData={passfilterData}
        selectedFilter={selectedFilter}
        setselectedFilter={setselectedFilter}
        hideSkeletonTbl={hideSkeletonTbl}
        searchLabel={"Search IP Address"}
        showSearch={true}
        showDownload={false}
        showAddButton={false}
        handleAddEvent={""}
        tableTitle={"List of IP Address"}
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

      {/* <AddPublicIps
        orderMapId={orderMapId}
        orderId={orderId}
        ctype={ctype}
        setloadTableInfo={setloadTableInfo}
        stcachdata={stcachdata}
        Modalopen={Modalopen}
        setOpen={setOpen}
        ModalhandleClose={ModalhandleClose}
        fetchData={fetchData}
      /> */}

      <Dialog
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Public IP?</DialogTitle>
        <DialogContent
          sx={{
            width: { lg: "500px", xs: "100%", sm: "100%", md: "500px" },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: "20px" }}
          >
            Public IP Name: <b>{modalDeleteData.orderIPName}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Public IP?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModalClose} sx={{ color: "#26c6da" }}>
            Cancel
          </Button>
          <Button
            sx={{
              backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da)",
            }}
            disabled={isProceedLoading}
            onClick={() =>
              handleDeleteItem(
                modalDeleteData.mapOrderIPId,
                modalDeleteData.orderIPId
              )
            }
            autoFocus
            variant="contained"
          >
            {isProceedLoading ? (
              <AutorenewIcon
                className={styles.loadingBtn}
                sx={{ color: "#fff" }}
              />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PublicIPDataTable;
