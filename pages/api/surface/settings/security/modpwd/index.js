import { deleteApi, getApi, postApi, putApi } from "../../../../services/java";

export default async function modpwd(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "updateSecurityPwd":
      await updateSecurityPwd(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function updateSecurityPwd(req, res) {
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
      "user/updateuserpassword?tenantid=" + formedURI,
      data.data,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
