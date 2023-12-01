// ** React Imports
import * as React from "react";

import SurfaceLayout from "../../../../../components/layouts/surface/Layout";

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

// ** MUI ICON Components
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import CloseIcon from "@mui/icons-material/Close";

// ** Custom CSS
import styles from "../securitygroup/index.module.css";
import NatDataTable from "../../../../../components/pages/surface/networks/networksecurity/nat/NatTable";

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
  TableSkeletonData(),
  TableSkeletonData(),
  TableSkeletonData(),
  TableSkeletonData(),
  TableSkeletonData(),
];

function NATRules() {
  return (
    <SurfaceLayout currentPage={14} setBackgrd={true}>
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          component="h4"
          variant="h5"
          align="left"
          color="#fff"
          fontSize={20}
        >
          NAT Rules
        </Typography>
      </Breadcrumbs>
      {/* END Breadcrumbs Here */}
      {/* Start Breadcrumbs Skeleton Here */}
      <Stack spacing={1} sx={{ display: "none" }}>
        <Skeleton variant="text" animation="wave" width={180} height={25} />
      </Stack>
      {/* END Breadcrumbs Skeleton Here */}

      <Card
        sx={{ mt: 2, borderRadius: "7px" }}
        className={styles.InvoiceTableCard}
      >
        <CardContent sx={{ padding: "24px" }}>
          {/* Start Invoice Table Design Here */}
          <Box>
            <NatDataTable />
          </Box>
          {/* Start Invoice Table Design Here */}

          {/* Start Invoice Table Skeleton Here */}
          <Box hidden>
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
                  width={200}
                  height={25}
                />
              </Typography>
              <Box className={styles.SkeletonSearchContainer}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={200}
                  height={35}
                  sx={{ mr: "15px", borderRadius: "20px" }}
                  className={styles.SerachSkeleton}
                />
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width={30}
                  height={30}
                  className={styles.SkeletonAddIcon}
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
                      {Skeletonrows.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
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
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
          {/* End Invoice Table Skeleton Here */}
        </CardContent>
      </Card>
    </SurfaceLayout>
  );
}

export default NATRules;
