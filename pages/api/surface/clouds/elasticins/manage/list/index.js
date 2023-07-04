import { postApi, getApi } from "../../../../../services/java";

export default async function list(req, res) {

  const { endPoint } = req.body;
  
  switch (endPoint) {    
    case 'getallvmsInfo':
      await getallvmsInfo(req, res);
      break;
   
     
    default:
      res.status(404).json({ message: 'Endpoint Not Found' });
      break;
  }


    
  }

 
  

  async function getallvmsInfo(req, res){
    try {
        
      const { data } = req.body; // get data from request body
      const searchKeys = (data.search?"&search="+data.search:'');
      const tableFormedURI = "&start="+data.start+"&length="+data.length+searchKeys;
      const formedURI = data.tenantId+"?userserialid="+data.userSerialId+tableFormedURI;
      
      const rdata = await getApi('vms/getvmtenantid/'+formedURI); // call your api function
      
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
  

  