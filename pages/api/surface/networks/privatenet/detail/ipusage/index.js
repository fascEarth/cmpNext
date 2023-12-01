import { getApi } from "../../../../../services/java";

export default async function list(req, res) {

  const { endPoint } = req.body;
  
  switch (endPoint) {    
    case 'getIPUsage':
      await getIPUsage(req, res);
      break;
    default:
      res.status(404).json({ message: 'Endpoint Not Found' });
      break;
  }


    
  }

 
  async function getIPUsage(req, res){

    try {
        
        const { data,token } = req.body; // get data from request body
        const searchKeys = (data.search?"&search="+data.search:'');
        const tableFormedURI = "&start="+data.start+"&length="+data.length+searchKeys;
        const clientIP = req.socket.remoteAddress;
        const formedURI = data.tenantId+"&userserialid="+data.userSerialId+tableFormedURI+"&ipaddress="+data.ipaddress;
        
        const rdata = await getApi(`network/getnetworkipusage/${data.slugId}?tenantid=`+formedURI,token); // call your api function
        
        res.status(200).json(rdata);        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }

  }
 
  

  