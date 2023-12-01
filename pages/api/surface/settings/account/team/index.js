import { deleteApi, getApi, postApi, putApi } from "../../../../services/java";

export default async function team(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "getAllteamInfo":
      await getAllteamInfo(req, res);
      break;

    case "getallusercategoryInfo":
      await getallusercategoryInfo(req, res);
      break;
    case "getAdddataInfo":
      await getAdddataInfo(req, res);
      break;

    case "getUpdatedataInfo":
      await getUpdatedataInfo(req, res);
      break;

    case "getParticularData":
      await getParticularData(req, res);
      break;

    case "deleteUser":
      await deleteUser(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function deleteUser(req, res) {
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
      "team/deleteteam/" + data.userid + "?tenantid=" + formedURI,
      token
    ); // call your api function
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
      "team/getteam/" + data.userid + "?tenantid=" + formedURI,
      token
    ); // call your api function
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getUpdatedataInfo(req, res) {
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
      "team/updateteam?tenantid=" + formedURI,
      data.data,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAdddataInfo(req, res) {
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
      "team/addteam?tenantid=" + formedURI,
      data.data,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getallusercategoryInfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
    const rdata = await getApi("team/getinitadd?tenantid=" + formedURI, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllteamInfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    const searchKeys = data.search ? "&search=" + data.search : "";
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
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      tableFormedURI +
      "&ipaddress=" +
      data.ipaddress;
    const rdata = await getApi("team/getallteams?tenantid=" + formedURI, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
