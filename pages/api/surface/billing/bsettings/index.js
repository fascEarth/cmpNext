import {
  getApi,
  putApiwH,
  postApiPayments,
  deleteApi,
  putApi,
} from "../../../services/java";

export default async function bsettings(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "updateBillingContact":
      await updateBillingContact(req, res);
      break;
    case "getallbillAddrInfo":
      await getallbillAddrInfo(req, res);
      break;

    case "getallbillContInfo":
      await getallbillContInfo(req, res);
      break;

    case "getallbillCardsInfo":
      await getallbillCardsInfo(req, res);
      break;

    case "addNewBillingCard":
      await addNewBillingCard(req, res);
      break;

    case "getpmethodsinfo":
      await getpmethodsinfo(req, res);
      break;

    case "updateActiveBillingCard":
      await updateActiveBillingCard(req, res);
      break;

    case "deleteActiveBillingCard":
      await deleteActiveBillingCard(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function deleteActiveBillingCard(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    const formedURI =
      "?tenantid=" + data.tenantId + "&userserialid=" + data.userSerialId;

    const rdata = await deleteApi(
      "payments/deletecart/" + data.cardId + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function updateActiveBillingCard(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    const formedURI = data.tenantId + "?userserialid=" + data.userSerialId;

    const rdata = await putApiwH(
      "payments/activecart/" + formedURI,
      data.cardId,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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

    const rdata = await getApi("payments/status/" + formedURI); // call your api function

    res.status(200).json(rdata, token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function addNewBillingCard(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    const clientIP = req.headers.host;

    data.paymentDomain = clientIP;

    const rdata = await postApiPayments("payments", JSON.stringify(data)); // call your api function

    res.status(200).json(rdata, token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getallbillCardsInfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "?userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await getApi("payments/getallcards/" + formedURI); // call your api function

    res.status(200).json(rdata, token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getallbillContInfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "?userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await getApi("billing/getbillingcontact/" + formedURI, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getallbillAddrInfo(req, res) {
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

    const rdata = await getApi(
      "billing/getbilling/" + data.userSerialId + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateBillingContact(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "?userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await putApi(
      "billing/updatebillingcontact?tenantid" + formedURI,
      data.data,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
