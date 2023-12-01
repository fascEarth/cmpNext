import { postApi, getApi, deleteApi, putApi } from "../../../../services/java";

export default async function tags(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "getOrganizationInfo":
      await getOrganizationInfo(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function getOrganizationInfo(req, res) {
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
      `organization/getorganizationbytenant/${data.tenantId}?tenantId=` +
        formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
