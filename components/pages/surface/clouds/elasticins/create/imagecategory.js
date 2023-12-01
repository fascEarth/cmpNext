import * as React from "react";
import { useState, useEffect } from "react";
import styles from "../../../../../../pages/surface/clouds/elasticins/create/index.module.css";

import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";

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

const ImageCategory = ({
  updateCommonOps,
  selectedOsStyle,
  setselectedOsStyle,
  imagesCategoryData,
  setimagesCategoryData,
  setcinImageCategoryTypeId,
  setcinImageTypeId,
  setcinImageTypeVersionId,
  cinImageCategoryTypeId,
  cinImageTypeId,
  cinImageTypeVersionId,
  setSelectedOsCost,
  setOSselected
}) => {
  // ** Type of Cloud Server Tab Function
  const [value, setValue] = useState("out-1");
  const [valueGrid, setvalueGrid] = useState("0");

  const [showimagecategory, setshowimagecategory] = useState(false);
  useEffect(() => {
    console.log("coming")
    setTimeout(() => {
    if (imagesCategoryData) {
      console.log(imagesCategoryData)
      setshowimagecategory(true);

      setcinImageCategoryTypeId(imagesCategoryData.defaultId);
      setChooseImgValue("out-" + imagesCategoryData.defaultId);
      imagesCategoryData.list.map(function (elem) {
        if (elem.id === imagesCategoryData.defaultId) {
          setvalueGrid(elem.list[0].defaultId);
          setcinImageTypeId(elem.list[0].defaultId);
          const imageTypeCol = elem.list[0].list.find(
            (x) => x.id === elem.list[0].defaultId
          );

          setselectedOsStyle(imageTypeCol ? imageTypeCol : "");

          if (elem.list[0].list) {
            elem.list[0].list.map(function (selem) {
              if (selem.id === elem.list[0].defaultId) {
                setcinImageTypeVersionId(selem.list[0].defaultId);
              }
            });
          }
          return;
        }
      });
    }
  }, 0);
  }, [imagesCategoryData]);

  // ** Choose an image Tab Function
  const [ChooseImgvalue, setChooseImgValue] = useState("out-1");
  const handleChooseImgChange = (event, newChooseImgValue) => {
    imagesCategoryData.defaultId = newChooseImgValue.split("-")[1];
    setcinImageCategoryTypeId(imagesCategoryData.defaultId);
    setChooseImgValue(newChooseImgValue);

    imagesCategoryData.list.map(function (elem) {
      if (elem.id === imagesCategoryData.defaultId) {
        setvalueGrid(elem.list[0].defaultId);
        setcinImageTypeId(elem.list[0].defaultId);
        // console.log(elem.list[0]);
        if (elem.list[0].list) {
          elem.list[0].list.map(function (selem) {
            if (selem.id === elem.list[0].defaultId) {
              setcinImageTypeVersionId(selem.list[0].defaultId);
            }
          });
        }
        return;
      }
    });
  };
  const [selectedVersion, setSelectedVersion] = useState({});

  const handleChangeImgVersion = async (event, id) => {
     console.log(event.target.value);
    //setcinImageTypeVersionId(event.target.value);
    updateCommonOps(event.target.value, id);
    // console.log(cinImageTypeVersionId);
    //return;
  };
  /*const handleChangeGrid = (newValue) => {
    imagesCategoryData.list.map(function (elem, index) {
      if (elem.id == imagesCategoryData.defaultId) {
        imagesCategoryData.list[index].list[0].defaultId = newValue;
        const selectedOsObj = imagesCategoryData.list[index].list[0].list.find(item => item.id === newValue) // TR 01 get selected os cost obj
        setSelectedOsCost(selectedOsObj.cost) // TR 01 set selected os cost
        setOSselected(selectedOsObj.value)
        setvalueGrid(newValue);
        setcinImageTypeId(imagesCategoryData.list[index].list[0].defaultId);

        const imageTypeCol = imagesCategoryData.list[index].list[0].list.find(
          (x) => x.id === newValue
        );

        setselectedOsStyle(imageTypeCol ? imageTypeCol : "");

        //setcinImageTypeVersionId(imageTypeCol.list[0].defaultId);

        return;
      }
    });
    setimagesCategoryData(imagesCategoryData)
  };*/

  const handleChangeGrid = (newValue, celemID) => {
    // Create a copy of imagesCategoryData to make changes
    const updatedImagesCategoryData = { ...imagesCategoryData };
  
    updatedImagesCategoryData.list.forEach(function (elem, index) {
      if (elem.id == updatedImagesCategoryData.defaultId) {
        updatedImagesCategoryData.list[index].list[0].defaultId = newValue;
        const selectedOsObj = updatedImagesCategoryData.list[index].list[0].list.find(
          (item) => item.id === newValue
        );
        setSelectedOsCost(selectedOsObj.cost);
        setOSselected(selectedOsObj.value);
        setvalueGrid(newValue);
        setcinImageTypeId(updatedImagesCategoryData.list[index].list[0].defaultId);
  
        const imageTypeCol = updatedImagesCategoryData.list[index].list[0].list.find(
          (x) => x.id === newValue
        );
  
        setselectedOsStyle(imageTypeCol ? imageTypeCol : "");
        //setcinImageTypeVersionId(imageTypeCol.list[0].defaultId);
       // updatedImagesCategoryData.list[index].list[0].defaultId = imageTypeCol.list[0].defaultId;
      }
    });
  
    // Update the state with the modified copy
    setimagesCategoryData(updatedImagesCategoryData);
    
    setSelectedVersion((prevSelectedImgVersions) => ({
      ...prevSelectedImgVersions,
      [celemID]: "",
    }));
  };

  
  return (
    <>
      {showimagecategory && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
          <CardContent sx={{ padding: "24px" }}>
            <Typography className={styles.cardLabel} component="h4" variant="h5" align="left" fontSize={20}> {/* TR 01 className */}
              Choose an image
            </Typography>
            {imagesCategoryData && (
              <TabContext value={"out-" + imagesCategoryData.defaultId}>
                <TabList
                  onChange={handleChooseImgChange}
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
                  {imagesCategoryData &&
                    imagesCategoryData.list.map(function (elem) {
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
                            sx={{cursor:'not-allowed !important',pointerEvents:'auto !important'}} // TR 01 bug fixing
                          />
                        );
                      }
                    })}
                </TabList>
                {imagesCategoryData.list &&
                  imagesCategoryData.list.map(function (elem, index) {
                    return (
                      <TabPanel key={"out-" + elem.id} value={"out-" + elem.id}>
                        <Grid
                          sx={{ mt: "0px", borderRadius: "7px" }}
                          container
                          direction="row"
                          rowSpacing={2}
                          spacing={3}
                        >
                          {elem.availabilty &&
                            elem.list[0] &&
                            elem.list[0].list.map(function (celem) {
                              // console.log(celem)
                              return (
                                <Grid
                                 
                                  key={celem.id}
                                  value={celem.id}
                                  item
                                  xs={12}
                                  sm={6}
                                  md={3}
                                  lg={3}
                                  xl={3}
                                >
                                  <Card
                                    variant="outlined"
                                    sx={{
                                      position: "relative",
                                      borderRadius: "7px",
                                      overflow: "initial",
                                    }}
                                    className={styles.cardActive}
                                  >
                                    <CardContent
                                    onClick={() =>
                                      handleChangeGrid(
                                        celem.availabilty ? celem.id : celem.id,celem.id
                                      )
                                    }
                                      key={celem.id}
                                      value={celem.id}
                                      sx={{
                                        padding: "16px !important",
                                        textAlign: "center",
                                      }}
                                    >
                                      <Box
                                       
                                        component="img"
                                        width={50}
                                        height={50}
                                        align="center"
                                        alt={celem.image}
                                        src={
                                          "/images/pages/surface/clouds/elasticins/create/chooseImages/" +
                                          celem.image
                                        }
                                      />
                                      <Typography
                                      
                                        component="h6"
                                        variant="h6"
                                        align="center"
                                        fontSize={16}
                                        pt={1}
                                      >
                                        {celem.value}
                                      </Typography>

                                      {valueGrid == celem.id && (
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
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                      <CssFormControl fullWidth size="small">
                                        <Select
                                          onChange={(event) => {
                                            handleChangeImgVersion(event,celem.id);
                                            setSelectedVersion({
                                              ...selectedVersion,
                                              [celem.id]: event.target.value, // Set the selected value for the specific celemID
                                            });
                                          }}
                                          defaultValue={celem.list[0].defaultId}
                                          value={selectedVersion[celem.id]  || celem.list[0].defaultId}
                                          id="grouped-select"
                                          // displayEmpty
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                          MenuProps={MenuProps}
                                        >
                                          {celem.list[0].list &&
                                            celem.list[0].list.map(function (
                                              selem
                                            ) {
                                              return (
                                                <MenuItem
                                                  key={selem.id}
                                                  value={selem.id}
                                                >
                                                  {selem.value}
                                                </MenuItem>
                                              );
                                            })}
                                        </Select>
                                      </CssFormControl>
                                    </CardActions>
                                  </Card>
                                </Grid>
                              );
                            })}
                        </Grid>

                        {!elem.list[0] && (
                          <Typography>No Data Found</Typography>
                        )}
                      </TabPanel>
                    );
                  })}
              </TabContext>
            )}
          </CardContent>
        </Card>
      )}
      {/* END Choose an image Here */}
      {/* Start Choose an image Skeleton Here */}
      {!showimagecategory && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
          <CardContent sx={{ padding: "24px" }}>
            <Stack spacing={1}>
              <Skeleton variant="text" width={"20%"} height={25} />
              <Skeleton
                variant="text"
                width={"100%"}
                height={80}
                sx={{ borderRadius: "12px" }}
              />
            </Stack>
            <Grid
              sx={{ mt: "0px", borderRadius: "7px" }}
              container
              direction="row"
              rowSpacing={2}
              spacing={3}
            >
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Card
                  variant="outlined"
                  sx={{
                    position: "relative",
                    borderRadius: "7px",
                    overflow: "initial",
                  }}
                >
                  <CardContent sx={{ padding: "16px !important" }}>
                    <Skeleton
                      variant="circular"
                      width={50}
                      height={50}
                      sx={{ margin: "0 auto" }}
                    />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1, mb: 1 }}
                    />
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Card
                  variant="outlined"
                  sx={{
                    position: "relative",
                    borderRadius: "7px",
                    overflow: "initial",
                  }}
                >
                  <CardContent sx={{ padding: "16px !important" }}>
                    <Skeleton
                      variant="circular"
                      width={50}
                      height={50}
                      sx={{ margin: "0 auto" }}
                    />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1, mb: 1 }}
                    />
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Card
                  variant="outlined"
                  sx={{
                    position: "relative",
                    borderRadius: "7px",
                    overflow: "initial",
                  }}
                >
                  <CardContent sx={{ padding: "16px !important" }}>
                    <Skeleton
                      variant="circular"
                      width={50}
                      height={50}
                      sx={{ margin: "0 auto" }}
                    />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1, mb: 1 }}
                    />
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Card
                  variant="outlined"
                  sx={{
                    position: "relative",
                    borderRadius: "7px",
                    overflow: "initial",
                  }}
                >
                  <CardContent sx={{ padding: "16px !important" }}>
                    <Skeleton
                      variant="circular"
                      width={50}
                      height={50}
                      sx={{ margin: "0 auto" }}
                    />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1, mb: 1 }}
                    />
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Card
                  variant="outlined"
                  sx={{
                    position: "relative",
                    borderRadius: "7px",
                    overflow: "initial",
                  }}
                >
                  <CardContent sx={{ padding: "16px !important" }}>
                    <Skeleton
                      variant="circular"
                      width={50}
                      height={50}
                      sx={{ margin: "0 auto" }}
                    />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1, mb: 1 }}
                    />
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Card
                  variant="outlined"
                  sx={{
                    position: "relative",
                    borderRadius: "7px",
                    overflow: "initial",
                  }}
                >
                  <CardContent sx={{ padding: "16px !important" }}>
                    <Skeleton
                      variant="circular"
                      width={50}
                      height={50}
                      sx={{ margin: "0 auto" }}
                    />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1, mb: 1 }}
                    />
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Card
                  variant="outlined"
                  sx={{
                    position: "relative",
                    borderRadius: "7px",
                    overflow: "initial",
                  }}
                >
                  <CardContent sx={{ padding: "16px !important" }}>
                    <Skeleton
                      variant="circular"
                      width={50}
                      height={50}
                      sx={{ margin: "0 auto" }}
                    />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1, mb: 1 }}
                    />
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Card
                  variant="outlined"
                  sx={{
                    position: "relative",
                    borderRadius: "7px",
                    overflow: "initial",
                  }}
                >
                  <CardContent sx={{ padding: "16px !important" }}>
                    <Skeleton
                      variant="circular"
                      width={50}
                      height={50}
                      sx={{ margin: "0 auto" }}
                    />
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Skeleton
                      variant="text"
                      width={"100%"}
                      height={25}
                      sx={{ mt: 1, mb: 1 }}
                    />
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      {/* END Choose an image Skeleton Here */}
    </>
  );
};

export default ImageCategory;
