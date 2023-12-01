import { getApi } from "../../../../services/java";

export default async function myactivity(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "getAllmyactivityInfo":
      await getAllmyactivityInfo(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function getAllmyactivityInfo(req, res) {
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
      "&eventtype=" +
      data.eventType +
      "&ipaddress=" +
      data.ipaddress;
    const rdata = await getApi(
      "event/getallevents?tenantid=" + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
