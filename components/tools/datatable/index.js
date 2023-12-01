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
} from "@mui/material";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// ** MUI ICON Components
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// ** Custom CSS
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// ** TextField Custom Style
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#015578",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "20px",
    },
    "&:hover fieldset": {
      border: "2px solid",
      borderColor: "#6DCCDD",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#015578",
    },
  },
});

// FormControl Custom Style
const CssFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "#015578",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "7px",
    },
    "&:hover fieldset": {
      border: "2px solid",
      borderColor: "#6DCCDD",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#015578",
    },
    // '& .MuiSvgIcon-root': {
    //   right: '45px',
    // },
  },
});

// Filter FormControl Custom Style
const CssFilterFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "#015578",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "30px",
    },
    "&:hover fieldset": {
      border: "2px solid",
      borderColor: "#6DCCDD",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#015578",
    },
    // '& .MuiSvgIcon-root': {
    //   right: '45px',
    // },
  },
});

// ** Select Field Styles
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 205,
    },
  },
};

const ComDataTable = ({
  notAllowedCursor,
  customAddBtn,
  showFilter = false,
  filterData = {},
  selectedFilter,
  setselectedFilter,
  hideSkeletonTbl,
  searchLabel,
  showSearch,
  showDownload,
  showAddButton,
  handleAddEvent,
  tableTitle,
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
  onSearchTextChange,
}) => {
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

  // console.log(customAddBtn);
  const handleFilterChange = (event) => {
    const newFilter = event.target.value;

    setselectedFilter(newFilter);
  };

  // console.log(showFilter);
  // console.log(filterData);
  // showDownload = true;
  useEffect(() => {
    if (filterData) {
      // console.log(filterData);
    }
  }, [filterData]);

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

  const router = useRouter();
  const isData = () => {
    if (hideSkeletonTbl && totalRecords > 0) {
      return "ShowDatas";
    } else if (hideSkeletonTbl && totalRecords === 0) {
      return "ShowNoDatas";
    } else if (!hideSkeletonTbl) {
      return "ShowSkeleton";
    }
    return false;
  };
  return (
    <div>
      <Grid container justifyContent="flex-start" alignItems="center">
        <Grid item>
          <Typography
            component="div"
            variant="h6"
            id="tableTitle"
            sx={{ color: "#4f4f4f", fontSize: "18px", textAlign: "left" }}
          >
            {tableTitle}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{ marginLeft: "auto" }}
          className={styles.cardHeaderItem}
        >
          {" "}
          {/* TR 01 class Name */}
          <Grid container alignItems="center">
            <Grid item className={styles.cardHeaderInput} sx={{ mr: 2 }}>
              {" "}
              {/* TR 01 class Name */}
              {showSearch && (
                <CssTextField
                  size="small"
                  label={searchLabel}
                  value={searchText}
                  onChange={handleSearchTextChange}
                />
              )}
            </Grid>
            <Grid item>
              {showFilter && (
                <>
                  &nbsp;
                  <CssFilterFormControl
                    margin="normal"
                    size="small"
                    fullWidth
                    sx={{ marginTop: "-20px" }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Select Team
                    </InputLabel>
                    <Select
                      onChange={handleFilterChange}
                      value={selectedFilter}
                      id="grouped-select"
                      label="Select Team"
                      style={{ width: "222px" }}
                      MenuProps={MenuProps}
                    >
                      {filterData &&
                        filterData.list.map(function (elem, index) {
                          return (
                            <MenuItem value={elem.id} key={index}>
                              {elem.value}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </CssFilterFormControl>
                </>
              )}
            </Grid>
            <Grid item>
              {showDownload && (
                <Button
                  size="small"
                  // background-image="linear-gradient(45deg, #0288d1, #26c6da)!important"
                  sx={{
                    // border: "1px solid red",
                    backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da)",
                    borderRadius: "20px",
                    fontSize: "15px",
                    padding: "5px 20px",
                    textTransform: "capitalize",
                    color: "white",
                  }}
                  // disabled={selectedRows.length === 0}
                  onClick={handleExport}
                  startIcon={<CloudDownloadIcon />}
                >
                  Export
                </Button>
              )}
            </Grid>
            <Grid item>
              {showAddButton && (
                <>
                  {!customAddBtn && (
                    <>
                      <Button
                        style={{
                          cursor: notAllowedCursor ? "not-allowed" : "pointer",
                        }}
                        className={styles.AddBtn}
                        onClick={handleAddEvent}
                        title={tableTitle}
                        startIcon={<AddCircleIcon className={styles.AddIcon} />}
                      ></Button>
                    </>
                  )}
                  {customAddBtn && <>{customAddBtn}</>}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <TableContainer component={Paper} className={styles.TableContainer}>
        {isData() == "ShowSkeleton" ? (
          <div hidden={isData() !== "ShowSkeleton"}>
            <Table aria-label="simple table" sx={{ overflowX: "scroll" }}>
              <TableHead sx={{ height: "55px" }}>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Skeletonrows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell scope="row" sx={{ p: "20px" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={15}
                      />
                    </TableCell>
                    <TableCell sx={{ p: "20px" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={15}
                      />
                    </TableCell>
                    <TableCell sx={{ p: "20px" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={15}
                      />
                    </TableCell>
                    <TableCell sx={{ p: "20px" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={15}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ p: "20px" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={15}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div hidden={data.length !== 0 || isData() == "ShowNoDatas"}>
            <Table aria-label="simple table" sx={{ overflowX: "scroll" }}>
              <TableHead sx={{ height: "55px" }}>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Skeletonrows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell scope="row" sx={{ p: "20px" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={15}
                      />
                    </TableCell>
                    <TableCell sx={{ p: "20px" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={15}
                      />
                    </TableCell>
                    <TableCell sx={{ p: "20px" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={15}
                      />
                    </TableCell>
                    <TableCell sx={{ p: "20px" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={15}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ p: "20px" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={15}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div hidden={data.length == 0}>
          <Table>
            <TableHead>
              <TableRow>
                {/*
                <TableCell padding="checkbox" sx={{ background: "#e1f3f6" }}>
                  <Checkbox
                    checked={selectedRows.length === data.length}
                    onChange={handleSelectAllRows}
                    sx={{
                      color: "#6b6f82",
                      "&.Mui-checked": { color: "#6DCCDD" },
                    }}
                  />
                </TableCell> */}
                {Object.keys(columnLabels).map((column) => {
                  if (
                    columnLabels[column] == "Action" ||
                    (router.pathname ==
                      "/surface/networks/networksecurity/firewall" &&
                      columnLabels[column] == "Status") ||
                    (router.pathname ==
                      "/surface/networks/networksecurity/nat" &&
                      columnLabels[column] == "Status")
                  ) {
                    return (
                      <TableCell
                        className={styles.tableHeaderCells}
                        key={column} // Add key prop
                        style={{
                          fontSize: "15px",
                          fontWeight: "500",
                          color: "#015578",
                          background: "#e1f3f6",
                          maxWidth: "100px", // Adjust this value based on your requirement
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 2,
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                        }}
                        title={columnLabels[column]}
                      >
                        {columnLabels[column]}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        className={styles.tableHeaderCells}
                        key={column} // Add key prop
                        onClick={() => handleSort(column)}
                        style={{
                          fontSize: "15px",
                          fontWeight: "500",
                          color: "#015578",
                          background: "#e1f3f6",
                          maxWidth: "100px", // Adjust this value based on your requirement
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 2,
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                        }}
                        title={columnLabels[column]}
                      >
                        {columnLabels[column]}
                        {sortColumn === column && (
                          <span>
                            &nbsp;
                            {sortDirection === "asc" ? (
                              <KeyboardArrowUp
                                className={styles.tableToggleIcon} // TR 01
                                // sx={{ position: "relative", top: "7px" }}
                              />
                            ) : (
                              <KeyboardArrowDown
                                className={styles.tableToggleIcon}
                                // sx={{ position: "relative", top: "7px" }}
                              />
                            )}
                          </span>
                        )}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>{formedTrows()}</TableBody>
          </Table>

          <TablePagination
            hidden={data.length == 0 || totalRecords == 0}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={totalRecords > page ? page : 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>

        <div hidden={isData() !== "ShowNoDatas"}>
          <Table>
            <TableHead>
              <TableRow>
                {/*
                  <TableCell padding="checkbox" sx={{ background: "#e1f3f6" }}>
                    <Checkbox
                      checked={selectedRows.length === data.length}
                      onChange={handleSelectAllRows}
                      sx={{
                        color: "#6b6f82",
                        "&.Mui-checked": { color: "#6DCCDD" },
                      }}
                    />
                  </TableCell> */}
                {Object.keys(columnLabels).map((column) => {
                  if (
                    columnLabels[column] == "Action" ||
                    (router.pathname ==
                      "/surface/networks/networksecurity/firewall" &&
                      columnLabels[column] == "Status") ||
                    (router.pathname ==
                      "/surface/networks/networksecurity/nat" &&
                      columnLabels[column] == "Status")
                  ) {
                    return (
                      <TableCell
                        className={styles.tableHeaderCells}
                        key={column} // Add key prop
                        style={{
                          fontSize: "15px",
                          fontWeight: "500",
                          color: "#015578",
                          background: "#e1f3f6",
                          maxWidth: "100px", // Adjust this value based on your requirement
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 2,
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                        }}
                        title={columnLabels[column]}
                      >
                        {columnLabels[column]}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        className={styles.tableHeaderCells}
                        key={column} // Add key prop
                        onClick={() => handleSort(column)}
                        style={{
                          fontSize: "15px",
                          fontWeight: "500",
                          color: "#015578",
                          background: "#e1f3f6",
                          maxWidth: "100px", // Adjust this value based on your requirement
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 2,
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                        }}
                        title={columnLabels[column]}
                      >
                        {columnLabels[column]}
                        {sortColumn === column && (
                          <span>
                            &nbsp;
                            {sortDirection === "asc" ? (
                              <KeyboardArrowUp
                                className={styles.tableToggleIcon} // TR 01
                                // sx={{ position: "relative", top: "7px" }}
                              />
                            ) : (
                              <KeyboardArrowDown
                                className={styles.tableToggleIcon}
                                // sx={{ position: "relative", top: "7px" }}
                              />
                            )}
                          </span>
                        )}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  style={{ padding: "80px 0 80px 0" }}
                  colSpan={Object.keys(columnLabels).length}
                >
                  {/* <Typography variant="h5" align="center" color="textSecondary">
                    No Entries
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    color="textSecondary"
                  >
                    There is no data available to display in the table.
                  </Typography> */}
                  <Image
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "150px",
                    }}
                    priority
                    alt="no datas"
                    src={require("../../../public/images/pages/common/No Data 06.jpg")}
                  />

                  <Typography
                    variant="body1"
                    align="center"
                    color="textSecondary"
                    fontSize="16px"
                    marginTop="15px"
                  >
                    There is no data available to display in the table.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </div>
  );
};

export default ComDataTable;
