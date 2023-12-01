import { getApi, putApi } from "../../../../../services/java";

export default async function list(req, res) {

  const { endPoint } = req.body;
  
  switch (endPoint) {    
    case 'getStaticIPPool':
      await getStaticIPPool(req, res);
      break;
      case 'staticIpPoolUpdate':
      await staticIpPoolUpdate(req, res);
      break;
      
    default:
      res.status(404).json({ message: 'Endpoint Not Found' });
      break;
  }


    
  }

 
  async function getStaticIPPool(req, res){

    try {
        
        const { data,token } = req.body; // get data from request body
        const clientIP = req.socket.remoteAddress;
        
        const formedURI = data.tenantId+"&userserialid="+data.userSerialId+"&ipaddress="+data.ipaddress;
        
        const rdata = await getApi(`network/getnetworkstaticippool/${data.slugId}?tenantid=`+formedURI,token); // call your api function
        
        res.status(200).json(rdata);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }

  }

  async function staticIpPoolUpdate(req, res){
    try{
      const { data,token } = req.body;
      const clientIP = req.socket.remoteAddress;
      const formedURI = data.tenantId+"&userserialid="+data.userSerialId+"&ipaddress="+data.ipaddress;
      const rdata = await putApi(`network/updatenetworkstaticippool?tenantid=`+formedURI,data.data,token); // call your api function
      res.status(200).json(rdata);

    } catch (error){
      console.error(error);
      res.status(500).json({message:'Internal Server Error'})
    }
  }
 
  

  