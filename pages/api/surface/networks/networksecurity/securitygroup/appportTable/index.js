import {
  getApi,
  postApi,
  deleteApi,
  putApi,
} from "../../../../../services/java";
export default async function publicips(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "getallapplications":
      await getallapplications(req, res);
      break;
    case "getapplication":
      await getapplication(req, res);
      break;
    case "getinitadd":
      await getinitadd(req, res);
      break;
    case "addapplication":
      await addapplication(req, res);
      break;
    case "updateapplication":
      await updateapplication(req, res);
      break;
    case "deleteapplication":
      await deleteapplication(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function getallapplications(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
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
      "application/getallapplications?tenantid=" + formedURI + tableFormedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getapplication(req, res) {
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
      "application/getapplication/" +
        data.applicationId +
        "?tenantid=" +
        formedURI,
      token
    ); // call your api function
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function getinitadd(req, res) {
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
      "application/getinitadd/?tenantid=" + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function addapplication(req, res) {
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
      "application/addapplication?tenantid=" + formedURI,
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
async function deleteapplication(req, res) {
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
      "application/deleteapplication/" +
        data.applicationId +
        "?tenantid=" +
        formedURI,
      token
    ); // call your api function
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateapplication(req, res) {
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
      "application/updateapplication?tenantid=" + formedURI,
      data.data,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
