import { postPyApi } from "../../services/python";
import { Buffer } from "buffer";
export default async function login(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "loginUser":
      await loginUser(req, res);
      break;
    case "emailverifyuser":
      await emailverifyuser(req, res);
      break;
    case "sendCodeToUser":
      await sendCodeToUser(req, res);
      break;
    case "tftsendCodeToUser":
      await tftsendCodeToUser(req, res);
      break;
    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function tftsendCodeToUser(req, res) {
  try {
    const { data } = req.body; // get data from request body

    const rdata = await postPyApi(
      "internal/email_sms_code",
      JSON.stringify(data)
    ); // call your api function

    const { status_code } = rdata; // get task_uid from response data

    if (status_code == "200") {
      res.status(200).json({ data: rdata }); // return response to client
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function sendCodeToUser(req, res) {
  try {
    const { data } = req.body; // get data from request body

    const rdata = await postPyApi("signup/resend_token", JSON.stringify(data)); // call your api function

    const { status_code } = rdata; // get task_uid from response data

    if (status_code == "200") {
      res.status(200).json(rdata); // return response to client
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function emailverifyuser(req, res) {
  try {
    const { data } = req.body; // get data from request body

    const rdata = await postPyApi("signup/verify_token", JSON.stringify(data)); // call your api function

    const { status_code, task_uid } = rdata; // get task_uid from response data

    if (status_code == "200") {
      const statusData = { task_uuid: task_uid };
      const pstatusData = JSON.stringify(statusData);
      await tokenCall(pstatusData, res, 5);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { data } = req.body; // get data from request body
    const clientIP = req.socket.remoteAddress;
    //data.ipAddress = clientIP;
    console.log(data);
    const encryptedPassword = Buffer.from(data.password, "base64").toString(
      "utf-8"
    );
    data.password = encryptedPassword;
    //console.log(data);
    const rdata = await postPyApi("login", JSON.stringify(data)); // call your api function

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

async function tokenCall(data, res, counter) {
  if (counter === 0) {
    res.status(200).json({ message: "Error Occurred, contact administrator" });
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
