import * as React from "react";
import { useState, useEffect } from "react";
import styles from "../../../../../../pages/surface/clouds/elasticins/create/index.module.css";

import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import CardHeader from "@mui/material/CardHeader";

import Carousel from "better-react-carousel";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

// Carousel Styles
const MyDot = ({ isActive }) => (
  <span
    style={{
      width: isActive ? "10px" : "6px",
      height: isActive ? "10px" : "6px",
      display: "inline-block",
      background: "#015578",
      marginTop: "25px",
      borderRadius: "30px",
    }}
  ></span>
);

const SizingPolicyGroup = ({
  cinPlacementGroupsId,
  setcinsizingPolicyGroupId,
  setcinsizingPolicyId,
  showCinssizingPolicyGroup,
  sizingPolicyGroupData,
  cloudservertypeData,
  datacenterData,
  platformData,
  setreqParams,
  chooseSizePol,
  setchooseSizePol,
  commonTotalCost,
  setcommonTotalCost,
}) => {
  // ** Profile Tab Function
  const [Profilevalue, setProfileValue] = useState("out-1");
  const handleProfileChange = (event, newProfileValue) => {
    sizingPolicyGroupData.defaultId = newProfileValue.split("-")[1];
    setProfileValue(newProfileValue);
    setcinsizingPolicyGroupId(sizingPolicyGroupData.defaultId);
    console.log(newProfileValue,'newProfileValue')
    setreqParams((prevState) => ({
      platformid: platformData.defaultId,
      datacenterid: datacenterData.defaultId,
      cloudservertypeid: cloudservertypeData.defaultId,
      cloudserverid: cinPlacementGroupsId,
      sizingpolicygroupid: sizingPolicyGroupData.defaultId,
    }));
  };
  const [valueGrid, setvalueGrid] = useState(0);

  const [sizingPolicyGroupDataFinalId, setsizingPolicyGroupDataFinalId] =
    useState("");

  useEffect(() => {
    if (sizingPolicyGroupData) {
      setcinsizingPolicyGroupId(sizingPolicyGroupData.defaultId);
      setProfileValue("out-" + sizingPolicyGroupData.defaultId);

      sizingPolicyGroupData.list.map(function (elem, index) {
        if (elem.id == sizingPolicyGroupData.defaultId) {
          setvalueGrid(sizingPolicyGroupData.list[index].list[0].defaultId);
          setcinsizingPolicyId(
            sizingPolicyGroupData.list[index].list[0].defaultId
          );
          const pkm = sizingPolicyGroupData.list[index].list[0].list.find(
            (x) => x.id === sizingPolicyGroupData.list[index].list[0].defaultId
          ).value;
          // console.log(pkm);
          const km = sizingPolicyGroupData.list[index].list[0].list.find(
            (x) => x.id === sizingPolicyGroupData.list[index].list[0].defaultId
          ).others;
          if (km) {
            setchooseSizePol(km.cpu + "vCPU/" + km.memory);
            //setcommonTotalCost(commonTotalCost + parseFloat(pkm.split(" ")[1]));
            setcommonTotalCost(parseFloat(pkm.split(" ")[1]).toFixed(2));
          }
        }
      });
    }
  }, [sizingPolicyGroupData]);

  const handleChangeGrid = (newValue) => {
    if (newValue != "none") {
      sizingPolicyGroupData.list.map(function (elem, index) {
        if (elem.id == sizingPolicyGroupData.defaultId) {
          sizingPolicyGroupData.list[index].list[0].defaultId = newValue;
          setcinsizingPolicyId(
            sizingPolicyGroupData.list[index].list[0].defaultId
          );
          setvalueGrid(newValue);
          setreqParams((prevState) => ({
            platformid: platformData.defaultId,
            datacenterid: datacenterData.defaultId,
            cloudservertypeid: cloudservertypeData.defaultId,
            cloudserverid: cinPlacementGroupsId,
            sizingpolicygroupid: sizingPolicyGroupData.defaultId,
            sizingpolicyid: sizingPolicyGroupData.list[index].list[0].defaultId,
          }));
          sizingPolicyGroupData.list[index].list[0].list.map(function (
            kelem,
            kindex
          ) {
            if (
              sizingPolicyGroupData.list[index].list[0].defaultId == kelem.id
            ) {
              setsizingPolicyGroupDataFinalId(
                sizingPolicyGroupData.list[index].list[0].defaultId
              );

              const pkm = sizingPolicyGroupData.list[index].list[0].list.find(
                (x) =>
                  x.id === sizingPolicyGroupData.list[index].list[0].defaultId
              ).value;
              const km = sizingPolicyGroupData.list[index].list[0].list.find(
                (x) =>
                  x.id === sizingPolicyGroupData.list[index].list[0].defaultId
              ).others;
              if (km) {
                setchooseSizePol(km.cpu + "vCPU/" + km.memory);
                /* setcommonTotalCost(
                  (commonTotalCost + parseFloat(pkm.split(" ")[1])).toFixed(2)
                );*/
                setcommonTotalCost(parseFloat(pkm.split(" ")[1]).toFixed(2));
              }
              return;
            }
          });
        }
      });
    }
  };

  // Carousel Breakpoints  TR 01
  const handleDragStart = (e) => e.preventDefault();

  const settings = {
    keyboardNavigation:true,  
    dotsDisabled: false,
    buttonsDisabled: false,
    responsive: {
      0: { items: 1 }, // Show 1 item on screens less than 768px wide
      768: { items: 2 }, // Show 2 items on screens between 768px and 1023px wide
      1024: { items: 5 }, // Show 5 items on screens 1024px and wider
    },
    infinite: true,
    // autoPlay: true,
    // autoPlayInterval: 3000,
    mouseDragEnabled: true,
    touchTrackingEnabled: true,
  };
  return (
    <>
      {/* Start Profile Here */}
      {showCinssizingPolicyGroup && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
          <CardContent sx={{ padding: "24px" }}>
            <Typography
              className={styles.cardLabel}
              component="h4"
              variant="h5"
              align="left"
              fontSize={20}
            >
              {" "}
              {/* TR 01 className */}
              Profile
            </Typography>
            <Typography
              component="p"
              variant="p"
              color={"#6b6f82"}
              align="left"
              sx={{ pt: 1 }}
            >
              High performance virtual machines with a good balance of memory
              and dedicated hyper-threads from best in class Intel processors.
            </Typography>
            {sizingPolicyGroupData && Profilevalue && (
              <TabContext value={Profilevalue}>
                <TabList
                  onChange={handleProfileChange}
                  className={styles.tabContainer}
                  aria-label="simple tabs example"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#6DCCDD",
                    },
                  }}
                  sx={{
                    "& .MuiTab-root.Mui-selected": {
                      color: "#015578",
                      backgroundColor: "#e1f3f6",
                    },
                    "& .MuiTabs-scroller": {
                      overflowX: {
                        xs: "scroll !important",
                        md: "hidden !important",
                      }, // /* TR 01 */
                    },
                  }}
                >
                  {" "}
                  {sizingPolicyGroupData &&
                    sizingPolicyGroupData.list.map(function (elem) {
                      if (elem.availabilty) {
                        return (
                          <Tab
                            key={"out-" + elem.id}
                            value={"out-" + elem.id}
                            label={elem.value}
                          />
                        );
                      } else {
                        return (
                          <Tab
                            key={"out-" + elem.id}
                            value={"out-" + elem.id}
                            label={elem.value}
                            disabled
                            sx={{
                              cursor: "not-allowed !important",
                              pointerEvents: "auto !important",
                            }} //tr 01 bugfixing
                          />
                        );
                      }
                    })}
                </TabList>

                {sizingPolicyGroupData &&
                  sizingPolicyGroupData.list.map(function (elem) {
                    return (
                      <TabPanel
                        key={"out-" + elem.id}
                        value={"out-" + elem.id}
                        sx={{ padding: "24px 0px" }}
                      >
                        {elem.availabilty && elem.list[0] && (
                          <Box sx={{ width: "100%", display: "grid" }}>
                            <AliceCarousel {...settings} disableButtonsControls>
                              {elem.list &&
                                elem.list[0] &&
                                elem.list[0].list.map(function (ielem) {
                                  return (
                                    <Card
                                    key={ielem.id}
                                    value={ielem.id}
                                      onClick={() =>
                                        handleChangeGrid(
                                          ielem.availabilty ? ielem.id : "none"
                                        )
                                      }
                                      variant="outlined"
                                      sx={{
                                        mt: 2,
                                        borderRadius: "7px",

                                        cursor: ielem.availabilty
                                          ? "pointer"
                                          : "not-allowed",
                                      }}
                                      className={`${styles.CarouselCard} ${styles.cardActive}`}
                                    >
                                      <CardHeader
                                        className={styles.ProfileCardHeader}
                                        title={
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              fontSize: "20px",
                                              fontWeight: "450",
                                            }}
                                            className={styles.textnowrap}
                                          >
                                            {" "}
                                            {ielem.value}{" "}
                                            <Box
                                              sx={{
                                                ml: "5px",
                                                mt: "5px",
                                                fontSize: "12px",
                                                fontWeight: "400",
                                              }}
                                            >
                                              {" "}
                                              /mo
                                            </Box>{" "}
                                          </Box>
                                        }
                                      />
                                      <CardContent sx={{ padding: "24px" }}>
                                        {ielem.id == valueGrid && (
                                          <Box
                                            component="img"
                                            width={35}
                                            height={35}
                                            align="center"
                                            className={styles.cardActiveCheck}
                                            alt="ActiveCheck"
                                            src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png"
                                          />
                                        )}

                                        <Box
                                          color={"#000"}
                                          sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {ielem.others.cpu}{" "}
                                          <Box
                                            color={"#000"}
                                            fontSize={"12px"}
                                            fontWeight={400}
                                            ml={"5px"}
                                            mt={"5px"}
                                          >
                                            {" "}
                                            vCPUs
                                          </Box>
                                        </Box>
                                        <Box
                                          className={styles.ProfileMemoryTag}
                                          color={"#000"}
                                          sx={{
                                            mt: 2,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {ielem.others.memory}{" "}
                                          <Box
                                            color={"#000"}
                                            fontSize={"12px"}
                                            fontWeight={400}
                                            ml={"5px"}
                                            mt={"5px"}
                                          >
                                            {" "}
                                            Memory
                                          </Box>
                                        </Box>
                                      </CardContent>
                                    </Card>
                                  );
                                })}
                            </AliceCarousel>
                          </Box>
                        )}

                        {!elem.availabilty && !elem.list[0] && (
                          <Typography>CPU</Typography>
                        )}
                      </TabPanel>
                    );
                  })}
              </TabContext>
            )}
          </CardContent>
        </Card>
      )}
      {/* END Profile Here */}
      {/* Start Profile Skeleton Here */}
      {!showCinssizingPolicyGroup && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
          <CardContent sx={{ padding: "24px" }}>
            <Stack spacing={1}>
              <Skeleton variant="text" width={"20%"} height={25} />
              <Skeleton variant="text" width={"60%"} height={25} />
              <Skeleton
                variant="text"
                width={"100%"}
                height={80}
                sx={{ borderRadius: "12px" }}
              />
            </Stack>
            <Carousel
              containerStyle={{ display: "grid" }}
              cols={5}
              rows={1}
              gap={15}
              mobileBreakpoint={768}
              scrollSnap={true}
              showDots={false}
              hideArrow={true}
              loop={true}
            >
              <Carousel.Item sx={{ overflow: "auto" }}>
                <Card
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: "7px" }}
                  className={`${styles.CarouselCard}`}
                >
                  <CardHeader
                    className={styles.ProfileCardHeader}
                    title={
                      <Skeleton variant="text" width={"100%"} height={25} />
                    }
                  />
                  <CardContent sx={{ padding: "24px" }}>
                    <Skeleton variant="text" width={"100%"} height={25} />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: "25px" }}
                    />
                  </CardContent>
                </Card>
              </Carousel.Item>
              <Carousel.Item sx={{ overflow: "auto" }}>
                <Card
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: "7px" }}
                  className={`${styles.CarouselCard}`}
                >
                  <CardHeader
                    className={styles.ProfileCardHeader}
                    title={
                      <Skeleton variant="text" width={"100%"} height={25} />
                    }
                  />
                  <CardContent sx={{ padding: "24px" }}>
                    <Skeleton variant="text" width={"100%"} height={25} />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: "25px" }}
                    />
                  </CardContent>
                </Card>
              </Carousel.Item>
              <Carousel.Item sx={{ overflow: "auto" }}>
                <Card
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: "7px" }}
                  className={`${styles.CarouselCard}`}
                >
                  <CardHeader
                    className={styles.ProfileCardHeader}
                    title={
                      <Skeleton variant="text" width={"100%"} height={25} />
                    }
                  />
                  <CardContent sx={{ padding: "24px" }}>
                    <Skeleton variant="text" width={"100%"} height={25} />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: "25px" }}
                    />
                  </CardContent>
                </Card>
              </Carousel.Item>
              <Carousel.Item sx={{ overflow: "auto" }}>
                <Card
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: "7px" }}
                  className={`${styles.CarouselCard}`}
                >
                  <CardHeader
                    className={styles.ProfileCardHeader}
                    title={
                      <Skeleton variant="text" width={"100%"} height={25} />
                    }
                  />
                  <CardContent sx={{ padding: "24px" }}>
                    <Skeleton variant="text" width={"100%"} height={25} />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: "25px" }}
                    />
                  </CardContent>
                </Card>
              </Carousel.Item>
              <Carousel.Item sx={{ overflow: "auto" }}>
                <Card
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: "7px" }}
                  className={`${styles.CarouselCard}`}
                >
                  <CardHeader
                    className={styles.ProfileCardHeader}
                    title={
                      <Skeleton variant="text" width={"100%"} height={25} />
                    }
                  />
                  <CardContent sx={{ padding: "24px" }}>
                    <Skeleton variant="text" width={"100%"} height={25} />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: "25px" }}
                    />
                  </CardContent>
                </Card>
              </Carousel.Item>
            </Carousel>
          </CardContent>
        </Card>
      )}
      {/* END Profile Skeleton Here */}
    </>
  );
};

export default SizingPolicyGroup;
