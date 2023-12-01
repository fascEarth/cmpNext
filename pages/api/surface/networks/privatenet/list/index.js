import { getApi,postApi,deleteApi } from "../../../../services/java";

export default async function list(req, res) {

  const { endPoint } = req.body;
  
  switch (endPoint) {

    case 'getAllNetworksFromDetail':
      await getAllNetworksFromDetail(req, res);
      break;
    case 'deleteprivatenetwork':
      await deleteprivatenetwork(req, res);
      break;   
    case 'addNewNetwork':
      await addNewNetwork(req,res);
      break; 
    case 'getallpnlInfo':
      await getallpnlInfo(req, res);
      break;

      case 'getallpnladdtionalInfo':
        await getallpnladdtionalInfo(req, res);
        break;
     
    default:
      res.status(404).json({ message: 'Endpoint Not Found' });
      break;
  }


    
  }

  async function deleteprivatenetwork(req, res){
    try {
      const { data,token } = req.body;
      const clientIP = req.socket.remoteAddress;
      const formedURI = data.tenantId+"&userserialid="+data.userSerialId+"&ipaddress="+data.ipaddress;
      const rdata = await deleteApi('network/deletenetwork/'+data.networkid+'?tenantid='+formedURI,token); // call your api function
      
      res.status(200).json(rdata);
    } catch(error){
      console.error(error);
      res.status(500).json({message:'Internal Server Error'})
    }
  }
  async function addNewNetwork(req,res){
    try{
      const { data,token } = req.body;
      const clientIP = req.socket.remoteAddress;
      const formedURI = data.tenantId+"&userserialid="+data.userSerialId+"&ipaddress="+data.ipaddress;
      const rdata = await postApi('network/addnetwork?tenantid='+formedURI,data.data,token);
      
      res.status(200).json(rdata);
      
    } catch (error){
      console.error(error);
      res.status(500).json({message:'Internal Server Error'})
    }
   }
   
   async function getAllNetworksFromDetail(req, res){

    try {
        
        const { data,token } = req.body; // get data from request body
        const clientIP = req.socket.remoteAddress;
        
        const formedURI = data.tenantId+"&userserialid="+data.userSerialId+"&ipaddress="+data.ipaddress;
        
        const rdata = await getApi('network/getallnetworks?tenantid='+formedURI,token); // call your api function
        
        res.status(200).json(rdata);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }

  }

  async function getallpnladdtionalInfo(req, res){

    try {
        
        const { data,token } = req.body; // get data from request body
        const clientIP = req.socket.remoteAddress;
        
        const formedURI = data.tenantId+"&userserialid="+data.userSerialId+"&ipaddress="+data.ipaddress;
        
        const rdata = await getApi('network/getinitadd?tenantid='+formedURI,token); // call your api function
        
        res.status(200).json(rdata);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }

  }

  async function getallpnlInfo(req, res){
    try {
        
      const { data,token } = req.body; // get data from request body
      const clientIP = req.socket.remoteAddress;
      const searchKeys = (data.search?"&search="+data.search:'');
      const tableFormedURI = "&start="+data.start+"&length="+data.length+searchKeys +
      "&order=" +
      data.sortColumn +
      "&orderBY=" +
      data.sortDirection;
      const formedURI = data.tenantId+"&userserialid="+data.userSerialId+"&ipaddress="+data.ipaddress+tableFormedURI;
      
      const rdata = await getApi('network/getallnetworks?tenantid='+formedURI,token); // call your api function
      
      res.status(200).json(rdata);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


 
  

  