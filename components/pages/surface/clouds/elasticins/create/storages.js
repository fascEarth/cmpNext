import * as React from "react";
import { useState, useEffect } from "react";
import styles from "../../../../../../pages/surface/clouds/elasticins/create/index.module.css";
import { styled } from "@mui/material/styles";
import { Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";

import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import MenuItem from "@mui/material/MenuItem";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

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

// ** Table CSS
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e1f3f6",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

// Choose an image FormControl Custom Style
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

// ** Table Function
function createData(id, disk, type, size, cost, action) {
  return { id, disk, type, size, cost, action };
}

const rows = [
  createData(
    "0",
    <Box variant="text" align="left" className={styles.diskBox}>
      <Box className={styles.tableScrollBox}>Boot Disk</Box>
    </Box>,
    <CssFormControl className={styles.diskSizeBox} size="small">
      <Select
        className={styles.tableScrollSelect}
        defaultValue=""
        id="grouped-select-0"
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

  createData(
    "1",
    <Box variant="text" align="left" className={styles.diskBox}>
      Boot Disk
    </Box>,
    <CssFormControl className={styles.diskSizeBox} size="small">
      <Select
        defaultValue=""
        id="grouped-select-1"
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

const Storages = ({
  storagesData,
  setStoragesData,
  originalStoragesInfo,
  setoriginalStoragesInfo,
  dataStoragesInfo,
  setdataStoragesInfo,
  storageOpenCost,
  setstorageOpenCost,
  chooseSizeStorePol,
  setchooseSizeStorePol,
  commonFinalTotalCost,
  setcommonFinalTotalCost,
  commonFinalStorageCost,
  setcommonFinalStorageCost,
  OSselected,
}) => {
  useEffect(() => {
    if (dataStoragesInfo.list) {
      calculateTotalStorageSize(dataStoragesInfo);
    }
  }, [originalStoragesInfo, dataStoragesInfo, OSselected]);
  //const [storageOpenCost, setstorageOpenCost] = useState(0);

  const loadAllStorages = async (cstoragesData) => {
    if (cstoragesData && cstoragesData.list && cstoragesData.list.length > 0) {
      const firstStorage = cstoragesData.list[0];
      const storageName = firstStorage.value;
      const storageSize = firstStorage.size + "G";
      const storagePrize = (
        parseFloat(firstStorage.size) * firstStorage.pergbcost
      ).toFixed(2);
      setoriginalStoragesInfo([
        {
          storageName: storageName,
          storageTypeName: "1",
          storageSizeName: storageSize,
          storagePrize: storagePrize,
        },
      ]);
      setdataStoragesInfo([
        {
          storageName: storageName,
          storageTypeName: "1",
          storageSizeName: storageSize,
          storagePrize: storagePrize,
        },
      ]);

      setstorageOpenCost(parseFloat(firstStorage.pergbcost));
    } else {
      // Handle the case where cstoragesData or cstoragesData.list is undefined or empty
      // You can set default values or handle the error as needed
    }
  };

  // Function to calculate the total storage size
  const [MSWindowsCost, setMSWindowCost] = useState(50);
  const calculateTotalStorageSize = (cdataStoragesInfo) => {
    let totalSize = 0;
    let totalCost = 0;
    // Iterate through the list and sum up storage sizes
    for (const storage of cdataStoragesInfo.list) {
      // Assuming storageSizeName is a number
      totalSize += parseFloat(storage.storageSizeName.split("G")[0]);

      totalCost +=
        parseFloat(storage.storageSizeName.split("G")[0]) *
        parseFloat(storageOpenCost);
    }

    setcommonFinalStorageCost(totalCost);
    setchooseSizeStorePol(totalSize);
  };

  // Function to add a new storage entry
  const handleAddStorage = () => {
    // Calculate the new storagePrize based on storageOpenCost

    const newStoragePrize = parseInt(1) * storageOpenCost;

    // Create a new storage object
    const newStorage = {
      storageName: `Volume ${dataStoragesInfo.list.length}`,
      storageTypeName: "1",
      storageSizeName: "1G", // You can adjust this as needed
      storagePrize: newStoragePrize.toFixed(2), // Format to 2 decimal places
      allowDec: false,
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
    // Modify this function to define your condition
    // If storageId exists, return true (disable removal), otherwise, return false (enable removal)
    return item.storageId !== undefined;
  };

  // Function to remove a storage item by index
  const handleRemoveStorage = (indexToRemove) => {
    // Check if the storageId exists for the item to prevent removal
    const itemToRemove = dataStoragesInfo.list[indexToRemove];
    if (shouldDisableRemoval(itemToRemove)) {
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
  const shouldDisableDecrementAn = (item, indexToRemove) => {
    const itemToDecrement = item;
    const updatedSize = Math.max(
      parseInt(itemToDecrement.storageSizeName.split("G")[0]) - 1,
      0 // Ensure the size doesn't go below 1
    );
    if (updatedSize <= 0) {
      return true;
    }
  };
  const shouldDisableDecrement = (item, indexToRemove) => {
    // Add your condition here to determine if decrement should be disabled
    // For example, you can check if "storageId" exists
    //return item.storageId !== undefined;

    // Modify this function to define your condition
    // If storageId exists, return true (disable removal), otherwise, return false (enable removal)
    const itemToRemoveOrg = originalStoragesInfo.list[indexToRemove];
    if (itemToRemoveOrg) {
      const sizeOrg = parseInt(itemToRemoveOrg.storageSizeName.split("G")[0]);

      const recrg = parseInt(item.storageSizeName.split("G")[0]);

      if (recrg <= sizeOrg) {
        return item.storageId !== undefined;
      }
    } else {
      return item.storageId !== undefined;
    }
  };
  // Function to check if decrement should be disabled for an item
  /*const shouldDisableDecrement = (item) => {
    // Add your condition here to determine if decrement should be disabled
    // For example, you can check if "storageId" exists
    return item.storageId !== undefined;
  };*/
  // Function to decrement storage size and update storagePrize
  const handleDecrementStorageSize = (item, indexToDecrement) => {
    // Get the storage item to decrement
    const itemToDecrement = dataStoragesInfo.list[indexToDecrement];

    // Check if the storageId exists for the item to prevent removal
    if (shouldDisableDecrement(item, indexToDecrement)) {
      // Return early if decrement is disabled
      return;
    }

    if (itemToDecrement.allowDec) {
      if (
        parseInt(itemToDecrement.storageSizeName.split("G")[0]) ===
        itemToDecrement.allowDec
      ) {
        return;
      }
    }

    // Calculate the new storageSizeName and storagePrize after decrement
    // Calculate the new storageSizeName and storagePrize after decrement
    // let updatedSize;
    // if(OSselected === 'MSWindows') {
    //   setMSWindowCost((prev)=>prev - 1)
    //     updatedSize = MSWindowsCost;

    // }
    // else {
    const updatedSize = Math.max(
      parseInt(itemToDecrement.storageSizeName.split("G")[0]) - 1,
      1 // Ensure the size doesn't go below 1
    );
    //  }
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
  return (
    <>
      {/* Start Add Storage Here */}
      <Card sx={{ mt: 2, borderRadius: "7px" }}>
        {dataStoragesInfo && dataStoragesInfo?.list?.length <= 59 ? (
          <CardHeader
            action={
              <Box
                className={styles.StorageHeaderAddStorage} // TR 01 class Name
                onClick={handleAddStorage}
                sx={{ display: "flex", color: "#6DCCDD", cursor: "pointer" }}
              >
                <AddCircleOutlinedIcon
                  sx={{
                    color: "#015578",
                    mr: "5px",
                    mt: "3px",
                    fontSize: "30px",
                  }}
                />{" "}
                <Typography
                  className={styles.storageCardHeaserTag}
                  sx={{ mt: "6px", mr: "15px" }}
                >
                  {" "}
                  {/* TR 01 classname */}
                  Additional Disk
                </Typography>{" "}
              </Box>
            }
            title={
              <Typography
                className={styles.storageCardHeaserTag}
                component="h4"
                variant="h5"
                align="left"
                fontSize={20}
              >
                {" "}
                {/* TR 01 classname */}
                Add Storage
              </Typography>
            }
          />
        ) : (
          <CardHeader
            action={
              <Box
                className={styles.StorageHeaderAddStorage} // TR 01 class Name
                // onClick={handleAddStorage}
                sx={{ display: "flex", color: "#6DCCDD", cursor: "pointer" }}
              >
                <AddCircleOutlinedIcon
                  sx={{
                    color: "#015578",
                    mr: "5px",
                    mt: "3px",
                    fontSize: "30px",
                    cursor: "not-allowed",
                  }}
                />{" "}
                <Typography
                  className={styles.storageCardHeaserTag}
                  sx={{ mt: "6px", mr: "15px", cursor: "not-allowed" }}
                >
                  {" "}
                  {/* TR 01 classname */}
                  Additional Disk
                </Typography>{" "}
              </Box>
            }
            title={
              <Typography
                className={styles.storageCardHeaserTag}
                component="h4"
                variant="h5"
                align="left"
                fontSize={20}
              >
                {" "}
                {/* TR 01 classname */}
                Add Storage
              </Typography>
            }
          />
        )}
        <CardContent sx={{ padding: "0 24px 24px 24px " }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                  "& .MuiTableCell-root": {
                    minWidth: "unset !important",
                  },
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
                              defaultValue="1"
                              id="grouped-select-0"
                              inputProps={{ "aria-label": "Without label" }}
                              MenuProps={MenuProps}
                            >
                              <MenuItem value={1}>NVMe</MenuItem>
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
                              <RemoveCircleIcon
                                sx={{
                                  cursor:
                                    shouldDisableDecrement(elem, index) ||
                                    shouldDisableDecrementAn(elem, index)
                                      ? "not-allowed !important"
                                      : "pointer",
                                }}
                                onClick={() =>
                                  handleDecrementStorageSize(elem, index)
                                }
                                className={styles.DiskSizeMinus}
                              />
                              {elem.storageSizeName.split("G")[0]} GB
                              <AddCircleOutlinedIcon
                                onClick={() =>
                                  handleIncrementStorageSize(index)
                                }
                                className={styles.DiskSizePlus}
                              />
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

                        {index === 0 || elem.storageName === "Boot Disk" ? (
                          <TableCell
                            // onClick={() => handleRemoveStorage(index)}
                            align="center"
                            sx={{ p: "5px" }}
                            className={`removeStorageItem ${
                              shouldDisableRemoval(elem) ? "disabled" : ""
                            }`}
                          >
                            <Box sx={{ marginTop: "10px" }}>
                              <RemoveCircleIcon
                                sx={{ cursor: "not-allowed", color: "#b0b0b0" }}
                              />
                            </Box>
                          </TableCell>
                        ) : (
                          <TableCell
                            onClick={() => handleRemoveStorage(index)}
                            align="center"
                            sx={{ minWidth: "200px", p: "5px" }}
                            className={`removeStorageItem ${
                              shouldDisableRemoval(elem) ? "disabled" : ""
                            }`}
                          >
                            <Box sx={{ marginTop: "10px" }}>
                              <RemoveCircleIcon
                                sx={{ cursor: "pointer", color: "#b0b0b0" }}
                              />
                            </Box>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </CardContent>
      </Card>
      {/* END Add Storage Here */}
      {/* Start Add Storage Skeleton Here */}
      <Card sx={{ mt: 2, borderRadius: "7px" }} hidden>
        <CardHeader
          action={
            <Box sx={{ display: "flex" }}>
              <Skeleton
                variant="circular"
                width={30}
                height={30}
                sx={{ mr: 1 }}
              />{" "}
              <Skeleton variant="text" width={150} height={25} />
            </Box>
          }
          title={<Skeleton variant="text" width={"20%"} height={25} />}
        />
        <CardContent sx={{ padding: "0 24px 24px 24px " }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TableContainer component={Paper} variant="outlined">
              <Table aria-label="simple table" sx={{ overflowX: "scroll" }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <Skeleton variant="text" width={"100%"} height={25} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Skeleton variant="text" width={"100%"} height={25} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Skeleton variant="text" width={"100%"} height={25} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Skeleton variant="text" width={"100%"} height={25} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Skeleton variant="text" width={"100%"} height={25} />
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell scope="row" sx={{ p: "5px" }}>
                        <Skeleton variant="text" width={"100%"} height={65} />
                      </TableCell>
                      <TableCell sx={{ p: "5px" }}>
                        <Skeleton variant="text" width={"100%"} height={65} />
                      </TableCell>
                      <TableCell sx={{ p: "5px" }}>
                        <Skeleton variant="text" width={"100%"} height={65} />
                      </TableCell>
                      <TableCell sx={{ p: "5px" }}>
                        <Skeleton variant="text" width={"100%"} height={65} />
                      </TableCell>
                      <TableCell align="center" sx={{ p: "5px" }}>
                        <Skeleton
                          variant="circular"
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
        </CardContent>
      </Card>
      {/* END Add Storage Skeleton Here */}
    </>
  );
};

export default Storages;
