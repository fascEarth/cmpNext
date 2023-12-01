import { getApi, postApi, deleteApi, putApi } from "../../../../services/java";

export default async function publicnat(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "getallnatrules":
      await getallnatrules(req, res);
      break;
    case "addnatrule":
      await addnatrule(req, res);
      break;
    case "deletenatrule":
      await deletenatrule(req, res);
      break;
    case "getinitadd":
      await getinitadd(req, res);
      break;
    case "updatenatrule":
      await updatenatrule(req, res);
      break;
    case "getnatrule":
      await getnatrule(req, res);
      break;
    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function getallnatrules(req, res) {
  try {
    const { data, token } = req.body;
    console.log(data, "API"); // get data from request body
    const searchKeys = data.search ? "&search=" + data.search : "";
    // const clientIP = req.socket.remoteAddress;
    const tableFormedURI =
      "&start=" +
      data.start +
      "&length=" +
      data.length +
      searchKeys +
      "&order=" +
      data.sortColumn +
      "&orderBY=" +
      data.sortDirection;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
    const rdata = await getApi(
      "natrule/getallnatrules?tenantid=" + formedURI + tableFormedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getinitadd(req, res) {
  try {
    const { data, token } = req.body;
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
    const rdata = await getApi(
      "natrule/getinitadd/" + "?tenantid=" + formedURI,
      token
    ); // call your api function
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function addnatrule(req, res) {
  try {
    const { data, token } = req.body;
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
    const rdata = await postApi(
      "natrule/addnatrule?tenantid=" + formedURI,
      data.data,
      token
    );
    res.status(200).json(rdata);
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function deletenatrule(req, res) {
  try {
    const { data, token } = req.body;
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
    const rdata = await deleteApi(
      "natrule/deletenatrule/" + data.natRuleId + "?tenantid=" + formedURI,
      token
    ); // call your api function
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function getnatrule(req, res) {
  try {
    const { data, token } = req.body;
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
    const rdata = await getApi(
      "natrule/getnatrule/" + data.natRuleId + "?tenantid=" + formedURI,
      token
    ); // call your api function
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function updatenatrule(req, res) {
  try {
    const { data, token } = req.body;
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
    const rdata = await putApi(
      "natrule/updatenatrule?tenantid=" + formedURI,
      data.data,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
