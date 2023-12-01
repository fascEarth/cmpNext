import { FunctionVariant } from "mdi-material-ui";
import { deleteApi, getApi, putApi, postApi } from "../../../services/java";

export default async function publicips(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "getParticularOrderItems":
      await getParticularOrderItems(req, res);
      break;
    case "addpublicips":
      await addpublicips(req, res);
      break;
    case "getpublicipsinitialItems":
      await getpublicipsinitialItems(req, res);
      break;
    case "getAllPublicIpInfo":
      await getAllPublicIpInfo(req, res);
      break;
    case "getpublicipsStatus":
      await getpublicipsStatus(req, res);
      break;

    case "deletePublicIps":
      await deletePublicIps(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function addpublicips(req, res) {
  try {
    const { data, token } = req.body;
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
    if (data.type === "edit") {
      const iformedURI =
        formedURI +
        "&orderipid=" +
        data.data.orderIPId +
        "&maporderipid=" +
        data.data.mapOrderIPId;
      const rdata = await putApi(
        "orderip/updateorderip?tenantid=" + iformedURI,
        data.data,
        token
      );
      console.log(data.data);
      console.log("orderip/updateorderip?tenantid=" + iformedURI);
      res.status(200).json(rdata);
    } else {
      const rdata = await postApi(
        "orderip/addorderip?tenantid=" + formedURI,
        data.data
      );
      res.status(200).json(rdata);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deletePublicIps(req, res) {
  try {
    const { data, token } = req.body;
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress +
      "&orderipid=" +
      data.orderIPId +
      "&maporderipid=" +
      data.mapOrderIPId;
    const rdata = await deleteApi(
      "orderip/deleteorderip?tenantid=" + formedURI,
      token
    ); // call your api function
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getParticularOrderItems(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    // const clientIP = req.socket.remoteAddress;

    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress +
      "&orderipid=" +
      data.orderId +
      "&maporderipid=" +
      data.orderMapId;

    const rdata = await getApi(
      "orderip/getorderip?tenantid=" + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getpublicipsStatus(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    // const clientIP = req.socket.remoteAddress;

    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await getApi(
      "orderip/getcurrentipallocation?tenantid=" + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getAllPublicIpInfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    // const clientIP = req.socket.remoteAddress;
    const searchKeys = data.search ? "&search=" + data.search : "";

    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress +
      "&order=" +
      data.sortColumn +
      "&orderBY=" +
      data.sortDirection +
      "&start=" +
      data.start +
      "&length=" +
      data.length +
      searchKeys;

    // const iformedURI =
    //   formedURI + "&search=" + data.search + "&filtervalue=" + data.filtervalue;
    // console.log(iformedURI);
    // const rdata = await getApi(
    //   "orderip/getallorderips?tenantid=" + iformedURI,
    //   token
    // );
    // res.status(200).json(rdata);

    if (data.search) {
      const iformedURI =
        formedURI +
        "&search=" +
        data.search +
        "&filtervalue=" +
        data.filtervalue;
      const rdata = await getApi(
        "orderip/getallorderips?tenantid=" + iformedURI,
        token
      );
      res.status(200).json(rdata);
    } else if (data.filtervalue) {
      const iformedURI =
        formedURI +
        "&search=" +
        data.search +
        "&filtersvalue=" +
        data.filtervalue;
      const rdata = await getApi(
        "orderip/getallorderips?tenantid=" + iformedURI,
        token
      );

      res.status(200).json(rdata);
    } else {
      const rdata = await getApi(
        "orderip/getallorderips?tenantid=" + formedURI,
        token
      ); // call your api function

      res.status(200).json(rdata);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getpublicipsinitialItems(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    // const clientIP = req.socket.remoteAddress;

    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await getApi(
      "orderip/getinitadd?tenantid=" + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
