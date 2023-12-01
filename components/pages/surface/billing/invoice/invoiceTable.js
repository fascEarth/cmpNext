// ** React Imports
import * as React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { PDFDocument, rgb } from "pdf-lib";
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
import Modal from "@mui/material/Modal";

// ** MUI ICON Components
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useClientIP } from "../../../../../utils/context/ClientIPContext";

// Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "#fafafa",
  border: "0px solid #000",
  borderRadius: "7px",
  boxShadow: 24,
  p: 4,
};

const StyledIframe = styled("iframe")`
  width: 100%;
  min-width: 600px;
  height: 460px;
  border: 0;
`;
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

function InvoiceDataTable() {
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

  const router = useRouter();
  const { id } = router.query;

  const getCardInfo = async (did, cachData) => {
    const newData = {
      cardId: did,
      userSerialId: cachData.user_serial_id,
      tenantId: cachData.tenant_id,
    };
    const finalData = {
      data: newData,
      endPoint: "getpmethodsinfo",
      cachData: cachData.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/billing/invoice",
        finalData
      ); // call the new API route
      console.log(data);
      if (data) {
        console.log(data);

        router.push("/surface/billing/invoice");
      } else {
        router.push("/surface/billing/invoice");
        //toast.error('Error: '+data.status_code+' ' + data.status_msg);
      }
    } catch (error) {
      router.push("/surface/billing/bsettings");
      //toast.error('An error occurred');
    }
  };

  const cookies = Cookies.get("userData");
  const [stcachData, setstcachData] = useState(false);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    setstcachData(cachData);
    if (cookies) {
      if (id) {
        getCardInfo(id, cachData);
      } else {
        fetchData(cachData);
      }
    }
    getTableDatas();
  }, [id, cookies, page, rowsPerPage, searchText, sortColumn, sortDirection]);

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openRowMenuIndex, setOpenRowMenuIndex] = useState(null);
  const handleMenuClick = (event, index) => {
    setOpenRowMenuIndex(index);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* changing items */
  const [columnLabels, setColumnLabels] = useState({
    invoiceNo: "Invoice Number",
    invoiceDate: "Date",
    invoiceAmount: "Amount",
    invoicePaymentMethod: "Payment Method",
    invoiceBalance: "Balance",
    invoiceStatus: "Status",
    action: "Action",
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
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getAllinvoiceInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/billing/invoice",
        finalData
      ); // call the new API route

      /* const sampledata = {
        data: [
          {
            invoiceNo: "INV-0023456",
            invoiceDate: "15-07-2023",
            invoiceAmount: "SR 2,000",
            invoicePaymentMethod: "Credit Card",
            invoiceBalance: "SR 0",
            invoiceStatus: "PAID",
          },
          {
            invoiceNo: "INV-0023457",
            invoiceDate: "15-07-2023",
            invoiceAmount: "SR 2,000",
            invoicePaymentMethod: "Credit Card",
            invoiceBalance: "SR 0",
            invoiceStatus: "UNPAID",
          },
          {
            invoiceNo: "INV-0023458",
            invoiceDate: "15-07-2023",
            invoiceAmount: "SR 2,000",
            invoicePaymentMethod: "Credit Card",
            invoiceBalance: "SR 0",
            invoiceStatus: "PAID",
          },
        ],
        totalRecords: 15,
      };*/

      //const kdata = data.data.length > 0 ? data : sampledata;
      if (data.recordsSize === 0 && page > 0) {
        setPage(page - 1);
        Cookies.set("InvoiceTablePage", page - 1);
      }
      getTableDatas();
      setData(data.data);
      setTotalRecords(data.totalRecords);

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
            key={row.invoiceNo}
            selected={isRowSelected(row)}
            style={{ cursor: "pointer" }}
          >
            {/*
            <TableCell
              padding="checkbox"
              onClick={(event) => handleRowSelect(row)}
            >
              <Checkbox
                checked={isRowSelected(row)}
                sx={{ color: "#6b6f82", "&.Mui-checked": { color: "#6DCCDD" } }}
              />
            </TableCell>
        */}
            {Object.keys(columnLabels).map((column) => {
              if (column === "invoiceStatus") {
                if (row[column] === "PAID") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="PAID"
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
                } else {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="UNPAID"
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
              } else if (column === "action") {
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
              {row.invoiceStatus && row.invoiceStatus === "UNPAID" && (
                <MenuItem onClick={() => handlepaynowBilling(row.invoiceId)}>
                  <ReceiptOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} />
                  Pay Now
                </MenuItem>
              )}

              <MenuItem onClick={() => precreateInvoicePDF(row)}>
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

  const handlepaynowBilling = async (id) => {
    const tdata = stcachData;
    console.log("coming");
    const newData = {
      invoiceId: parseInt(id),
      customerId: tdata.tenant_id,
      userId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "addNewBillingCard",
      token: tdata.accessToken,
    };
    console.log(finalData);
    try {
      const { data } = await axios.post(
        "/api/surface/billing/invoice",
        finalData
      ); // call the new API route
      console.log(data);
      if (data) {
        setIframeSrc(data.url);
        handleClickOpen();
      } else {
        console.log("Error: " + data.status_code + " " + data.status_msg);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };
  const [iframeSrc, setIframeSrc] = useState("");
  const [openModal, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const precreateInvoicePDF = async (datas) => {
    console.log(datas, "dataa");

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const helveticaFont = await pdfDoc.embedFont("Helvetica");
    // Add content to the PDF
    page.drawText(`invoiceNo: ${datas.invoiceNo}`, {
      x: 50,
      y: 300,
      size: 18,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`invoiceAmount: ${datas.invoiceAmount}`, {
      x: 50,
      y: 270,
      size: 18,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`invoiceBalance: ${datas.invoiceBalance}`, {
      x: 50,
      y: 240,
      size: 18,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`invoiceDate: ${datas.invoiceDate}`, {
      x: 50,
      y: 210,
      size: 18,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`invoicePaymentMethod: ${datas.invoicePaymentMethod}`, {
      x: 50,
      y: 180,
      size: 18,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`invoiceStatus: ${datas.invoiceStatus}`, {
      x: 50,
      y: 150,
      size: 18,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = pdfUrl;
    downloadLink.download = "invoice.pdf";
    downloadLink.click();
    // Clean up the URL object
    URL.revokeObjectURL(pdfUrl);
  };

  useEffect(() => {
    if (!cookies) {
      Cookies.remove("InvoiceTableRowsPerPage");
      Cookies.remove("InvoiceTablePage");
    }
  }, [cookies]);

  const getPage = () => {
    const InvoiceTablePage = Cookies.get("InvoiceTablePage");
    if (
      InvoiceTablePage &&
      (InvoiceTablePage !== undefined || InvoiceTablePage !== null)
    ) {
      return InvoiceTablePage;
    } else {
      return 0;
    }
  };

  const getTableDatas = () => {
    const InvoiceTablePage = Cookies.get("InvoiceTablePage");
    const InvoiceTableRowsPerPage = Cookies.get("InvoiceTableRowsPerPage");
    if (InvoiceTablePage && InvoiceTablePage !== null) {
      setPage(parseInt(InvoiceTablePage, 10));
    }

    if (InvoiceTableRowsPerPage && InvoiceTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(InvoiceTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    Cookies.set("InvoiceTablePage", newPage);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    Cookies.set("InvoiceTableRowsPerPage", newRowsPerPage);
    Cookies.remove("InvoiceTablePage");
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
    Cookies.remove("InvoiceTablePage");
  };
  const [invoiceData, setInvoiceData] = useState([]);

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
    setPage(0);
  };
  const isRowSelected = (row) => selectedRows.indexOf(row) !== -1;

  const addInstancePopup = () => {};

  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);
  return (
    <>
      <ComDataTable
        hideSkeletonTbl={hideSkeletonTbl}
        searchLabel={"Search Invoice"}
        showSearch={true}
        showDownload={true}
        showAddButton={false}
        handleAddEvent={addInstancePopup}
        tableTitle={"List of Invoice"}
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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StyledIframe
            src={iframeSrc}
            id="telr"
            sandbox="allow-forms allow-modals allow-popups-to-escape-sandbox allow-popups allow-scripts allow-top-navigation allow-same-origin"
          />
        </Box>
      </Modal>
    </>
  );
}

export default InvoiceDataTable;
