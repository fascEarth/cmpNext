import { postPyApi,getPyApi } from "../../services/python";
import { Buffer } from 'buffer';
export default async function fpwd(req, res) {

  const { endPoint } = req.body;
  
  switch (endPoint) {
    case 'sendCodeToUser':
      await sendCodeToUser(req, res);
      break;
    case 'verifyUserCode':
      await verifyUserCode(req, res);
      break; 
      case 'resetPwdUser':
        await resetPwdUser(req, res);
        break;  
         
    default:
      res.status(404).json({ message: 'Endpoint Not Found' });
      break;
  }


    
  }



async function resetPwdUser(req, res){

    try {
        
        const { data } = req.body; // get data from request body
        const encryptedPassword = Buffer.from(data.new_password, 'base64').toString('utf-8');
        const rdata = await postPyApi('signup/reset_passwd', JSON.stringify({ ...data, new_password:encryptedPassword })); // call your api function
        
        const { status_code, task_uid } = rdata; // get task_uid from response data
    
        if(status_code == "200") {
          const statusData = { task_uuid: task_uid };
          const pstatusData = JSON.stringify(statusData);
          await tokenCall(pstatusData, res, 5);
        } 
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }

}  
async function verifyUserCode(req, res) {
    try {
      
      const { data } = req.body; // get data from request body
  
      const rdata = await postPyApi('signup/forget/verify_token', JSON.stringify(data)); // call your api function
      
      const { status_code, task_uid } = rdata; // get task_uid from response data
  
      if(status_code == "200") {
        const statusData = { task_uuid: task_uid };
        const pstatusData = JSON.stringify(statusData);
        await tokenCall(pstatusData, res, 5);
      } 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  

  async function sendCodeToUser(req, res) {
    try {
      
      const { data } = req.body; // get data from request body
  
      const rdata = await postPyApi('signup/forget/send_email_token', JSON.stringify(data)); // call your api function
      
      const { status_code, task_uid } = rdata; // get task_uid from response data
  
      if(status_code == "200") {
        const statusData = { task_uuid: task_uid };
        const pstatusData = JSON.stringify(statusData);
        await tokenCall(pstatusData, res, 5);
      } 
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
  
 