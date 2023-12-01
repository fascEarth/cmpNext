import { getApi, putApi } from "../../../services/java";

export default async function list(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "getalliblInfo":
      await getalliblInfo(req, res);
      break;

    case "updateiblInfo":
      await updateiblInfo(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function updateiblInfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    // const clientIP = req.socket.remoteAddress;

    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await putApi(
      "bandwidth/setbandwidth?tenantid=" + formedURI,
      data.band,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getalliblInfo(req, res) {
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
      "bandwidth/getallbandwidth?tenantid=" + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
