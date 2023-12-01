import { getApi, postApiPayments } from "../../../services/java";

export default async function invoice(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "getpmethodsinfo":
      await getpmethodsinfo(req, res);
      break;
    case "addNewBillingCard":
      await addNewBillingCard(req, res);
      break;
    case "getInvoiceEstimate":
      await getInvoiceEstimate(req, res);
      break;
    case "getAllinvoiceInfo":
      await getAllinvoiceInfo(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function getpmethodsinfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    const formedURI =
      data.cardId +
      "?tenantid=" +
      data.tenantId +
      "&userserialid=" +
      data.userSerialId;

    const rdata = await getApi("payments/payinvoicestatus/" + formedURI, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function addNewBillingCard(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    // const clientIP = req.headers.host;

    data.paymentDomain = data.ipaddress;

    const rdata = await postApiPayments(
      "payments/payinvoice",
      JSON.stringify(data),
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getAllinvoiceInfo(req, res) {
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

    const rdata = await getApi(
      "invoice/getallinvoices/?tenantid=" + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getInvoiceEstimate(req, res) {
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
      "invoice/getinvoiceestimate?tenantid=" + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
