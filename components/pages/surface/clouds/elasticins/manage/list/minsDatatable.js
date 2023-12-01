import Link from "next/link";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// TR 01
import styles from "./minDatatable.module.css";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import SettingsPowerOutlinedIcon from "@mui/icons-material/SettingsPowerOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HideSourceOutlinedIcon from "@mui/icons-material/HideSourceOutlined";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import ComDataTable from "../../../../../../tools/datatable";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useRouter } from "next/router";
import { useClientIP } from "../../../../../../../utils/context/ClientIPContext";

// ** Linear Progress CSS
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: "100%",
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#e1e1e1",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#ffa500",
  },
}));

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

function MinsDataTable() {
  const { clientIP } = useClientIP();

  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);
  const [commonDialAddress, setcommonDialAddress] = useState("Alert");
  const [commonDialContantAlert, setcommonDialContantAlert] = useState("Alert");

  const [commonDialTitle, setcommonDialTitle] = useState("Alert");
  const [commonDialContent, setcommonDialContent] = useState(
    "Are you sure you want?"
  );
  const [commonDialCancelBtn, setcommonDialCancelBtn] = useState("Cancel");
  const [commonDialSubmitBtn, setcommonDialSubmitBtn] = useState("submit");

  const [commonActionPreState, setcommonActionPreState] = useState("");
  const [commonActionState, setcommonActionState] = useState("");
  const [commonActionTenantId, setcommonActionTenantId] = useState("");

  const handleOpenDialog = (
    index,
    address,
    title,
    content,
    contentAlert,
    cancelBtn,
    submitBtn,
    state,
    prestate,
    tenant_vm_id
  ) => {
    setcommonActionPreState(prestate);
    setcommonActionState(state);
    setcommonActionTenantId(tenant_vm_id);

    setcommonDialTitle(title);
    setcommonDialAddress(address);
    setcommonDialContantAlert(contentAlert);
    setcommonDialContent(content);
    setcommonDialCancelBtn(cancelBtn);
    setcommonDialSubmitBtn(submitBtn);
    handleClose(index);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const [columnLabels, setColumnLabels] = useState({
    power_status: "Status",
    host_name: "Label",
    ip_adress: "IP Address",
    specification: "Specification",
    data_center: "DataCenter",
    os_details: "OS",
    action: "Action",
  });
  const [tpath, settpath] = useState(
    "/api/surface/clouds/elasticins/manage/list"
  );
  const [tAddress, settAddress] = useState("getallvmsInfo");

  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);

  const [scachdata, setscachdata] = useState([]);
  //TR 01 role name
  const [roleName, setRoleName] = useState();
  const cookies = Cookies.get("userData");
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : false;
    //TR 01 get and set the role name from cookie
    setRoleName(cachData.role_name);
    if (cachData) {
      setscachdata(cachData);
      fetchData(cachData);
    }
    getTableDatas();
  }, [cookies, page, rowsPerPage, searchText, sortColumn, sortDirection]);
  useEffect(() => {
    if (!cookies) {
      Cookies.remove("MinsTableRowsPerPage");
      Cookies.remove("MinsTablePage");
    }
  }, [cookies]);
  useEffect(() => {
    if (data && data.length > 0) {
      const initialMenuState = data.map(() => ({
        anchorEl: null,
        isOpen: false,
      }));
      setMenuState(initialMenuState);
    }
  }, [data]);

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event, index) => {
    const newMenuState = [...menuState];
    newMenuState[index] = { anchorEl: event.currentTarget, isOpen: true };
    setMenuState(newMenuState);
  };
  const handleClose = (index) => {
    //setAnchorEl(null);
    const newMenuState = [...menuState];
    newMenuState[index] = { anchorEl: null, isOpen: false };
    setMenuState(newMenuState);
  };

  const [menuState, setMenuState] = useState([]);

  const handleSubmit = () => {
    const pdata = {
      prestate: commonActionPreState,
      state: commonActionState,
      tenantvmid: commonActionTenantId,
    };
    updateData(pdata);
    //fetchData(tdata);
    // Your logic or actions when the user submits
    //handleCloseDialog();
  };

  const updateData = async (pdata) => {
    const newData = {
      action: pdata.state,
      tenantid: scachdata.tenant_id,
      tenantvmid: pdata.tenantvmid,
      userSerialId: scachdata.user_serial_id,
      ipaddress: clientIP,
    };
    console.log(newData);
    const finalData = {
      data: newData,
      endPoint: "updatevminfo",
      token: scachdata.accessToken,
    };
    try {
      const { data } = await axios.post(tpath, finalData); // call the new API route

      if (data.status_code == 9000) {
        toast.success("VM status has been updated successfully!");

        fetchData(scachdata);
      } else if (data.status_code == 9005) {
        toast.warning("Please Wait. NIC is in processing");

        fetchData(scachdata);
      } else if (data.status === "ok") {
        toast.success("VM has been deleted successfully!");

        setTimeout(() => {
          fetchData(scachdata);
        }, 500);
      } else {
        if (data.message) {
          toast.warning(data.message);
        }
      }
      handleCloseDialog();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const getPage = () => {
    const MinsTablePage = Cookies.get("MinsTablePage");
    if (
      MinsTablePage &&
      (MinsTablePage !== undefined || MinsTablePage !== null)
    ) {
      return MinsTablePage;
    } else {
      return 0;
    }
  };

  const fetchData = async (tdata) => {
    const newData = {
      search: searchText,
      start: getPage() * rowsPerPage,
      length: rowsPerPage,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
    };
    const finalData = {
      data: newData,
      endPoint: tAddress,
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(tpath, finalData); // call the new API route
      setData(data.data);
      setTotalRecords(data.totalRecords);
      sethideSkeletonTbl(true);

      if (data.recordsSize === 0 && page > 0) {
        setPage(page - 1);
        Cookies.set("MinsTablePage", page - 1);
      }
      getTableDatas();

      const shouldFetchData = data.data.some(
        (row) =>
          (row.power_status === 0 && row.currentstate === 7001) ||
          row.currentstate === 7001 ||
          (row.power_status === 0 && row.currentstate !== 7008)
      );
      if (shouldFetchData) {
        if (router.asPath.includes("/surface/clouds/elasticins/manage/list")) {
          // Fetch data every 40 seconds
          const timeoutId = setTimeout(() => {
            fetchData(tdata);
          }, 40000);

          // Cleanup function to clear the timeout when the component unmounts
          return () => clearTimeout(timeoutId);
        }
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const getTableDatas = () => {
    const MinsTablePage = Cookies.get("MinsTablePage");
    const MinsTableRowsPerPage = Cookies.get("MinsTableRowsPerPage");
    if (MinsTablePage && MinsTablePage !== null) {
      setPage(parseInt(MinsTablePage, 10));
    }
    if (MinsTableRowsPerPage && MinsTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(MinsTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    Cookies.set("MinsTablePage", newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    Cookies.set("MinsTableRowsPerPage", newRowsPerPage);
    Cookies.remove("MinsTablePage");
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setPage(0);
    Cookies.remove("MinsTablePage");
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

  const formedTrows = () => {
    return (
      <>
        {data.map((row, index) => (
          <StyledTableRow
            key={"main_" + row.host_name + "_" + index}
            selected={isRowSelected(row)}
            style={{ cursor: "pointer" }}
          >
            {/*
            <TableCell
              key={"checkbox_" + row.host_name + "_" + index}
              padding="checkbox"
              onClick={(event) => handleRowSelect(row)}
            >
              <Checkbox checked={isRowSelected(row)} />
        </TableCell> */}
            {Object.keys(columnLabels).map((column) => {
              if (column === "power_status") {
                if (row[column] === 0) {
                  if (row.currentstate == 7002 || row.currentstate == 7008) {
                    return (
                      <TableCell
                        key={
                          "powerstatus_" +
                          row.host_name +
                          "_" +
                          index +
                          "_" +
                          column
                        }
                        style={{
                          maxWidth: "100px", // Adjust this value based on your requirement
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 2,
                          whiteSpace: "nowrap",
                          cursor:
                            row.currentstate == 7008 ||
                            row.currentmsg == "Deleting"
                              ? "not-allowed"
                              : "pointer",
                        }}
                        title={row[column]}
                        onClick={(event) => handleRowSelect(row)}
                      >
                        <Box>
                          <Typography
                            component="h4"
                            variant="h5"
                            align="left"
                            fontSize={12}
                            mb={1}
                            color={"#015578"}
                            sx={{ fontWeight: "500" }}
                          >
                            Provisioning Failed
                          </Typography>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {" "}
                            {/* TR 01 style */}
                            <div style={{ flex: "80%" }}>
                              <BorderLinearProgress
                                sx={{ width: "100%" }}
                                variant="determinate"
                                value={parseFloat(row.vmpercentage)}
                              />
                            </div>
                            <div
                              style={{
                                flex: "20%",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <WarningAmberIcon
                                color="error"
                                sx={{ margin: "0 auto", height: "15px" }}
                              />
                            </div>
                          </div>
                        </Box>
                      </TableCell>
                    );
                  } else {
                    let filler = "Provisioning VM";
                    if (row.currentstate === 7001) {
                      filler = "Provisioning VM";
                    } else if (row.currentstate === 7005) {
                      filler = "Provisioning: Power On";
                    } else if (row.currentstate === 7006) {
                      filler = "Provisioning: Adding Disk";
                    } else if (row.currentstate === 7007) {
                      filler = "Provisioning: Mapping Private IP";
                    } else if (row.currentstate === 7009) {
                      filler = "Provisioning: Power On Failed";
                    } else if (row.currentstate === 7010) {
                      filler = "Provisioning: Additional Storage Failed";
                    } else if (row.currentstate === 7011) {
                      filler = "Provisioning: IP Mapping Failed";
                    } else if (row.currentstate === 7003) {
                      filler = "completed";
                    } else if (row.currentstate === 7012) {
                      filler = "Provisioning: snat rule Failed";
                    } else if (row.currentstate === 7013) {
                      filler = "Provisioning: dnat rule Failed";
                    } else if (row.currentstate === 7022) {
                      filler = "Provisioning: IP Allocation";
                    } else if (row.currentstate === 7022) {
                      filler = "Provisioning: snat rule";
                    } else if (row.currentstate === 7023) {
                      filler = "Provisioning: dnat rule";
                    }

                    return (
                      <TableCell
                        key={
                          "powerstatus_" +
                          row.host_name +
                          "_" +
                          index +
                          "_" +
                          column
                        }
                        onClick={(event) => handleRowSelect(row)}
                      >
                        <Typography
                          component="h4"
                          variant="h5"
                          align="left"
                          fontSize={12}
                          mb={1}
                          color={"#015578"}
                          sx={{ fontWeight: "500" }}
                        >
                          {filler}
                        </Typography>
                        <BorderLinearProgress
                          variant="determinate"
                          value={parseFloat(row.vmpercentage)}
                        />
                        <Typography
                          component="h4"
                          variant="h5"
                          align="right"
                          fontSize={12}
                          mt={1}
                          color={"#015578"}
                          sx={{ fontWeight: "500" }}
                        >
                          {parseFloat(row.vmpercentage)}%
                        </Typography>
                      </TableCell>
                    );
                  }
                } else {
                  if (row.currentstate == 7001) {
                    return (
                      <TableCell
                        key={
                          "powerstatus_" +
                          row.host_name +
                          "_" +
                          index +
                          "_" +
                          column
                        }
                        style={{
                          cursor:
                            row.currentmsg == "Deleting"
                              ? "not-allowed"
                              : "pointer",
                        }}
                        onClick={(event) => handleRowSelect(row)}
                      >
                        <Typography
                          component="h4"
                          variant="h5"
                          align="left"
                          fontSize={12}
                          mb={1}
                          color={"#015578"}
                          sx={{ fontWeight: "500" }}
                        >
                          {row.currentmsg} Please Wait...
                        </Typography>
                        <BorderLinearProgress
                          variant="determinate"
                          value={parseFloat(row.vmpercentage)}
                        />
                        <Typography
                          component="h4"
                          variant="h5"
                          align="right"
                          fontSize={12}
                          mt={1}
                          color={"#015578"}
                          sx={{ fontWeight: "500" }}
                        >
                          {parseFloat(row.vmpercentage)}%
                        </Typography>
                      </TableCell>
                    );
                  }

                  if (row[column] === 1) {
                    return (
                      <TableCell
                        key={
                          "powerstatus_" +
                          row.host_name +
                          "_" +
                          index +
                          "_" +
                          column
                        }
                        onClick={(event) => handleRowSelect(row)}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <FiberManualRecordIcon
                            fontSize="small"
                            color="error"
                            sx={{ marginRight: 0.5 }}
                          />
                          <Link
                            href={`/surface/clouds/elasticins/manage/detail/${row.tenant_vm_id}`}
                            passHref
                            style={{
                              textDecoration: "none",
                              color: "#000000de",
                              maxWidth: "100px", // Adjust this value based on your requirement
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 2,
                              whiteSpace: "nowrap",
                              cursor: "pointer",
                            }}
                          >
                            Power Off
                          </Link>
                        </Box>
                      </TableCell>
                    );
                  } else if (row[column] === 2) {
                    return (
                      <TableCell
                        key={
                          "powerstatus_" +
                          row.host_name +
                          "_" +
                          index +
                          "_" +
                          column
                        }
                        onClick={(event) => handleRowSelect(row)}
                      >
                        <Box sx={{ display: "flex" }}>
                          <FiberManualRecordIcon
                            fontSize="small"
                            color="success"
                            sx={{ marginRight: 0.5 }}
                          />
                          <Link
                            href={`/surface/clouds/elasticins/manage/detail/${row.tenant_vm_id}`}
                            passHref
                            style={{
                              textDecoration: "none",
                              color: "#000000de",
                              maxWidth: "100px", // Adjust this value based on your requirement
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 2,
                              whiteSpace: "nowrap",
                              cursor: "pointer",
                            }}
                          >
                            Running
                          </Link>
                        </Box>
                      </TableCell>
                    );
                  } else if (row[column] === 3) {
                    return (
                      <TableCell
                        key={
                          "powerstatus_" +
                          row.host_name +
                          "_" +
                          index +
                          "_" +
                          column
                        }
                        onClick={(event) => handleRowSelect(row)}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <FiberManualRecordIcon
                            fontSize="small"
                            color="error"
                            sx={{ marginRight: 0.5 }}
                          />
                          Shutdown OS
                        </Box>
                      </TableCell>
                    );
                  } else if (row[column] === 4) {
                    return (
                      <TableCell
                        key={
                          "powerstatus_" +
                          row.host_name +
                          "_" +
                          index +
                          "_" +
                          column
                        }
                        onClick={(event) => handleRowSelect(row)}
                      >
                        <Box>
                          <FiberManualRecordIcon
                            fontSize="small"
                            color="warning"
                            sx={{ marginRight: 0.5 }}
                          />
                          Power Reset
                        </Box>
                      </TableCell>
                    );
                  } else if (row[column] === 5) {
                    return (
                      <TableCell
                        key={
                          "powerstatus_" +
                          row.host_name +
                          "_" +
                          index +
                          "_" +
                          column
                        }
                        onClick={(event) => handleRowSelect(row)}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <FiberManualRecordIcon
                            fontSize="small"
                            color="neutral"
                            sx={{ color: "grey", marginRight: 0.5 }}
                          />
                          <Link
                            href={`/surface/clouds/elasticins/manage/detail/${row.tenant_vm_id}`}
                            passHref
                            style={{
                              textDecoration: "none",
                              color: "#000000de",
                              maxWidth: "100px", // Adjust this value based on your requirement
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 2,
                              whiteSpace: "nowrap",
                              cursor: "pointer",
                            }}
                          >
                            Suspend
                          </Link>
                        </Box>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={
                          "powerstatus_" +
                          row.host_name +
                          "_" +
                          index +
                          "_" +
                          column
                        }
                        onClick={(event) => handleRowSelect(row)}
                      >
                        <Box>
                          <FiberManualRecordIcon
                            fontSize="small"
                            color="error"
                            sx={{ marginRight: 0.5 }}
                          />
                          None
                        </Box>
                      </TableCell>
                    );
                  }
                }
              } else if (column === "data_center") {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                    style={{
                      cursor:
                        row.currentstate == 7008 || row.currentmsg == "Deleting"
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Box
                        component="img"
                        width={20}
                        height={20}
                        mr={1}
                        align="center"
                        alt="riyadh"
                        sx={{ borderRadius: "5px" }}
                        src="/images/pages/surface/clouds/elasticins/manage/list/riyadh.png"
                      />
                      {row.currentstate == 7008 ||
                      row.currentmsg == "Deleting" ? (
                        row[column]
                      ) : (
                        <Link
                          href={`/surface/clouds/elasticins/manage/detail/${row.tenant_vm_id}`}
                          passHref
                          style={{
                            textDecoration: "none",
                            color: "#000000de",
                            maxWidth: "100px", // Adjust this value based on your requirement
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: 2,
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                          }}
                        >
                          {row[column]}
                        </Link>
                      )}
                    </Box>
                  </TableCell>
                );
              } else if (column === "host_name") {
                return (
                  <TableCell
                    key={"common_" + row.host_name + "_" + index + "_" + column}
                    onClick={(event) => handleRowSelect(row)}
                    style={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      whiteSpace: "nowrap",
                      cursor:
                        row.currentstate == 7008 || row.currentmsg == "Deleting"
                          ? "not-allowed"
                          : "pointer",
                    }}
                    title={row[column]}
                  >
                    {row.currentstate == 7008 ||
                    row.currentmsg == "Deleting" ? (
                      row[column] ? (
                        row[column]
                      ) : (
                        "-"
                      )
                    ) : (
                      <Link
                        href={`/surface/clouds/elasticins/manage/detail/${row.tenant_vm_id}`}
                        passHref
                        style={{
                          textDecoration: "none",
                          color: "#000000de",
                          maxWidth: "100px", // Adjust this value based on your requirement
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 2,
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                        }}
                      >
                        {row[column]}
                      </Link>
                    )}
                  </TableCell>
                );
              } else if (column === "ip_adress") {
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
                      cursor:
                        row.currentstate == 7008 || row.currentmsg == "Deleting"
                          ? "not-allowed"
                          : "pointer",
                    }}
                    title={row[column]}
                  >
                    {row.currentstate == 7008 ||
                    row.currentmsg == "Deleting" ? (
                      row[column] ? (
                        row[column]
                      ) : (
                        "-"
                      )
                    ) : (
                      <Link
                        href={`/surface/clouds/elasticins/manage/detail/${row.tenant_vm_id}`}
                        passHref
                        style={{ textDecoration: "none", color: "#000000de" }}
                      >
                        {row[column] ? row[column] : "-"}
                      </Link>
                    )}
                  </TableCell>
                );
              } else if (column === "specification") {
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
                      cursor:
                        row.currentstate == 7008 || row.currentmsg == "Deleting"
                          ? "not-allowed"
                          : "pointer",
                    }}
                    title={row[column]}
                  >
                    {row.currentstate == 7008 ||
                    row.currentmsg == "Deleting" ? (
                      row[column] ? (
                        row[column]
                      ) : (
                        "-"
                      )
                    ) : (
                      <Link
                        href={`/surface/clouds/elasticins/manage/detail/${row.tenant_vm_id}`}
                        passHref
                        style={{ textDecoration: "none", color: "#000000de" }}
                      >
                        {row[column] ? row[column] : "-"}
                      </Link>
                    )}
                  </TableCell>
                );
              } else if (column === "os_details") {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                    sx={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      cursor:
                        row.currentstate == 7008 || row.currentmsg == "Deleting"
                          ? "not-allowed"
                          : "pointer",
                    }}
                    title={row[column]}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        maxWidth: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        width={20}
                        height={20}
                        mr={1}
                        align="center"
                        alt="riyadh"
                        sx={{ borderRadius: "5px" }}
                        src={
                          "/images/pages/surface/clouds/elasticins/os/" +
                          row.os_logo_name
                        }
                      />
                      {row.currentstate == 7008 ||
                      row.currentmsg == "Deleting" ? (
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: 2,
                            whiteSpace: "nowrap",
                            maxWidth: "100px",
                          }}
                        >
                          {row[column]}
                        </div>
                      ) : (
                        <Link
                          href={`/surface/clouds/elasticins/manage/detail/${row.tenant_vm_id}`}
                          passHref
                          style={{ textDecoration: "none", color: "#000000de" }}
                        >
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 2,
                              whiteSpace: "nowrap",
                              maxWidth: "100px",
                            }}
                          >
                            {row[column]}
                          </div>
                        </Link>
                      )}
                    </Box>
                  </TableCell>
                );
              } else if (column === "action") {
                if (
                  row.power_status === 0 ||
                  row.currentstate === 7001 ||
                  (roleName !== "owner" &&
                    roleName !== "administrator" &&
                    roleName != "manager")
                ) {
                  if (
                    row.currentstate === 7002 ||
                    row.currentstate === 7008 ||
                    row.currentstate !== 7001
                  ) {
                    return (
                      <TableCell
                        key={
                          "action_" + row.host_name + "_" + index + "_" + column
                        }
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
                  } else {
                    return (
                      <TableCell
                        key={
                          "action_" + row.host_name + "_" + index + "_" + column
                        }
                        sx={{ cursor: "not-allowed;" }}
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
                } else {
                  return (
                    <TableCell
                      key={
                        "action_" + row.host_name + "_" + index + "_" + column
                      }
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
              } else {
                return (
                  <TableCell
                    key={"common_" + row.host_name + "_" + index + "_" + column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column] ? row[column] : "-"}
                  </TableCell>
                );
              }
            })}

            <Menu
              sx={{ top: "-10px !important" }}
              className={styles.popupMenu} //* TR o1 */
              key={"menu_" + row.host_name + "_" + index}
              id={"basic-menu" + row.host_name + "_" + index}
              anchorEl={menuState[index]?.anchorEl}
              open={menuState[index]?.isOpen ? true : false}
              onClose={() => handleClose(index)}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              {row.currentstate !== 7008 ? (
                <Link
                  href={`/surface/clouds/elasticins/manage/detail/${row.tenant_vm_id}`}
                  passHref
                >
                  <MenuItem
                    onClick={() => handleClose(index)}
                    sx={{
                      color: "#015578",
                    }}
                  >
                    <ViewInArOutlinedIcon sx={{ mr: 2, fontSize: "18px" }} />{" "}
                    View Details
                  </MenuItem>
                </Link>
              ) : (
                <MenuItem
                  disabled
                  onClick={() => handleClose(index)}
                  sx={{
                    color: "#015578",
                    cursor: "not-allowed !important",
                    pointerEvents: "auto !important",
                  }}
                >
                  <ViewInArOutlinedIcon sx={{ mr: 2, fontSize: "18px" }} /> View
                  Details
                </MenuItem>
              )}
              <Divider />

              {row.power_status === 1 ||
              row.power_status === 3 ||
              row.power_status === 4 ||
              row.power_status === 5 ? (
                <MenuItem
                  onClick={() =>
                    handleOpenDialog(
                      index,
                      row.host_name,
                      "Power On Server ?",
                      "Elastic Instance :",
                      "Are you sure you want to Power On server?",
                      "Cancel",
                      "POWER ON",
                      "power_on",
                      "2",
                      row.tenant_vm_id
                    )
                  }
                >
                  <PowerSettingsNewOutlinedIcon
                    sx={{ mr: 2, fontSize: "18px" }}
                  />{" "}
                  Power On
                </MenuItem>
              ) : null}
              {row.power_status === 2 ? (
                <MenuItem
                  onClick={() =>
                    handleOpenDialog(
                      index,
                      row.host_name,
                      "Power Off Server ?",
                      "Elastic Instance :",
                      "Are you sure you want to Power Off server?",
                      "CANCEL",
                      "POWER OFF",
                      "power_off",
                      "1",
                      row.tenant_vm_id
                    )
                  }
                >
                  <SettingsPowerOutlinedIcon sx={{ mr: 2, fontSize: "18px" }} />{" "}
                  Power Off
                </MenuItem>
              ) : null}
              {row.power_status === 2 ? (
                <MenuItem
                  onClick={() =>
                    handleOpenDialog(
                      index,
                      row.host_name,
                      "Suspend Server ?",
                      "Elastic Instance :",
                      "Are you sure you want to Suspend server?",
                      "Cancel",
                      "SUSPEND",
                      "suspend",
                      "5",
                      row.tenant_vm_id
                    )
                  }
                >
                  <InsertPageBreakOutlinedIcon
                    sx={{ mr: 2, fontSize: "18px" }}
                  />{" "}
                  Suspend
                </MenuItem>
              ) : null}
              {row.power_status === 2 ? (
                <MenuItem
                  onClick={() =>
                    handleOpenDialog(
                      index,
                      row.host_name,
                      "Reset Server ?",
                      "Elastic Instance :",
                      "Are you sure you want to Reset server?",
                      "Cancel",
                      "RESET",
                      "reset",
                      "4",
                      row.tenant_vm_id
                    )
                  }
                >
                  <RestartAltOutlinedIcon sx={{ mr: 2, fontSize: "18px" }} />{" "}
                  Reset
                </MenuItem>
              ) : null}
              {row.power_status === 2 ? (
                <MenuItem
                  onClick={() =>
                    handleOpenDialog(
                      index,
                      row.host_name,
                      "Shutdown OS Server ?",
                      "Elastic Instance :",
                      "Are you sure you want to Shutdown OS server?",
                      "Cancel",
                      "SHUTDOWN",
                      "shutdown",
                      "3",
                      row.tenant_vm_id
                    )
                  }
                >
                  <HideSourceOutlinedIcon sx={{ mr: 2, fontSize: "18px" }} />{" "}
                  Shutdown OS
                </MenuItem>
              ) : null}
              {row.power_status === 1 ? <Divider /> : null}

              {row.power_status === 1 ||
              row.currentstate === 7002 ||
              row.currentstate === 7008 ? (
                <MenuItem
                  onClick={() =>
                    handleOpenDialog(
                      index,
                      row.host_name,
                      "Delete Server ?",
                      "Elastic Instance :",
                      "Are you sure you want to Delete server?",
                      "Cancel",
                      "DELETE",
                      "delete",
                      "6",
                      row.tenant_vm_id
                    )
                  }
                >
                  <DeleteOutlineOutlinedIcon sx={{ mr: 2, fontSize: "18px" }} />{" "}
                  Delete
                </MenuItem>
              ) : null}
            </Menu>
          </StyledTableRow>
        ))}

        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle className={styles.DialogTitle}>
            {commonDialTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {commonDialContent}{" "}
              <span style={{ color: "black", fontWeight: "bold" }}>
                {commonDialAddress}
              </span>
              <br />
              <br />
              {commonDialContantAlert}
            </DialogContentText>

            {console.log(commonDialSubmitBtn, "commonDialSubmitBtn")}

            {commonDialSubmitBtn === "DELETE" ? (
              <DialogContentText sx={{ margin: "20px 0" }}>
                <Chip
                  icon={<ReportProblemOutlinedIcon color="error" />}
                  label="Any DNAT and SNAT created for internal IPs mapped to this VM need to be deleted manually."
                  sx={{
                    "& .MuiChip-label ": {
                      whiteSpace: "wrap !important",
                    },

                    background: "#fff3e0",
                    fontSize: "14px",
                    color: "#ff9800",
                    padding: "30px 10px",
                    // whiteSpace: "unset !important",
                  }}
                />
              </DialogContentText>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              sx={{
                color: "#26c6da !important",
              }}
            >
              {commonDialCancelBtn}
            </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              sx={{
                backgroundImage:
                  "linear-gradient(45deg, #0288d1, #26c6da)!important;",
                color: "#fff !important",
                textTransform: "capitalize !important",
              }}
            >
              {commonDialSubmitBtn}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  const addInstancePopup = () => {
    router.push("/surface/clouds/elasticins/create");
  };

  return (
    <ComDataTable
      hideSkeletonTbl={hideSkeletonTbl}
      searchLabel={"Search Instance"}
      showSearch={true}
      // showDownload={true}
      showAddButton={true}
      handleAddEvent={addInstancePopup}
      tableTitle={"List of Instance"}
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
