
import { postApi,getApi,postApiPayments } from "../../../../services/java";
import { postPyApi,getPyApi } from "../../../../services/python";

export default async function create(req, res) {

  const { endPoint } = req.body;
  
  switch (endPoint) {  
    case 'getcinsAll':
      await getcinsAll(req, res);
      break;  
    
     
    default:
      res.status(404).json({ message: 'Endpoint Not Found' });
      break;
  }


    
  }

  async function getcinsAll(req, res){
   
    try {
        
      const { tenantId } = req.body; // get data from request body
      // Get client's IP address
      const { userSerialId } = req.body;
      const clientIP = req.socket.remoteAddress;

      const { data } = req.body;
      let formedReqs = "";
      if(data.platformid){
        formedReqs += "&platformid="+data.platformid;
      }
      if(data.datacenterid){
        formedReqs += "&datacenterid="+data.datacenterid;
      }

      
      const formedURI = tenantId+"&userserialid="+userSerialId+"&ipaddress="+clientIP+""+formedReqs;
      
      const rdata = await getApi('vms/getinitadd?tenantid='+formedURI); // call your api function
      //console.log(counter);
      //console.log(rdata);
      res.status(200).json(rdata);
      
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }

  }


  async function tokenCall(data,res, counter){
    
    
    if (counter === 0) {
      res.status(200).json({ message: 'Maximum retries exceeded' });
      return;
    }

    const status = await postPyApi("get_tk_status", data); // call get_tk_status api
        
        
       if (status.status_code == "415") {
          setTimeout(() => {
          
          tokenCall(data,res, counter - 1);
          },3000);
        }else {
          res.status(200).json(status); // return response to client
        }
  }
  

  