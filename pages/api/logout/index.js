import { postPyApi } from "../services/python";
import { Buffer } from "buffer";
export default async function logout(req, res) {

  const { endPoint } = req.body;
  
  switch (endPoint) {
    case 'logoutUser':
      await logoutUser(req, res);
      break;
    
    default:
      res.status(404).json({ message: 'Endpoint Not Found' });
      break;
  }


    
  }


  

  async function logoutUser(req, res) {
    try {
      
      const { data } = req.body; // get data from request body
      const clientIP = req.socket.remoteAddress;
      //data.ipAddress = clientIP;
      const rdata = await postPyApi('logout', JSON.stringify(data)); // call your api function
      
      const { status_code, task_uid } = rdata; // get task_uid from response data
  
      
      if(status_code == "200") {
        const statusData = { task_uuid: task_uid };
        const pstatusData = JSON.stringify(statusData);
        await tokenCall(pstatusData, res, 5);
      }else{
        res.status(200).json(rdata);
      } 
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async function tokenCall(data,res, counter){
    
    
    if (counter === 0) {
      res.status(200).json({ message: 'Error Occurred, contact administrator' });
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
  

  