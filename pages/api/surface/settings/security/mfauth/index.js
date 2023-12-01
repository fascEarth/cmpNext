import { deleteApi, getApi, postApi, putApi } from "../../../../services/java";
import { postPyApi, getPyApi } from "../../../../services/python";
export default async function mfauth(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "sendSMSmfa":
      await sendSMSmfa(req, res);
      break;

    case "applyotpmfa":
      await applyotpmfa(req, res);
      break;
    case "disableMfa":
      await disableMfa(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function disableMfa(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.userSerialId +
      "?userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
    const rdata = await getApi("user/mfadisable/" + formedURI, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function applyotpmfa(req, res) {
  try {
    const { data } = req.body; // get data from request body

    const rdata = await postPyApi(
      "signup/verify_token",
      JSON.stringify(data.data)
    ); // call your api function

    const { status_code, task_uid } = rdata; // get task_uid from response data

    if (status_code == "200") {
      const statusData = { task_uuid: task_uid };
      const pstatusData = JSON.stringify(statusData);
      await tokenCall(pstatusData, res, 5);
    } else {
      res.status(200).json(rdata);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function sendSMSmfa(req, res) {
  try {
    const { data } = req.body; // get data from request body

    const rdata = await postPyApi(
      "signup/resend_token",
      JSON.stringify(data.data)
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function tokenCall(data, res, counter) {
  if (counter === 0) {
    res.status(200).json({ message: "Maximum retries exceeded" });
    return;
  }

  const status = await postPyApi("get_tk_status", data); // call get_tk_status api

  if (status.status_code == "415") {
    setTimeout(() => {
      tokenCall(data, res, counter - 1);
    }, 3000);
  } else {
    res.status(200).json(status); // return response to client
  }
}
