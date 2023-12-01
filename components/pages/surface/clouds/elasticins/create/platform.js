import * as React from "react";
import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import styles from "../../../../../../pages/surface/clouds/elasticins/create/index.module.css";

import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";

const Platform = ({
  setcinPlatformsId,
  showCinsPlatforms,
  platformData,
  setplatformData,
  setshowCinsdatacenter,
  setreqParams,
}) => {
  useEffect(() => {
    setcinPlatformsId(platformData.defaultId);
  }, [platformData.defaultId, setcinPlatformsId]);
  return (
    <>
      {/* Start Platform Here */}
      {showCinsPlatforms && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
          <CardContent sx={{ padding: "24px" }}>
            <Typography
              className={styles.cardLabel}
              component="h4"
              variant="h5"
              align="left"
              fontSize={20}
            >
              Platform
            </Typography>{" "}
            {/** TR 01 Class name */}
            <Typography
              component="p"
              variant="p"
              color={"#6b6f82"}
              align="left"
              sx={{ pt: 1 }}
            >
              Choose detacloud’s enterprise grade cloud platform.
            </Typography>
            <Grid
              sx={{ mt: "0px", borderRadius: "7px" }}
              container
              direction="row"
              rowSpacing={2}
              spacing={3}
            >
              {platformData.list.map((item, index) => (
                <Grid
                  onClick={() => {
                    if (item.availabilty) {
                      setcinPlatformsId(item.id);
                      setplatformData((prevState) => ({
                        ...prevState,
                        ["defaultId"]: item.id,
                      }));
                      // setshowCinsdatacenter(false);
                      setreqParams((prevState) => ({
                        ["platformid"]: item.id,
                      }));
                    }
                  }}
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  sx={{ cursor: item.availabilty ? "pointer" : "not-allowed" }}
                >
                  <Card
                    sx={{
                      position: "relative",
                      borderRadius: "7px",
                      overflow: "initial",
                    }}
                    className={
                      platformData.defaultId == item.id ? styles.cardActive : ""
                    }
                  >
                    <CardContent sx={{ padding: "16px !important" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          className={styles.plateformGridImage}
                          variant="square"
                          sx={{
                            width: index == 1 ? "75px" : "100px",
                            height: "75px",
                          }}
                          alt="VMwareCloud"
                          src={
                            "/images/pages/surface/clouds/elasticins/create/" +
                            item.image
                          }
                        ></Avatar>
                        <Typography
                          component="h4"
                          variant="h5"
                          align="left"
                          fontSize={16}
                          sx={{
                            pl: { xs: "18px", md: 3 },
                            pb: { xs: "12px", md: 0 },
                          }}
                        >
                          {item.value}
                        </Typography>

                        {item.availabilty ? (
                          platformData.defaultId == item.id ? (
                            <Box
                              component="img"
                              width={35}
                              height={35}
                              align="center"
                              className={styles.cardActiveCheck}
                              alt="ActiveCheck"
                              src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png"
                            />
                          ) : (
                            <></>
                          )
                        ) : (
                          <Typography
                            component="span"
                            align="right"
                            fontSize={14}
                            color="red"
                            className={styles.commingSoon}
                          >
                            Coming Soon
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
      {/* END Platform Here */}

      {/* Start Platform Skeleton Here */}
      {!showCinsPlatforms && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
          <CardContent sx={{ padding: "24px" }}>
            <Stack spacing={1}>
              <Skeleton variant="text" width={"20%"} height={25} />
              <Skeleton variant="text" width={"40%"} height={25} />
            </Stack>
            <Grid
              sx={{ mt: "0px", borderRadius: "7px" }}
              container
              direction="row"
              rowSpacing={2}
              spacing={3}
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Card
                  sx={{
                    position: "relative",
                    borderRadius: "7px",
                    overflow: "initial",
                  }}
                >
                  <CardContent sx={{ padding: "16px !important" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Skeleton variant="circular" width={70} height={70} />
                      <Skeleton
                        variant="text"
                        width={"50%"}
                        height={25}
                        sx={{ ml: 3 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Card
                  sx={{
                    position: "relative",
                    borderRadius: "7px",
                    overflow: "initial",
                  }}
                >
                  <CardContent sx={{ padding: "16px !important" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Skeleton variant="circular" width={70} height={70} />
                      <Skeleton
                        variant="text"
                        width={"50%"}
                        height={25}
                        sx={{ ml: 3 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* END Platform Skeleton Here */}
    </>
  );
};

export default Platform;
