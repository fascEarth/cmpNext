import { getApi, postApi } from "../../../../services/java";
import { postPyApi } from "../../../../services/python";

export default async function create(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "getsshkeys":
      await getsshkeys(req, res);
      break;
    case "getcinsAll":
      await getcinsAll(req, res);
      break;
    case "getTeamByNetworks":
      await getTeamByNetworks(req, res);
      break;
    case "finalSbtCinstance":
      await finalSbtCinstance(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function finalSbtCinstance(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      "?tenantid=" +
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await postApi("vms/addvm" + formedURI, data.data, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getsshkeys(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      "?tenantid=" +
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await getApi("sshkey/getallsshkeys" + formedURI, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getTeamByNetworks(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      "/" +
      data.teamId +
      "?tenantid=" +
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await getApi(
      "vms/getinitaddnetworkbyteam" + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getcinsAll(req, res) {
  try {
    const { tenantId } = req.body; // get data from request body
    // Get client's IP address
    const { userSerialId } = req.body;
    const clientIP = req.socket.remoteAddress;

    const { data, token, ipaddress } = req.body;
    let formedReqs = "";
    if (data.platformid) {
      formedReqs += "&platformid=" + data.platformid;
    }
    if (data.datacenterid) {
      formedReqs += "&datacenterid=" + data.datacenterid;
    }
    if (data.sizingpolicyid) {
      formedReqs += "&sizingpolicyid=" + data.sizingpolicyid;
    }

    const formedURI =
      tenantId +
      "&userserialid=" +
      userSerialId +
      "&ipaddress=" +
      ipaddress +
      "" +
      formedReqs;

    const rdata = await getApi("vms/getinitadd?tenantid=" + formedURI, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
