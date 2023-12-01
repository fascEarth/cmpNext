import {
  getApi,
  putApi,
  postApi,
  deleteApi,
  postApiPayments,
} from "../../../../../services/java";
import { postPyApiAuth } from "../../../../../services/python";
export default async function detail(req, res) {
  const { endPoint } = req.body;

  switch (endPoint) {
    case "processsnapshots":
      await processsnapshots(req, res);
      break;
    case "getallsnapshots":
      await getallsnapshots(req, res);
      break;
    case "deleteNicnw":
      await deleteNicnw(req, res);
      break;
    case "getUpdatedataInfoNIC":
      await getUpdatedataInfoNIC(req, res);
      break;
    case "getAdddataInfoNIC":
      await getAdddataInfoNIC(req, res);
      break;
    case "getParticularDataNIC":
      await getParticularDataNIC(req, res);
      break;
    case "getallselectInfo":
      await getallselectInfo(req, res);
      break;
    case "getNetworkListData":
      await getNetworkListData(req, res);
      break;
    case "getCommonSelectInfo":
      await getCommonSelectInfo(req, res);
      break;

    case "getConnTicket":
      await getConnTicket(req, res);
      break;
    case "getDefaultInfo":
      await getDefaultInfo(req, res);
      break;

    case "getOverviewCpuMemInfo":
      await getOverviewCpuMemInfo(req, res);
      break;

    case "getoverviewstorageused":
      await getoverviewstorageused(req, res);
      break;

    case "getoverviewavgdisk":
      await getoverviewavgdisk(req, res);
      break;

    case "getAllUsagegraphs":
      await getAllUsagegraphs(req, res);
      break;

    case "getStoragesInfo":
      await getStoragesInfo(req, res);
      break;
    case "updateStoragesInfo":
      await updateStoragesInfo(req, res);
      break;

    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function processsnapshots(req, res) {
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
      "vms/setvmaction/" + data.slugId + "?tenantid=" + formedURI,
      data.data,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getallsnapshots(req, res) {
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
      "vms/getvmsnapshot/" + data.slugId + "?tenantid=" + formedURI,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteNicnw(req, res) {
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
      "network/deletenetworknic/" + data.nicid + "?tenantid=" + formedURI,
      token
    ); // call your api function
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function getUpdatedataInfoNIC(req, res) {
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
      "network/updatenetworknic?tenantid=" + formedURI,
      data.data,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function getAdddataInfoNIC(req, res) {
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
      "network/addnetworknic?tenantid=" + formedURI,
      data.data,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getParticularDataNIC(req, res) {
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
      "network/getnetworknic/" + data.slugId + "?tenantid=" + formedURI,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function getallselectInfo(req, res) {
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
      "network/getinitaddvmnic/" + data.slugId + "?tenantid=" + formedURI,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getNetworkListData(req, res) {
  try {
    const { data, token } = req.body;
    // const clientIP = req.socket.remoteAddress;
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
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress +
      tableFormedURI;
    const rdata = await getApi(
      "network/getallnicbyvmid/" + data.slugId + "?tenantid=" + formedURI,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getCommonSelectInfo(req, res) {
  try {
    const { data, token } = req.body;
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress +
      "&length=0";
    const rdata = await getApi(
      "vms/getvmtenantid/" + data.tenantId + "?tenantid=" + formedURI,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getConnTicket(req, res) {
  try {
    const { data, token } = req.body;
    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;
    const rdata = await postPyApiAuth(
      "internal/get_console_id?tenantid=" + formedURI,
      data.data,
      token
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAllUsagegraphs(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      "&tenantid=" +
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await getApi(
      "graph/" +
        data.endPoint +
        "/" +
        data.tenantvmid +
        "?filtertime=" +
        data.filterTime +
        formedURI,
      token
    );

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getDefaultInfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    // const clientIP = req.socket.remoteAddress;
    const formedURI =
      "?tenantid=" +
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress +
      "&length=0";
    console.log(token);
    const rdata = await getApi(
      "vms/getvmdetailsid/" + data.tenantvmid + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getOverviewCpuMemInfo(req, res) {
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
      "graph/getoverviewcpumemory/" + data.tenantvmid + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getoverviewstorageused(req, res) {
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
      "graph/getoverviewstorageused/" + data.tenantvmid + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getoverviewavgdisk(req, res) {
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
      "graph/getoverviewavgdisk/" + data.tenantvmid + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getStoragesInfo(req, res) {
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
      "vms/getvmstorages/" + data.tenantvmid + formedURI,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateStoragesInfo(req, res) {
  try {
    const { data, token } = req.body; // get data from request body

    // const clientIP = req.socket.remoteAddress;
    const pdata = data.dataStoragesInfo;
    const formedURI =
      "?tenantid=" +
      data.tenantId +
      "&userserialid=" +
      data.userSerialId +
      "&ipaddress=" +
      data.ipaddress;

    const rdata = await putApi(
      "vms/setvmstorages/" + data.tenantvmid + formedURI,
      pdata,
      token
    ); // call your api function

    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
