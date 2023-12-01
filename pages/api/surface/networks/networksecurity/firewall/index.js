import { postApi, getApi, putApi, deleteApi } from "../../../../services/java";

export default async function list(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "addFirewall":
      await addFirewall(req, res);
      break;
    case "getFirfallFormData":
      await getFirfallFormData(req, res);
      break;

    case "getAllFirewalls":
      await getAllFirewalls(req, res);
      break;

    case "getParticularData":
      await getParticularData(req, res);
      break;
    case "updatefirewall":
      await updatefirewall(req, res);
      break;
    case "deleteFIrewall":
      await deleteFIrewall(req, res);
      break;
    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function addFirewall(req, res) {
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
      "firewall/addfirewall?tenantid=" + formedURI,
      data.data,
      token
    );

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getFirfallFormData(req, res) {
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
      "firewall/getinitadd?tenantid=" + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllFirewalls(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    // const clientIP = req.socket.remoteAddress;
    const searchKeys = data.search ? "&search=" + data.search : "";
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
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

    const rdata = await getApi(
      "firewall/getallfirewalls?tenantid=" + formedURI + tableFormedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getParticularData(req, res) {
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
      "firewall/getfirewall/" + data.firewallId + "?tenantid=" + formedURI,
      token
    ); // call your api function
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updatefirewall(req, res) {
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
      "firewall/updatefirewall?tenantid=" + formedURI,
      data.data,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteFIrewall(req, res) {
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
      "firewall/deletefirewall/" + data.firewallId + "?tenantid=" + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
