import { postPyApi, getPyApi } from "../services/python";
import { postApi, getApi, postApiPayments } from "../services/java";

export default async function signup(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "reqprofinalProvisioning":
      await reqprofinalProvisioning(req, res);
      break;
    case "finalProvisioning":
      await finalProvisioning(req, res);
      break;
    case "getallpmethodsinfo":
      await getallpmethodsinfo(req, res);
      break;
    case "getpmethodsinfo":
      await getpmethodsinfo(req, res);
      break;
    case "addpmethodsinfo":
      await addpmethodsinfo(req, res);
      break;
    case "addpoiinfo":
      await addpoiinfo(req, res);
      break;
    case "updatepoiinfo":
      await updatepoiinfo(req, res);
      break;
    case "fetchpoiinfo":
      await fetchpoiinfo(req, res);
      break;
    case "resendUserToken":
      await resendUserToken(req, res);
      break;
    case "verifyUserToken":
      await verifyUserToken(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function reqprofinalProvisioning(req, res) {
  try {
    const { tenantId, token, ipaddress } = req.body; // get data from request body
    // Get client's IP address
    const { userSerialId } = req.body;
    // const clientIP = req.socket.remoteAddress;

    const formedURI =
      tenantId +
      "?tenantid=" +
      tenantId +
      "&userserialid=" +
      userSerialId +
      "&ipaddress=" +
      ipaddress;

    const rdata = await getApi("tenant/settenantactive/" + formedURI, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function finalProvisioning(req, res) {
  try {
    const { tenantId, token, ipaddress } = req.body; // get data from request body
    // Get client's IP address
    const { userSerialId } = req.body;
    // const clientIP = req.socket.remoteAddress;

    const formedURI =
      tenantId + "?userserialid=" + userSerialId + "&ipaddress=" + ipaddress;

    const rdata = await getApi("tenant/gettenantstatus/" + formedURI, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/*
   async function finalProvisioning(req, res){
   
    try {
        
      const { tenantId } = req.body; // get data from request body
      // Get client's IP address
      const { userSerialId } = req.body;
      const clientIP = req.socket.remoteAddress;
      
      const formedURI = tenantId+"?userserialid="+userSerialId+"&ipaddress="+clientIP;
      
      const rdata = await getApi('tenant/gettenantactivestatus/'+formedURI); // call your api function
      
      res.status(200).json(rdata);
      
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }

  }
  */

async function getallpmethodsinfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    // Get client's IP address
    // const clientIP = req.socket.remoteAddress;

    const formedURI =
      data.tenantId +
      "?userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await getApi("payments/getallcards/" + formedURI, token); // call your api function

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
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await getApi("payments/status/" + formedURI, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function addpmethodsinfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    const clientIP = req.headers.host;

    data.paymentDomain = clientIP;

    const rdata = await postApiPayments(
      "payments",
      JSON.stringify(data),
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function addpoiinfo(req, res) {
  try {
    const { data } = req.body; // get data from request body

    const rdata = await postPyApi("signup/billing_info", JSON.stringify(data)); // call your api function

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

async function updatepoiinfo(req, res) {
  try {
    const { data } = req.body; // get data from request body

    const rdata = await postPyApi(
      "signup/update_billing_info",
      JSON.stringify(data)
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

async function fetchpoiinfo(req, res) {
  try {
    const { data } = req.body; // get data from request body

    const rdata = await postPyApi(
      "signup/get_billing_info",
      JSON.stringify(data)
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
async function verifyUserToken(req, res) {
  try {
    const { data } = req.body; // get data from request body

    const rdata = await postPyApi("signup/verify_token", JSON.stringify(data)); // call your api function

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

async function resendUserToken(req, res) {
  try {
    const { data } = req.body; // get data from request body

    const rdata = await postPyApi("signup/resend_token", JSON.stringify(data)); // call your api function

    const { status_code, task_uid } = rdata; // get task_uid from response data

    if (status_code == "200") {
      const statusData = { task_uuid: task_uid };
      const pstatusData = JSON.stringify(statusData);
      const status = await postPyApi("get_tk_status", pstatusData); // call get_tk_status api
      res.status(200).json(status);
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
