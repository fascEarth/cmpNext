// ** React Imports
import * as React from "react";
import { useState } from "react";
import SurfaceLayout from "../../../../../components/layouts/surface/Layout";

// ** MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";

// ** Custom CSS
import styles from "./index.module.css";

import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import Platform from "../../../../../components/pages/surface/clouds/elasticins/create/platform";
import Datacenter from "../../../../../components/pages/surface/clouds/elasticins/create/datacenter";
import CloudServerType from "../../../../../components/pages/surface/clouds/elasticins/create/cloudservertype";
import SizingPolicyGroup from "../../../../../components/pages/surface/clouds/elasticins/create/sizingpolicygroup";
import ImageCategory from "../../../../../components/pages/surface/clouds/elasticins/create/imagecategory";
import Storages from "../../../../../components/pages/surface/clouds/elasticins/create/storages";
import CollobHost from "../../../../../components/pages/surface/clouds/elasticins/create/collohost";
import PrivateNetworks from "../../../../../components/pages/surface/clouds/elasticins/create/privatenetwork";
import Network from "../../../../../components/pages/surface/clouds/elasticins/create/network";
import Authentication from "../../../../../components/pages/surface/clouds/elasticins/create/authentication";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
// Importing Accordion   TR 01
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import styled from "styled-components";
import { useClientIP } from "../../../../../utils/context/ClientIPContext";
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

function Cinstance() {
  const { clientIP } = useClientIP();
  const [allowPublicnn, setallowPublicnn] = useState(false);
  // **** TR01  for host name error state *****
  const [commonFinalStorageCost, setcommonFinalStorageCost] = useState(0);
  const [hostNameError, setHostNameError] = useState(false);
  const [rootPasswordError, setRootPasswordError] = useState(false);
  // **** TR01  End *****
  const router = useRouter();
  const [cindata, setcinData] = useState(null);
  const [cachedInfo, setCachedInfo] = useState(null);

  const [showCinsPlatforms, setshowCinsPlatforms] = useState(false);
  const [showCinsdatacenter, setshowCinsdatacenter] = useState(false);
  const [showCinscloudservertype, setshowCinscloudservertype] = useState(false);
  const [showCinssizingPolicyGroup, setshowCinssizingPolicyGroup] =
    useState(false);

  const [reqParams, setreqParams] = useState({});

  const [platformData, setplatformData] = useState("");
  const [datacenterData, setdatacenterData] = useState("");
  const [cloudservertypeData, setcloudservertypeData] = useState("");
  const [sizingPolicyGroupData, setsizingPolicyGroupData] = useState("");

  const [imagesCategoryData, setimagesCategoryData] = useState("");
  const [storagesData, setStoragesData] = useState("");

  const [originalStoragesInfo, setoriginalStoragesInfo] = useState({});
  const [dataStoragesInfo, setdataStoragesInfo] = useState({});

  const [selectedOsStyle, setselectedOsStyle] = useState("");
  // const [cinstoragesData,setcinstoragesData] = useState("");

  const [cinTenantId, setcinTenantId] = useState("");

  const [cinPlatformsId, setcinPlatformsId] = useState("");
  const [cinDatacentersId, setcinDatacentersId] = useState("");
  const [cinCloudServerTypeId, setcinCloudServerTypeId] = useState("");
  const [cinPlacementGroupsId, setcinPlacementGroupsId] = useState("");
  const [cinsizingPolicyGroupId, setcinsizingPolicyGroupId] = useState("");
  const [cinsizingPolicyId, setcinsizingPolicyId] = useState("");

  const [cinImageCategoryTypeId, setcinImageCategoryTypeId] = useState("");
  const [cinImageTypeId, setcinImageTypeId] = useState("");
  const [cinImageTypeVersionId, setcinImageTypeVersionId] = useState("");

  const [teamsData, setTeamsData] = useState(false);
  const [tagsData, setTagsData] = useState(false);

  const [selectedTeamId, setselectedTeamId] = useState("");
  const [selectedTagId, setselectedTagId] = useState("");
  const [hostnameap, sethostnameap] = useState("");

  const [selectedIpModeId, setselectedIpModeId] = useState("");
  const [ipModeData, setipModeData] = useState(false);

  const [networkIpAddr, setnetworkIpAddr] = useState("");

  const [selectedbandwidthpolicyId, setselectedbandwidthpolicyId] =
    useState("");
  const [bandwidthpolicyData, setbandwidthpolicyData] = useState(false);
  const [networkIpRequired, setnetworkIpRequired] = useState(false);
  const [publicIpData, setpublicIpData] = useState(false);

  const [pvmpassword, setpvmpassword] = useState("");
  const [commonsshKeysValues, setcommonsshKeysValues] = useState([]);

  const [selectedNetworkId, setselectedNetworkId] = useState("");

  const [chooseSizePol, setchooseSizePol] = useState("");
  const [chooseSizeStorePol, setchooseSizeStorePol] = useState("");

  const [commonTotalCost, setcommonTotalCost] = useState(0);
  const [commonFinalTotalCost, setcommonFinalTotalCost] = useState(0);
  // TR network  switch
  const [switchSar, setswitchSar] = useState(false);
  //TR 01 role name

  const [roleName, setRoleName] = useState();
  const [commonOps, setcommonOps] = useState("-");
  //TR 01 selected os cost
  const [selectedOsCost, setSelectedOsCost] = useState(0);
  const [OSselected, setOSselected] = useState("");

  const [getOrderedIpByTeam, setgetOrderedIpByTeam] = useState([]);
  const [getOrderedIpValue, setgetOrderedIpValue] = useState("");

  useEffect(() => {
    //  console.log(cinImageTypeVersionId);
    if (selectedOsStyle || cinImageTypeVersionId || cinImageTypeId) {
      setcinImageTypeVersionId(cinImageTypeVersionId);
      // console.log(selectedOsStyle);

      updateCommonOps(cinImageTypeVersionId, cinImageTypeId);
    }
  }, [cinImageTypeId, selectedOsStyle, cinImageTypeVersionId]);

  const updateCommonOps = (newCinImageTypeVersionId, id) => {
    if (id === cinImageTypeId) {
      setcinImageTypeVersionId(newCinImageTypeVersionId);
      if (
        selectedOsStyle &&
        selectedOsStyle.list &&
        selectedOsStyle.list[0] &&
        selectedOsStyle.list[0].list &&
        newCinImageTypeVersionId
      ) {
        const cap = selectedOsStyle.list[0].list.find(
          (x) => parseInt(x.id) === parseInt(newCinImageTypeVersionId)
        );
        // console.log(cap)
        if (cap) {
          // console.log(cap.value)
          const ccm = selectedOsStyle.value + "" + cap.value;
          setcommonOps(ccm);
        }
      }
      return;
    }
  };
  useEffect(() => {
    const getTypeArray = (type, data) => {
      return data
        .filter((item) => item.type === type)
        .map((item) => item)
        .flat();
    };

    const cookie = Cookies.get("userData");
    const cachedInformation = JSON.parse(cookie);
    setRoleName(cachedInformation.role_name);
    const fetchData = async () => {
      try {
        const cookies = Cookies.get("userData");

        if (!cookies) {
          // Handle case when 'userData' cookie is not found
          return;
        }

        const cachedInfo = JSON.parse(cookies);
        setcinTenantId(cachedInfo.tenant_id);
        const finalData = {
          data: reqParams,
          tenantId: cachedInfo.tenant_id,
          userSerialId: cachedInfo.user_serial_id,
          endPoint: "getcinsAll",
          token: cachedInfo.accessToken,
          ipaddress: clientIP,
        };

        const response = await axios.post(
          "/api/surface/clouds/elasticins/create",
          finalData
        ); // call the new API route

        setcinData(response.data);
        setimagesCategoryData(response.data);
        setSelectedOsCost(0);
        setCachedInfo(cachedInfo);
        if (Object.keys(reqParams).length > 0) {
          if (Object.keys(reqParams).length == 1) {
            setdatacenterData(response.data.list[0]);
            //goDatacenter(response.data.list[0]);
            setshowCinsdatacenter(true);
          } else if (Object.keys(reqParams).length == 2) {
            setcloudservertypeData(response.data.list[0]);
            setshowCinscloudservertype(true);
          }
        } else {
          // console.log(response.data)
          const platformsArray = getTypeArray("platforms", response.data)[0];
          setplatformData(platformsArray);
          setshowCinsPlatforms(true);
          if (platformsArray) {
            platformsArray.list.map(function (elem) {
              if (platformsArray.defaultId == elem.id && elem.availabilty) {
                const datacenterArray = elem.list[0];
                setdatacenterData(datacenterArray);
                setshowCinsdatacenter(true);

                if (datacenterArray) {
                  datacenterArray.list.map(function (dcaelem) {
                    if (
                      datacenterArray.defaultId == dcaelem.id &&
                      dcaelem.availabilty
                    ) {
                      const cloudservertypeArray = dcaelem.list[0];
                      setcloudservertypeData(cloudservertypeArray);
                      setshowCinscloudservertype(true);

                      if (cloudservertypeArray) {
                        cloudservertypeArray.list.map(function (cstaelem) {
                          if (
                            cloudservertypeArray.defaultId == cstaelem.id &&
                            cstaelem.availabilty
                          ) {
                            const serverTypeArray = cstaelem;

                            if (serverTypeArray) {
                              serverTypeArray.list.map(function (staElem) {
                                if (
                                  serverTypeArray.defaultId == staElem.id &&
                                  staElem.availabilty
                                ) {
                                  staElem.list.map(function (staselElem) {
                                    if (staselElem.id == staElem.defaultId) {
                                      const sizingPolicyGroupArray = staselElem;
                                      setsizingPolicyGroupData(
                                        sizingPolicyGroupArray
                                      );
                                      setshowCinssizingPolicyGroup(true);
                                    }
                                  });
                                }
                              });
                            }
                          }
                        });
                      }
                    }
                  });
                }
                return;
              }
            });
          }

          const imagesArray = getTypeArray("imageCategory", response.data)[0];

          setimagesCategoryData(imagesArray);

          const storagesArray = getTypeArray("storages", response.data)[0];
          setStoragesData(storagesArray);

          const teamsArray = getTypeArray("teams", response.data)[0];
          setTeamsData(teamsArray);
          console.log(teamsArray, "teamsArray");
          // TR-SANJAI-starts
          if (teamsArray) {
            const itemWithCurrentState1 = teamsArray.list.find(
              (item) => item.isUsed === true
            );

            if (itemWithCurrentState1) {
              setTimeout(() => {
                fetchData();
              }, 15000);
            }
          }
          // TR-SANJAI-ends

          setselectedTeamId(teamsArray.defaultId);
          const tagsArray = getTypeArray("tags", response.data)[0];
          setTagsData(tagsArray);
          setselectedTagId(tagsArray.defaultId);

          const ipModeArray = getTypeArray("ipMode", response.data)[0];

          setselectedIpModeId(ipModeArray.defaultId);
          setipModeData(ipModeArray);

          const bandwidthpolicyArray = getTypeArray(
            "bandwidthpolicy",
            response.data
          )[0];

          setselectedbandwidthpolicyId(bandwidthpolicyArray.defaultId);
          setbandwidthpolicyData(bandwidthpolicyArray);

          const publicipArray = getTypeArray("publicip", response.data)[0];

          setnetworkIpRequired(
            publicipArray.list[0].value === "true" ? true : false
          );
          setpublicIpData(publicipArray);

          //      const [networkIpRequired, setnetworkIpRequired] = useState(false);
          //const [publicIpData, setpublicIpData] = useState(false);
        }
      } catch (error) {
        // Handle any errors that occur during data fetching
        console.error(error);
      }
    };

    fetchData();
  }, [reqParams]);
  useEffect(() => {
    if (storagesData || OSselected) {
      const firstStorage = storagesData.list[0];
      const storeId = firstStorage.id;
      const storageName = firstStorage.value;
      const storageSize = firstStorage.size + "G";
      const storagePrize = (
        parseFloat(firstStorage.size) * firstStorage.pergbcost
      ).toFixed(2);
      // console.log(firstStorage , "Storage ");
      if (OSselected === "MSWindows") {
        setoriginalStoragesInfo({
          list: [
            {
              storageId: storeId,
              storageName: storageName,
              storageTypeName: "1",
              storageSizeName: 50 + "G",
              storagePrize: (50 * firstStorage.pergbcost).toFixed(2),
              allowDec: 50, // TR 01
            },
          ],
        });
        setdataStoragesInfo({
          list: [
            {
              storageId: storeId,
              storageName: storageName,
              storageTypeName: "1",
              storageSizeName: 50 + "G",
              storagePrize: (50 * firstStorage.pergbcost).toFixed(2),
              allowDec: 50, // TR 01
            },
          ],
        });
      } else {
        setoriginalStoragesInfo({
          list: [
            {
              storageId: storeId,
              storageName: storageName,
              storageTypeName: "1",
              storageSizeName: storageSize,
              storagePrize: storagePrize,
              allowDec: parseFloat(storageSize.split("G")[0]), // TR 01
            },
          ],
        });

        setdataStoragesInfo({
          list: [
            {
              storageId: storeId,
              storageName: storageName,
              storageTypeName: "1",
              storageSizeName: storageSize,
              storagePrize: storagePrize,
              allowDec: parseFloat(storageSize.split("G")[0]), // TR 01
            },
          ],
        });
      }

      setchooseSizeStorePol(parseFloat(storageSize.split("G")[0]));
      setstorageOpenCost(parseFloat(firstStorage.pergbcost));
    }
  }, [storagesData, OSselected]);
  const [storageOpenCost, setstorageOpenCost] = useState(0);
  const sbtAllCin = () => {
    const ak = sizingPolicyGroupData.list.find(
      (x) => x.id === cinsizingPolicyGroupId
    ).list[0];

    // Remove "allowDec" property and update the list
    const finalStoreList = dataStoragesInfo.list.map((item) => {
      const { allowDec, ...rest } = item; // Destructure the object and exclude "allowDec"
      return rest; // Return the object without "allowDec"
    });

    const finalParams = {
      tenantId: cinTenantId,
      hostname: hostnameap,
      vmtagId: selectedTagId,
      authTypeId: 1,
      vmTotal: ak.list.find((x) => x.id === cinsizingPolicyId).value,
      teamId: selectedTeamId,
      cloudType: 1,
      cloudComponent: 1,
      platforms: cinPlatformsId,
      datacenters: cinDatacentersId,
      cloudServerType: cinCloudServerTypeId,
      placementGroups: cinPlacementGroupsId,
      sizingPolicyGroup: cinsizingPolicyGroupId,
      sizingPolicy: cinsizingPolicyId,
      imageCategory: cinImageCategoryTypeId,
      imageType: cinImageTypeId,
      imageTypeVersion: cinImageTypeVersionId,
      dataCenter: datacenterData.list.find((x) => x.id === cinDatacentersId)
        .value,
      networkId: selectedNetworkId,
      ipModeId: selectedIpModeId,
      ipAddress: networkIpAddr,
      osDetails: commonOps,
      sizingPolicyName: ak.list.find((x) => x.id === cinsizingPolicyId).value,
      specification: chooseSizePol + "/" + chooseSizeStorePol + "GB",
      bandwidthPolicyId: selectedbandwidthpolicyId,
      networkIpRequired: networkIpRequired,
      storages: finalStoreList,
      publicIp: getOrderedIpValue,
    };
    //  return;
    // Conditionally add sshKeys and vmpassword properties
    if (commonsshKeysValues.length > 0) {
      finalParams.sshKeys = commonsshKeysValues;
    }

    if (pvmpassword !== "") {
      finalParams.vmpassword = pvmpassword;
    }
    if (commonsshKeysValues.length === 0 && pvmpassword === "") {
      toast.error("Please choose any authentication");
      return;
    }

    if (commonsshKeysValues.length === 0) {
      if (pvmpassword === "") {
        setRootPasswordError(true);
        toast.error("Please enter the root password");
        return;
      }
      // ***** TR 01 ******
      else if (rootPasswordError) {
        setRootPasswordError(true);
        toast.error("Please enter the valid root password");
        return;
      } else if (!selectedTagId) {
        toast.error("Please select any tag");
        return;
      }
    }

    if (hostNameError) {
      toast.error("Please enter the valid host name");
      return;
    }

    // ***** TR 01 ******
    fpostData(finalParams);
  };
  const fpostData = async (pdata) => {
    const tdata = cachedInfo;
    if (pdata.publicIp == "") {
      pdata.publicIp = null;
    }
    const newData = {
      data: pdata,
      teamId: selectedTeamId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "finalSbtCinstance",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/create",
        finalData
      ); // call the new API route
      if (data.status === "ok") {
        router.replace("/surface/clouds/elasticins/manage/list");
        toast.success("success");
      } else if (data.status == "error") {
        toast.error(data.message);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  //**********  TR 01 Footer card show state **********
  const [summaryCardShow, setSummaryCardShow] = useState(true);
  // **********  TR 01 SUMMARY ACCORDION **********
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const hasWindow = typeof window !== "undefined";

  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    if ((height < "500" && width < "900") || width < "600") {
      setSummaryCardShow(false);
    } else {
      setSummaryCardShow(true);
    }

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [height, width]);
  // ***** END OF TR 01 SUMMARY ACCORDION *****
  return (
    <SurfaceLayout currentPage={1} setBackgrd={true}>
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          component="h4"
          variant="h5"
          align="left"
          color="#fff"
          fontSize={20}
        >
          Create Elastic Instance
        </Typography>
      </Breadcrumbs>
      {/* END Breadcrumbs Here */}
      {/* Start Breadcrumbs Skeleton Here */}
      <Stack spacing={1} sx={{ display: "none" }}>
        <Skeleton variant="text" width={"22%"} height={25} />
      </Stack>
      {/* END Breadcrumbs Skeleton Here */}

      {/* Start Platform Here */}
      <Platform
        setcinPlatformsId={setcinPlatformsId}
        showCinsPlatforms={showCinsPlatforms}
        platformData={platformData}
        setplatformData={setplatformData}
        setshowCinsdatacenter={setshowCinsdatacenter}
        setreqParams={setreqParams}
      />

      {/* Start Datacenter/Region Here */}
      <Datacenter
        setcinDatacentersId={setcinDatacentersId}
        showCinsdatacenter={showCinsdatacenter}
        datacenterData={datacenterData}
        platformData={platformData}
        setreqParams={setreqParams}
        setdatacenterData={setdatacenterData}
        setshowCinscloudservertype={setshowCinscloudservertype}
      />

      {/* Start Type of Cloud Server Here */}
      <CloudServerType
        setcinCloudServerTypeId={setcinCloudServerTypeId}
        setcinPlacementGroupsId={setcinPlacementGroupsId}
        showCinscloudservertype={showCinscloudservertype}
        cloudservertypeData={cloudservertypeData}
        datacenterData={datacenterData}
        platformData={platformData}
        setreqParams={setreqParams}
        setsizingPolicyGroupData={setsizingPolicyGroupData}
        sizingPolicyGroupData={sizingPolicyGroupData}
      />

      {/* Start Profile Here */}
      <SizingPolicyGroup
        cinPlacementGroupsId={cinPlacementGroupsId}
        setcinsizingPolicyGroupId={setcinsizingPolicyGroupId}
        setcinsizingPolicyId={setcinsizingPolicyId}
        showCinssizingPolicyGroup={showCinssizingPolicyGroup}
        sizingPolicyGroupData={sizingPolicyGroupData}
        cloudservertypeData={cloudservertypeData}
        datacenterData={datacenterData}
        platformData={platformData}
        setreqParams={setreqParams}
        chooseSizePol={chooseSizePol}
        setchooseSizePol={setchooseSizePol}
        commonTotalCost={commonTotalCost}
        setcommonTotalCost={setcommonTotalCost}
      />

      {/* Start Choose an image Here */}
      <ImageCategory
        updateCommonOps={updateCommonOps}
        selectedOsStyle={selectedOsStyle}
        setselectedOsStyle={setselectedOsStyle}
        imagesCategoryData={imagesCategoryData}
        setimagesCategoryData={setimagesCategoryData}
        setcinImageCategoryTypeId={setcinImageCategoryTypeId}
        setcinImageTypeId={setcinImageTypeId}
        setcinImageTypeVersionId={setcinImageTypeVersionId}
        cinImageCategoryTypeId={cinImageCategoryTypeId}
        cinImageTypeId={cinImageTypeId}
        cinImageTypeVersionId={cinImageTypeVersionId}
        commonTotalCost={commonTotalCost}
        setcommonTotalCost={setcommonTotalCost}
        setSelectedOsCost={setSelectedOsCost} // TR 01 selected os cost
        setOSselected={setOSselected} // TR 01 selected os
      />

      {/* Start Add Storage Here */}
      <Storages
        storagesData={storagesData}
        setStoragesData={setStoragesData}
        originalStoragesInfo={originalStoragesInfo}
        setoriginalStoragesInfo={setoriginalStoragesInfo}
        dataStoragesInfo={dataStoragesInfo}
        setdataStoragesInfo={setdataStoragesInfo}
        storageOpenCost={storageOpenCost}
        setstorageOpenCost={setstorageOpenCost}
        chooseSizeStorePol={chooseSizeStorePol}
        setchooseSizeStorePol={setchooseSizeStorePol}
        commonFinalTotalCost={commonFinalTotalCost}
        setcommonFinalTotalCost={setcommonFinalTotalCost}
        commonFinalStorageCost={commonFinalStorageCost}
        setcommonFinalStorageCost={setcommonFinalStorageCost}
        OSselected={OSselected} //TR 01
      />

      {/* Start Instance Here */}
      <CollobHost
        hostNameError={hostNameError}
        setHostNameError={setHostNameError}
        hostnameap={hostnameap}
        selectedTeamId={selectedTeamId}
        selectedTagId={selectedTagId}
        selectedOsStyle={selectedOsStyle}
        teamsData={teamsData}
        tagsData={tagsData}
        setselectedTeamId={setselectedTeamId}
        setselectedTagId={setselectedTagId}
        sethostnameap={sethostnameap}
        OSselected={OSselected}
      />

      {/* Start Private Network Here */}
      <PrivateNetworks
        selectedTeamId={selectedTeamId}
        selectedNetworkId={selectedNetworkId}
        setselectedNetworkId={setselectedNetworkId}
        ipModeData={ipModeData}
        setipModeData={setipModeData}
        selectedIpModeId={selectedIpModeId}
        setselectedIpModeId={setselectedIpModeId}
        setnetworkIpAddr={setnetworkIpAddr}
        networkIpAddr={networkIpAddr}
        setallowPublicnn={setallowPublicnn}
        allowPublicnn={allowPublicnn}
        setgetOrderedIpByTeam={setgetOrderedIpByTeam}
      />

      {/* Start Network Bandwidth Speed Here */}
      <Network
        selectedbandwidthpolicyId={selectedbandwidthpolicyId}
        setselectedbandwidthpolicyId={setselectedbandwidthpolicyId}
        bandwidthpolicyData={bandwidthpolicyData}
        setbandwidthpolicyData={setbandwidthpolicyData}
        networkIpRequired={networkIpRequired}
        setnetworkIpRequired={setnetworkIpRequired}
        publicIpData={publicIpData}
        setpublicIpData={setpublicIpData}
        switchSar={switchSar}
        setswitchSar={setswitchSar}
        setallowPublicnn={setallowPublicnn}
        allowPublicnn={allowPublicnn}
        getOrderedIpByTeam={getOrderedIpByTeam}
        setgetOrderedIpValue={setgetOrderedIpValue}
        getOrderedIpValue={getOrderedIpValue}
        selectedTeamId={selectedTeamId}
      />

      {/* Start Authentication Here */}
      <Authentication
        rootPasswordError={rootPasswordError}
        setRootPasswordError={setRootPasswordError}
        pvmpassword={pvmpassword}
        setpvmpassword={setpvmpassword}
        commonsshKeysValues={commonsshKeysValues}
        setcommonsshKeysValues={setcommonsshKeysValues}
        OSselected={OSselected}
      />

      {/* Start Fixed Footer Here */}
      {summaryCardShow ? (
        <Box className={styles.Footer}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            rowSpacing={1}
            spacing={2}
          >
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Grid container direction="row" rowSpacing={1} spacing={0}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="center"
                    alignItems="center"
                    fontSize={20}
                    color={"#fff"}
                    sx={{ mt: "20px" }}
                    className={styles.summaryCardTitle} // TR 01
                  >
                    Summary
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={styles.operatingSystem} /* TR 01*/
                >
                  <Typography
                    className={styles.summaryCardLabel} // TR 01
                    component="p"
                    variant="p"
                    color={"#6DCCDD"}
                    fontSize={14}
                    align="left"
                    sx={{ pt: 1, pb: 2 }}
                  >
                    Operating System
                  </Typography>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    alignItems={"left"}
                    fontSize={16}
                    color={"#fff"}
                    className={styles.textnowrap}
                    title={"Ubuntu 22.04 (LTS) x64"}
                  >
                    {commonOps}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={styles.summaryLocation}
                >
                  <Typography
                    component="p"
                    variant="p"
                    color={"#6DCCDD"}
                    fontSize={14}
                    align="left"
                    sx={{ pt: 1, pb: 2, pl: 2 }}
                    className={styles.summaryCardLocationTag} // TR 01
                  >
                    Location
                  </Typography>
                  <Box
                    sx={{ display: "flex", pl: 2 }}
                    className={styles.locations}
                  >
                    {" "}
                    {/* TR 01*/}
                    {datacenterData &&
                    datacenterData.list &&
                    cinDatacentersId ? (
                      <>
                        <Box
                          component="img"
                          width={20}
                          height={20}
                          mr={1}
                          align="center"
                          alt="ubundu"
                          src={
                            "/images/pages/surface/clouds/elasticins/create/" +
                            (datacenterData.list.find(
                              (x) => x.id === cinDatacentersId
                            )?.image || "riyadh.png")
                          }
                        />
                        <Typography
                          component="h4"
                          variant="h5"
                          align="left"
                          alignItems={"left"}
                          fontSize={16}
                          color={"#fff"}
                          className={styles.textnowrap}
                        >
                          {datacenterData.list.find(
                            (x) => x.id === cinDatacentersId
                          )?.value || "-"}
                        </Typography>
                      </>
                    ) : (
                      // Handle the case where datacenterData or datacenterData.list is undefined
                      // You can display a loading spinner or an appropriate message here
                      <div>Loading...</div>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Grid container direction="row" rowSpacing={1} spacing={0}>
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  align="center"
                  alignItems="center"
                >
                  <Typography
                    className={styles.summaryCardLabel} // TR 01
                    component="p"
                    variant="p"
                    color={"#6DCCDD"}
                    fontSize={14}
                    align="left"
                    sx={{ pt: 1, pb: 2 }}
                  >
                    Specification
                  </Typography>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    alignItems={"left"}
                    fontSize={16}
                    color={"#fff"}
                    className={styles.textnowrap}
                  >
                    {chooseSizePol ? chooseSizePol : "-"}/
                    {chooseSizeStorePol ? chooseSizeStorePol : "-"}GB
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  align="center"
                  alignItems="center"
                >
                  <Typography
                    component="p"
                    variant="p"
                    color={"#6DCCDD"}
                    fontSize={14}
                    align="left"
                    sx={{ pt: 1, pb: 2 }}
                    className={styles.estimatedCostTag} // TR 01
                  >
                    Estimated Cost
                  </Typography>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    alignItems={"left"}
                    fontSize={16}
                    color={"#fff"}
                    sx={{ display: "flex" }}
                    className={`${styles.textnowrap} ${styles.sarPricePer}`}
                  >
                    <Box sx={{ fontSize: "10px", pr: 1, marginTop: "7px" }}>
                      SAR
                    </Box>{" "}
                    {(switchSar && getOrderedIpByTeam?.list?.length <= 0
                      ? parseFloat(commonTotalCost) +
                        parseFloat(commonFinalTotalCost) +
                        parseFloat(commonFinalStorageCost) +
                        parseFloat(publicIpData.list[0].cost) +
                        parseFloat(selectedOsCost)
                      : parseFloat(commonTotalCost) +
                        parseFloat(commonFinalTotalCost) +
                        parseFloat(commonFinalStorageCost) +
                        parseFloat(selectedOsCost)
                    ).toFixed(2)}{" "}
                    <Box sx={{ fontSize: "10px", pl: 1, marginTop: "7px" }}>
                      /Month
                    </Box>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  align="center"
                  alignItems="center"
                  className={styles.deployBtn} /* TR 01*/
                >
                  {roleName === "operator" ||
                  roleName === "billing admin" ||
                  roleName === "manager" ? (
                    <Button
                      size="md"
                      variant="solid"
                      sx={{
                        color: "#fff",
                        backgroundImage:
                          "linear-gradient(45deg, #0288d1, #26c6da) !important",
                        mt: 2,
                        cursor: "not-allowed",
                      }}
                    >
                      Deploy
                    </Button>
                  ) : (
                    <Button
                      onClick={() => sbtAllCin()}
                      size="md"
                      variant="solid"
                      sx={{
                        color: "#fff",
                        backgroundImage:
                          "linear-gradient(45deg, #0288d1, #26c6da) !important",
                        mt: 2,
                      }}
                    >
                      Deploy
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <>
          {/*  Summary accordion */}
          <Box className={`${styles.Footer} ${styles.footerAccordionCard}`}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              rowSpacing={1}
              spacing={2}
            >
              <MuiAccordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{ backgroundColor: "transparent", boxShadow: "unset" }}
              >
                <MuiAccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ backgroundColor: "transparent" }}
                  expandIcon={
                    <ArrowForwardIosSharpIcon
                      sx={{ fontSize: "0.9rem", color: "#fff" }}
                    />
                  }
                >
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography
                      component="h4"
                      variant="h5"
                      align="center"
                      alignItems="center"
                      fontSize={20}
                      color={"#fff"}
                      sx={{ mt: "20px" }}
                      className={styles.summaryCardTitle} // TR 01
                    >
                      Summary
                    </Typography>
                  </Grid>
                </MuiAccordionSummary>
                <MuiAccordionDetails className={styles.AccordionDetails}>
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Grid
                      container
                      direction="row"
                      rowSpacing={1}
                      spacing={0}
                      className={styles.SummaryCardGrid}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        className={styles.operatingSystem} /* TR 01*/
                      >
                        <Typography
                          className={styles.summaryCardLabel} // TR 01
                          component="p"
                          variant="p"
                          color={"#6DCCDD"}
                          fontSize={14}
                          align="left"
                          sx={{ pt: 1, pb: 2 }}
                        >
                          Operating System
                        </Typography>
                        <Typography
                          component="h4"
                          variant="h5"
                          align="left"
                          alignItems={"left"}
                          fontSize={16}
                          color={"#fff"}
                          className={styles.textnowrap}
                          title={"Ubuntu 22.04 (LTS) x64"}
                        >
                          {commonOps}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        className={styles.summaryLocation}
                      >
                        <Typography
                          component="p"
                          variant="p"
                          color={"#6DCCDD"}
                          fontSize={14}
                          align="left"
                          sx={{ pt: 1, pb: 2, pl: 2 }}
                          className={styles.summaryCardLocationTag} // TR 01
                        >
                          Location
                        </Typography>
                        <Box
                          sx={{ display: "flex", pl: 2 }}
                          className={styles.locations}
                        >
                          {" "}
                          {/* TR 01*/}
                          {datacenterData &&
                          datacenterData.list &&
                          cinDatacentersId ? (
                            <>
                              <Box
                                component="img"
                                width={20}
                                height={20}
                                mr={1}
                                align="center"
                                alt="ubundu"
                                src={
                                  "/images/pages/surface/clouds/elasticins/create/" +
                                  (datacenterData.list.find(
                                    (x) => x.id === cinDatacentersId
                                  )?.image || "riyadh.png")
                                }
                              />
                              <Typography
                                component="h4"
                                variant="h5"
                                align="left"
                                alignItems={"left"}
                                fontSize={16}
                                color={"#fff"}
                                className={styles.textnowrap}
                              >
                                {datacenterData.list.find(
                                  (x) => x.id === cinDatacentersId
                                )?.value || "-"}
                              </Typography>
                            </>
                          ) : (
                            // Handle the case where datacenterData or datacenterData.list is undefined
                            // You can display a loading spinner or an appropriate message here
                            <div>Loading...</div>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Grid
                      container
                      direction="row"
                      rowSpacing={1}
                      spacing={0}
                      className={styles.SummaryCardGrid}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        align="center"
                        alignItems="center"
                      >
                        <Typography
                          className={styles.summaryCardLabel} // TR 01
                          component="p"
                          variant="p"
                          color={"#6DCCDD"}
                          fontSize={14}
                          align="left"
                          sx={{ pt: 1, pb: 2 }}
                        >
                          Specification
                        </Typography>
                        <Typography
                          component="h4"
                          variant="h5"
                          align="left"
                          alignItems={"left"}
                          fontSize={16}
                          color={"#fff"}
                          className={styles.textnowrap}
                        >
                          {chooseSizePol ? chooseSizePol : "-"}/
                          {chooseSizeStorePol ? chooseSizeStorePol : "-"}GB
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        align="center"
                        alignItems="center"
                      >
                        <Typography
                          component="p"
                          variant="p"
                          color={"#6DCCDD"}
                          fontSize={14}
                          align="left"
                          sx={{ pt: 1, pb: 2 }}
                          className={styles.estimatedCostTag} // TR 01
                        >
                          Estimated Cost
                        </Typography>
                        <Typography
                          component="h4"
                          variant="h5"
                          align="left"
                          alignItems={"left"}
                          fontSize={16}
                          color={"#fff"}
                          sx={{ display: "flex" }}
                          className={`${styles.textnowrap} ${styles.sarPricePer}`}
                        >
                          <Box
                            sx={{ fontSize: "10px", pr: 1, marginTop: "7px" }}
                          >
                            SAR
                          </Box>{" "}
                          {(switchSar && getOrderedIpByTeam?.list?.length <= 0
                            ? parseFloat(commonTotalCost) +
                              parseFloat(commonFinalTotalCost) +
                              parseFloat(commonFinalStorageCost) +
                              parseFloat(publicIpData.list[0].cost) +
                              parseFloat(selectedOsCost)
                            : parseFloat(commonTotalCost) +
                              parseFloat(commonFinalTotalCost) +
                              parseFloat(commonFinalStorageCost) +
                              parseFloat(selectedOsCost)
                          ).toFixed(2)}{" "}
                          <Box
                            sx={{ fontSize: "10px", pl: 1, marginTop: "7px" }}
                          >
                            /Month
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        align="center"
                        alignItems="center"
                        className={styles.deployBtn} /* TR 01*/
                      >
                        <Button
                          onClick={() => sbtAllCin()}
                          size="md"
                          variant="solid"
                          sx={{
                            color: "#fff",
                            backgroundImage:
                              "linear-gradient(45deg, #0288d1, #26c6da) !important",
                            mt: 2,
                          }}
                        >
                          Deploy
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* <AspectRatioIcon className={styles.resizeIcon} style={{color:"white"}}/> */}
                </MuiAccordionDetails>
              </MuiAccordion>
            </Grid>
          </Box>
          {/* End of  Summary accordion */}
        </>
      )}

      {/* END Fixed Footer Here */}
      {/* Start Fixed Footer Skeleton Here */}
      <Card hidden>
        <Box className={styles.Footer}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            rowSpacing={1}
            spacing={2}
          >
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Grid container direction="row" rowSpacing={1} spacing={0}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="center"
                    alignItems="center"
                    fontSize={20}
                    color={"#fff"}
                    sx={{ mt: "20px" }}
                  >
                    <Skeleton variant="text" width={"80%"} height={25} />
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                  <Typography
                    className={styles.summaryCardLabel} // TR 01
                    component="p"
                    variant="p"
                    color={"#6DCCDD"}
                    fontSize={14}
                    align="left"
                    sx={{ pt: 1, pb: 2 }}
                  >
                    <Skeleton variant="text" width={"80%"} height={25} />
                  </Typography>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    alignItems={"left"}
                    fontSize={16}
                    color={"#fff"}
                  >
                    <Skeleton variant="text" width={"80%"} height={25} />
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                  <Typography
                    component="p"
                    variant="p"
                    color={"#6DCCDD"}
                    fontSize={14}
                    align="left"
                    sx={{ pt: 1, pb: 2, pl: 2 }}
                  >
                    <Skeleton variant="text" width={"80%"} height={25} />
                  </Typography>
                  <Box sx={{ display: "flex", pl: 2 }}>
                    <Skeleton
                      variant="rounded"
                      width={30}
                      height={30}
                      sx={{ mr: 1 }}
                    />
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      alignItems={"left"}
                    >
                      <Skeleton variant="text" width={"70px"} height={25} />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Grid container direction="row" rowSpacing={1} spacing={0}>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={4}
                  align="center"
                  alignItems="center"
                >
                  <Typography
                    className={styles.summaryCardLabel} // TR 01
                    component="p"
                    variant="p"
                    color={"#6DCCDD"}
                    fontSize={14}
                    align="left"
                    sx={{ pt: 1, pb: 2 }}
                  >
                    <Skeleton variant="text" width={"80%"} height={25} />
                  </Typography>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    alignItems={"left"}
                  >
                    <Skeleton variant="text" width={"80%"} height={25} />
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={4}
                  align="center"
                  alignItems="center"
                >
                  <Typography
                    className={styles.summaryCardLabel} // TR 01
                    component="p"
                    variant="p"
                    color={"#6DCCDD"}
                    fontSize={14}
                    align="left"
                    sx={{ pt: 1, pb: 2 }}
                  >
                    <Skeleton variant="text" width={"80%"} height={25} />
                  </Typography>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    alignItems={"left"}
                  >
                    <Skeleton variant="text" width={"80%"} height={25} />
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                  align="center"
                  alignItems="center"
                >
                  <Skeleton
                    variant="rounded"
                    width={"80%"}
                    height={45}
                    sx={{ mt: 2 }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
      {/* END Fixed Footer Skeleton Here */}
    </SurfaceLayout>
  );
}

export default Cinstance;
