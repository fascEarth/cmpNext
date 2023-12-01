// ** React Imports
import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

// ** MUI ICON Components
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
// ** Custom CSS
import styles from "./index.module.css";
import { toast } from "react-toastify";
import { useClientIP } from "../../../../../../../utils/context/ClientIPContext";
import Chip from "@mui/material/Chip";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

// FormControl Custom Style
const CssFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "none",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "none",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "0",
      borderRadius: "0",
    },
    "&:hover fieldset": {
      border: "0px solid",
      borderColor: "none",
    },
    "&.Mui-focused fieldset": {
      borderColor: "none",
    },
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

// ** Additional Storage Table CSS
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e1f3f6",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

// ** Additional Storage Table Function
function createDiskData(id, disk, type, size, cost, action) {
  return { id, disk, type, size, cost, action };
}

const Diskrows = [
  createDiskData(
    "0",
    <Box variant="text" align="left" className={styles.diskBox}>
      <Box className={styles.tableScrollBox}>Boot Disk</Box>
    </Box>,
    <CssFormControl className={styles.diskSizeBox} size="small">
      <Select
        className={styles.tableScrollSelect}
        defaultValue=""
        id="grouped-select-0"
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        MenuProps={MenuProps}
      >
        <MenuItem value={1}>NVMe</MenuItem>
      </Select>
    </CssFormControl>,
    <Box variant="text" align="center" className={styles.diskBox}>
      <Box className={styles.tableScrollBox}>
        <RemoveCircleIcon className={styles.DiskSizeMinus} /> 20 GB{" "}
        <AddCircleOutlinedIcon className={styles.DiskSizePlus} />{" "}
      </Box>
    </Box>,
    <Box variant="text" align="left" className={styles.diskBox}>
      <Box className={styles.tableScrollBox}>9.20</Box>
    </Box>,
    <Box sx={{ marginTop: "10px" }}>
      <RemoveCircleIcon sx={{ cursor: "pointer", color: "#b0b0b0" }} />
    </Box>
  ),

  createDiskData(
    "1",
    <Box variant="text" align="left" className={styles.diskBox}>
      Boot Disk
    </Box>,
    <CssFormControl className={styles.diskSizeBox} size="small">
      <Select
        defaultValue=""
        id="grouped-select-1"
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        MenuProps={MenuProps}
      >
        <MenuItem value={1}>NVMe</MenuItem>
      </Select>
    </CssFormControl>,
    <Box variant="text" align="center" className={styles.diskBox}>
      <RemoveCircleIcon className={styles.DiskSizeMinus} /> 20 GB
      <AddCircleOutlinedIcon className={styles.DiskSizePlus} />
    </Box>,
    <Box variant="text" align="left" className={styles.diskBox}>
      9.20
    </Box>,
    <Box sx={{ marginTop: "10px" }}>
      <RemoveCircleIcon sx={{ cursor: "pointer", color: "#b0b0b0" }} />
    </Box>
  ),
];

function MinstanceDetailStorages({
  sslugId,
  comisSelectAllowcAction,
  isSnapshotDisabled,
  isNicActionDisabled,
  setisStorageActionDisabled,
}) {
  // console.log(comisSelectAllowcAction);
  const { clientIP } = useClientIP();
  const [scachdata, setscachdata] = useState([]);
  const cookies = Cookies.get("userData");

  const slugId = sslugId;

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : false;

    if (cachData && slugId) {
      setscachdata(cachData);
      loadAllStorages(cachData);
    }
  }, [cookies, slugId]);

  const [openStoragesInfo, setopenStoragesInfo] = useState(false);
  const [dataStoragesInfo, setdataStoragesInfo] = useState({});
  const [openStoragesInfoDisable, setopenStoragesInfoDisable] = useState(false);
  const [originalStoragesInfo, setoriginalStoragesInfo] = useState({});
  const [storageOpenCost, setstorageOpenCost] = useState(0);
  const [allDatas, setallDatas] = useState([]);
  // const [failed, setfailed] = useState(false);
  const loadAllStorages = async (tdata) => {
    setopenStoragesInfoDisable(true);
    // setisStorageActionDisabled(true);
    const newData = {
      tenantvmid: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getStoragesInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      setallDatas(data.message.list);
      if (data.status === "ok") {
        setopenStoragesInfo(true);
        setdataStoragesInfo(data.message);
        setoriginalStoragesInfo(data.message);
        setstorageOpenCost(parseFloat(data.message.perstorage));
        if (data.message.state === "processing") {
          setTimeout(() => {
            loadAllStorages(tdata);
          }, 20000);
          /*
              const itemWithCurrentState1 = data.message.find(
                (item) => item.state === "processing"
              );
              if (itemWithCurrentState1) {
                setTimeout(() => {
                  loadAllStorages(tdata);
                }, 40000);
              }*/
          // Fetch data every 40 seconds
          /*  const timeoutId =  setTimeout(() => {
                    loadAllStorages(tdata);
                  }, 40000);  */

          // Cleanup function to clear the timeout when the component unmounts
          //return () => clearTimeout(timeoutId);
        } else if (data.message.state === "success") {
          setopenStoragesInfoDisable(false);
          setisStorageActionDisabled(false);
          Cookies.set("storageInProcess", false);

          toast.success("Storages has been updated successfully!");
          // setopenStoragesInfo(true);
        } else if (data.message.state === "error") {
          //setopenStoragesInfo(true);
          // setfailed(true);
          setopenStoragesInfoDisable(false);
          setisStorageActionDisabled(false);
          Cookies.set("storageInProcess", false);

          // toast.error("Storages updation failed!");
        } else if (data.message.state === "") {
          setopenStoragesInfoDisable(false);
          setisStorageActionDisabled(false);
          Cookies.set("storageInProcess", false);
        }
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  // Function to add a new storage entry
  const handleAddStorage = () => {
    // Calculate the new storagePrize based on storageOpenCost
    // console.log(storageOpenCost);
    const newStoragePrize = parseInt(1) * storageOpenCost;
    // console.log(newStoragePrize);
    // Create a new storage object
    const newStorage = {
      storageName: `Volume ${dataStoragesInfo.list.length}`,
      storageTypeName: 1,
      storageSizeName: "1G", // You can adjust this as needed
      storagePrize: newStoragePrize.toFixed(2),
      // Format to 2 decimal places
    };
    // Update dataStoragesInfo.list by creating a new array with the new storage
    const updatedList = [...dataStoragesInfo.list, newStorage];

    // Update the state with the new list
    setdataStoragesInfo((prevData) => ({
      ...prevData,
      list: updatedList,
    }));
  };

  // Function to check if removal should be disabled based on storageId existence
  const shouldDisableRemoval = (item) => {
    return item.storageId !== undefined;
  };

  // Function to remove a storage item by index
  const handleRemoveStorage = (indexToRemove) => {
    // Check if the storageId exists for the item to prevent removal

    const itemToRemove = dataStoragesInfo.list[indexToRemove];
    if (shouldDisableRemoval(itemToRemove, indexToRemove)) {
      // Return early if removal is disabled
      return;
    }

    // Filter out the item at the specified index
    const updatedList = dataStoragesInfo.list.filter(
      (_, index) => index !== indexToRemove
    );

    // Update the state with the new list
    setdataStoragesInfo((prevData) => ({
      ...prevData,
      list: updatedList,
    }));
  };

  // Function to increment storage size and update storagePrize
  const handleIncrementStorageSize = (indexToIncrement) => {
    // Get the storage item to increment

    const itemToIncrement = dataStoragesInfo.list[indexToIncrement];
    // Calculate the new storageSizeName and storagePrize after increment
    const updatedSize =
      parseInt(itemToIncrement.storageSizeName.split("G")[0]) + 1;
    const newStoragePrize = updatedSize * storageOpenCost;

    // Create a new storage object with updated values
    const updatedStorage = {
      ...itemToIncrement,
      storageSizeName: `${updatedSize}G`, // Update the size
      storagePrize: newStoragePrize.toFixed(2), // Update the prize
    };

    // Create a new list with the updated storage object
    const updatedList = dataStoragesInfo.list.map((item, index) =>
      index === indexToIncrement ? updatedStorage : item
    );

    // Update the state with the new list
    setdataStoragesInfo((prevData) => ({
      ...prevData,
      list: updatedList,
    }));
  };

  // Function to check if decrement should be disabled for an item
  const shouldDisableDecrement = (item, indexToRemove) => {
    // Add your condition here to determine if decrement should be disabled
    // For example, you can check if "storageId" exists
    //return item.storageId !== undefined;

    // console.log(item);
    // console.log(indexToRemove);
    // Modify this function to define your condition
    // If storageId exists, return true (disable removal), otherwise, return false (enable removal)
    // console.log(originalStoragesInfo);
    const itemToRemoveOrg = originalStoragesInfo.list[indexToRemove];
    if (itemToRemoveOrg) {
      // console.log(itemToRemoveOrg);
      const sizeOrg = parseInt(itemToRemoveOrg.storageSizeName.split("G")[0]);

      const recrg = parseInt(item.storageSizeName.split("G")[0]);
      // console.log(recrg);
      // console.log(sizeOrg);
      if (recrg <= sizeOrg) {
        // console.log(item.storageId !== undefined);
        return item.storageId !== undefined;
      }
    } else {
      return item.storageId !== undefined;
    }
  };

  // Function to check if decrement should be disabled for an item
  const shouldDisableDecrementAn = (item, indexToRemove) => {
    const itemToDecrement = dataStoragesInfo.list[indexToRemove];
    // console.log(parseInt(itemToDecrement.storageSizeName.split("G")[0]));
    const updatedSize = Math.max(
      parseInt(itemToDecrement.storageSizeName.split("G")[0]) - 1,
      0 // Ensure the size doesn't go below 1
    );
    // console.log(updatedSize);
    if (updatedSize <= 0) {
      return true;
    }
  };
  // Function to decrement storage size and update storagePrize
  const handleDecrementStorageSize = (indexToDecrement) => {
    // console.log("coming");

    // Get the storage item to decrement
    const itemToDecrement = dataStoragesInfo.list[indexToDecrement];

    // Check if the storageId exists for the item to prevent removal
    if (shouldDisableDecrement(itemToDecrement, indexToDecrement)) {
      // console.log("enters");

      return;
    }

    // console.log("enters");
    // Calculate the new storageSizeName and storagePrize after decrement
    // Calculate the new storageSizeName and storagePrize after decrement
    const updatedSize = Math.max(
      parseInt(itemToDecrement.storageSizeName.split("G")[0]) - 1,
      1 // Ensure the size doesn't go below 1
    );

    const newStoragePrize = updatedSize * storageOpenCost;

    // Create a new storage object with updated values

    const updatedStorage = {
      ...itemToDecrement,
      storageSizeName: `${updatedSize}G`, // Update the size
      storagePrize: newStoragePrize.toFixed(2), // Update the prize
    };

    // Create a new list with the updated storage object
    const updatedList = dataStoragesInfo.list.map((item, index) =>
      index === indexToDecrement ? updatedStorage : item
    );

    // Update the state with the new list
    setdataStoragesInfo((prevData) => ({
      ...prevData,
      list: updatedList,
    }));
  };

  const submitStoragesList = async () => {
    setopenStoragesInfoDisable(true);
    setisStorageActionDisabled(true);
    Cookies.set("storageInProcess", true);

    // console.log(dataStoragesInfo);
    const tdata = scachdata;

    const newData = {
      dataStoragesInfo: dataStoragesInfo.list,
      tenantvmid: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "updateStoragesInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      // console.log(data);
      if (data.status_code === "9000") {
        toast.info("Storage processing is in progress. Please wait.");
        //setopenStoragesInfo(false);
        loadAllStorages(tdata);
      }
    } catch (error) {
      setopenStoragesInfoDisable(false);
      setisStorageActionDisabled(false);
      Cookies.set("storageInProcess", false);

      // toast.error('An error occurred');
    }
  };

  const isDataChange = () => {
    const isExist = dataStoragesInfo.list?.every((item, index) => {
      return (
        item.storageSizeName ===
          originalStoragesInfo.list[index]?.storageSizeName ||
        item.storageSizeName ===
          originalStoragesInfo.list[index]?.storageTypeName
      );
    });
    return isExist;
  };

  return (
    <>
      {openStoragesInfo && (
        <Box>
          <Box sx={{ position: "relative" }}>
            {!isSnapshotDisabled && !isNicActionDisabled && (
              <Typography
                component="p"
                variant="p"
                color={"#6b6f82"}
                align="left"
              >
                Attach additional storage to your VM Instance.
              </Typography>
            )}
            {isSnapshotDisabled && (
              <Chip
                icon={<ReportProblemOutlinedIcon color="error" />}
                label="please wait until the snapshot action is complete."
                sx={{
                  background: "#fff3e0",
                  fontSize: "14px",
                  color: "#ff9800",
                  padding: "0 10px",
                }}
              />
            )}
            {isNicActionDisabled && (
              <Chip
                icon={<ReportProblemOutlinedIcon color="error" />}
                label="please wait until the network upgradation gets completed."
                sx={{
                  background: "#fff3e0",
                  fontSize: "14px",
                  color: "#ff9800",
                  padding: "0 10px",
                }}
              />
            )}
            {/* {failed && (
              <Chip
                icon={<ReportProblemOutlinedIcon color="error" />}
                label="Storage upgradation failed"
                sx={{
                  background: "#fff3e0",
                  fontSize: "14px",
                  color: "#ff9800",
                  padding: "0 10px",
                }}
              />
            )} */}
            <Box
              sx={{
                cursor:
                  comisSelectAllowcAction &&
                  !openStoragesInfoDisable &&
                  !isSnapshotDisabled &&
                  !isNicActionDisabled
                    ? "pointer"
                    : "not-allowed",
              }}
              className={styles.StorageAddDisk}
              onClick={() => {
                !openStoragesInfoDisable &&
                comisSelectAllowcAction &&
                !isSnapshotDisabled &&
                !isNicActionDisabled
                  ? handleAddStorage()
                  : undefined;
              }}
            >
              <AddCircleOutlinedIcon
                className={styles.StorageAddIcon}
                id="addStoreBtn"
              />
              <Typography
                sx={{
                  cursor:
                    comisSelectAllowcAction &&
                    !isSnapshotDisabled &&
                    !isNicActionDisabled &&
                    !openStoragesInfoDisable
                      ? "pointer"
                      : "not-allowed",
                  mt: "6px",
                  mr: "15px",
                  color: "#6DCCDD",
                  fontWeight: "500",
                }}
              >
                Additional Disk
              </Typography>
            </Box>
          </Box>
          <Grid
            sx={{ mt: "20px", borderRadius: "7px" }}
            container
            direction="row"
            rowSpacing={2}
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{ paddingTop: "0!important" }}
            >
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ overflow: "auto", maxHeight: "275px" }}
              >
                <Table
                  aria-label="simple table"
                  sx={{
                    width: "100%",
                    overflowX: "scroll",
                    borderCollapse: "collapse",
                    "& .MuiTableCell-root": { minWidth: "unset !important" },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        sx={{ position: "sticky", top: 0, zIndex: 1 }}
                      >
                        Disk
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ position: "sticky", top: 0, zIndex: 1 }}
                      >
                        Type
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ position: "sticky", top: 0, zIndex: 1 }}
                      >
                        Size
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ position: "sticky", top: 0, zIndex: 1 }}
                      >
                        Cost (SAR)
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{ position: "sticky", top: 0, zIndex: 1 }}
                      >
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataStoragesInfo.list &&
                      dataStoragesInfo.list.map((elem, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell scope="row" sx={{ p: "5px" }}>
                            <Box
                              variant="text"
                              align="left"
                              className={styles.diskBox}
                            >
                              <Box className={styles.tableScrollBox}>
                                {elem.storageName}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ p: "5px" }}>
                            <CssFormControl
                              className={styles.diskSizeBox}
                              size="small"
                            >
                              <Select
                                className={styles.tableScrollSelect}
                                value={
                                  elem.storageTypeName
                                    ? elem.storageTypeName
                                    : 1
                                }
                                id="grouped-select-0"
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                MenuProps={MenuProps}
                              >
                                <MenuItem value={1}>{"NVMe"}</MenuItem>
                              </Select>
                            </CssFormControl>
                          </TableCell>
                          <TableCell sx={{ p: "5px" }}>
                            <Box
                              variant="text"
                              align="center"
                              className={styles.diskBox}
                            >
                              <Box className={styles.tableScrollBox}>
                                {openStoragesInfoDisable ||
                                isSnapshotDisabled ||
                                isNicActionDisabled ? (
                                  <>
                                    <RemoveCircleIcon
                                      sx={{ cursor: "not-allowed" }}
                                      className={styles.DiskSizeMinus}
                                    />
                                    {elem.storageSizeName.split("G")[0]} GB
                                    <AddCircleOutlinedIcon
                                      sx={{ cursor: "not-allowed" }}
                                      className={styles.DiskSizePlus}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <RemoveCircleIcon
                                      sx={{
                                        cursor:
                                          shouldDisableDecrement(elem, index) ||
                                          shouldDisableDecrementAn(elem, index)
                                            ? "not-allowed"
                                            : "pointer",
                                      }}
                                      onClick={() => {
                                        handleDecrementStorageSize(index);
                                      }}
                                      className={styles.DiskSizeMinus}
                                    />
                                    {elem.storageSizeName.split("G")[0]} GB
                                    <AddCircleOutlinedIcon
                                      onClick={() => {
                                        handleIncrementStorageSize(index);
                                      }}
                                      className={styles.DiskSizePlus}
                                    />
                                  </>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ p: "5px" }}>
                            <Box
                              variant="text"
                              align="left"
                              className={styles.diskBox}
                            >
                              <Box className={styles.tableScrollBox}>
                                {elem.storagePrize}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell
                            onClick={
                              openStoragesInfoDisable ||
                              isSnapshotDisabled ||
                              isNicActionDisabled
                                ? undefined
                                : () => handleRemoveStorage(index)
                            }
                            align="center"
                            sx={{
                              p: "5px",
                              cursor:
                                openStoragesInfoDisable ||
                                shouldDisableRemoval(elem) ||
                                isSnapshotDisabled ||
                                isNicActionDisabled
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            className={`removeStorageItem ${
                              shouldDisableRemoval(elem) ? "disabled" : ""
                            }`}
                          >
                            <Box
                              sx={{
                                cursor:
                                  openStoragesInfoDisable ||
                                  shouldDisableRemoval(elem) ||
                                  isSnapshotDisabled ||
                                  isNicActionDisabled
                                    ? "not-allowed"
                                    : "pointer",
                                marginTop: "10px",
                              }}
                            >
                              {openStoragesInfoDisable ? (
                                <RemoveCircleIcon
                                  sx={{
                                    cursor:
                                      shouldDisableRemoval(elem) ||
                                      isSnapshotDisabled ||
                                      isNicActionDisabled
                                        ? "not-allowed"
                                        : "pointer",
                                    color: "#b0b0b0",
                                  }}
                                />
                              ) : (
                                <RemoveCircleIcon
                                  sx={{
                                    cursor:
                                      shouldDisableRemoval(elem) ||
                                      isSnapshotDisabled ||
                                      isNicActionDisabled
                                        ? "not-allowed"
                                        : "pointer",
                                    color: "#b0b0b0",
                                  }}
                                />
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{ paddingTop: "0!important" }}
              align="center"
              alignItems="center"
            >
              <Button
                disabled={
                  isDataChange() &&
                  (!openStoragesInfoDisable ||
                    isSnapshotDisabled ||
                    isNicActionDisabled)
                }
                size="md"
                variant="contained"
                sx={{
                  pointerEvents: "unset !important",
                  cursor:
                    isDataChange() ||
                    openStoragesInfoDisable ||
                    isSnapshotDisabled ||
                    isNicActionDisabled
                      ? "not-allowed !important"
                      : "pointer",
                  color: "#fff",
                  backgroundImage:
                    "linear-gradient(45deg, #0288d1, #26c6da) !important",
                  mt: 2,
                  "&.MuiButtonBase-root": {
                    backgroundColor: "unset",
                  },
                  "&.MuiButtonBase-root.Mui-disabled": {
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                  },
                }}
                onClick={
                  !openStoragesInfoDisable &&
                  comisSelectAllowcAction &&
                  !isSnapshotDisabled &&
                  !isNicActionDisabled
                    ? submitStoragesList
                    : undefined
                }
              >
                {!openStoragesInfoDisable ? (
                  "SUBMIT"
                ) : (
                  <>
                    <AutorenewIcon className={styles.loadingBtn} />
                    Processing...
                  </>
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      {/* Start Storage Skeleton Here */}
      {!openStoragesInfo && (
        <Box>
          <Box sx={{ position: "relative" }}>
            <Typography
              component="p"
              variant="p"
              color={"#6b6f82"}
              align="left"
            >
              <Skeleton
                variant="text"
                animation="wave"
                width={"35%"}
                height={25}
              />
            </Typography>
            <Box className={styles.StorageAddDisk}>
              <Skeleton
                variant="circular"
                animation="wave"
                width={30}
                height={30}
                className={styles.StorageAddIcon}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={150}
                height={25}
                sx={{ mt: "6px", mr: "15px" }}
              />
            </Box>
          </Box>
          <Grid
            sx={{ mt: "20px", borderRadius: "7px" }}
            container
            direction="row"
            rowSpacing={2}
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{ paddingTop: "0!important" }}
            >
              <TableContainer component={Paper} variant="outlined">
                <Table aria-label="simple table" sx={{ overflowX: "scroll" }}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={80}
                          height={25}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={80}
                          height={25}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={80}
                          height={25}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={80}
                          height={25}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={80}
                          height={25}
                          sx={{ margin: "0 auto" }}
                        />
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Diskrows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell scope="row" sx={{ p: "5px" }}>
                          <Skeleton
                            variant="rounded"
                            animation="wave"
                            width={"100%"}
                            height={45}
                          />
                        </TableCell>
                        <TableCell sx={{ p: "5px" }}>
                          <Skeleton
                            variant="rounded"
                            animation="wave"
                            width={"100%"}
                            height={45}
                          />
                        </TableCell>
                        <TableCell sx={{ p: "5px" }}>
                          <Skeleton
                            variant="rounded"
                            animation="wave"
                            width={"100%"}
                            height={45}
                          />
                        </TableCell>
                        <TableCell sx={{ p: "5px" }}>
                          <Skeleton
                            variant="rounded"
                            animation="wave"
                            width={"100%"}
                            height={45}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ p: "5px" }}>
                          <Skeleton
                            variant="circular"
                            animation="wave"
                            width={20}
                            height={20}
                            sx={{ margin: "0 auto" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{ paddingTop: "0!important" }}
              align="center"
              alignItems="center"
            >
              <Skeleton
                variant="rounded"
                animation="wave"
                width={100}
                height={45}
                sx={{ m: "25px auto 0 auto" }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {/* Start Storage Skeleton Here */}
    </>
  );
}

export default MinstanceDetailStorages;
