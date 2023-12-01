import { postApi, getApi, deleteApi } from "../../../../../services/java";

export default async function list(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "getallvmsInfo":
      await getallvmsInfo(req, res);
      break;

    case "updatevminfo":
      await updatevminfo(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function updatevminfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      "tenantid=" +
      data.tenantid +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
    const pdata = {
      action: data.action,
      options: "",
    };

    /*if(data.action == "delete"){
      
        const rdata = await deleteApi('vms/deletevm/'+data.tenantvmid+"?"+formedURI,token); // call your api function
      
        res.status(200).json(rdata);
      }else{*/
    const rdata = await postApi(
      "vms/setvmaction/" + data.tenantvmid + "?" + formedURI,
      pdata,
      token
    ); // call your api function

    res.status(200).json(rdata);
    //}
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getallvmsInfo(req, res) {
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
    const formedURI =
      data.tenantId + "?userserialid=" + data.userSerialId + tableFormedURI;

    const rdata = await getApi("vms/getvmtenantid/" + formedURI, token); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
