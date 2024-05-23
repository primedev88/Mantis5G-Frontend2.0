// api.js
import { API_CONFIG } from './config';
import axios from 'axios';
 
 
const instance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
 
    // Add any common headers if needed
  },
 
});
 
export const _getCmdResponse = async (command) => {
  try {
    const response = await instance.get(`${API_CONFIG.GET_CMD_RESPONSE}?command=${command}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const _getipaddress=async()=>{
    try{
        const response=await instance.get(`${API_CONFIG.GET_IPADDRESS}`);
        console.log("_getipaddress",response.data.IPAddress)
        return response.data.IPAddress;
   
    }
    catch(err)
    {
        throw err;
    }
}
export const _speedTest=async()=>{
  try{
      const response=await instance.get(`${API_CONFIG.GET_SPEED_TEST}`);
      console.log("_speedTest",response.data)
      return response.data;
 
  }
  catch(err)
  {
      throw err;
  }
}
export const _getUserDetails=async(username)=>{
 
 
    try{
        const response=await instance.get(`${API_CONFIG.GET_USERDETAILS}/${username}`);
        return response.data;
    }
    catch(err){throw err;}
   
}
export const _getUeStatus=async()=>{

 
  try{
      const response=await instance.get(`${API_CONFIG.GET_UE_STATUS}`);
      console.log("_getUeStatus",response.data);
      return response.data;
  }
  catch(err){throw err;}
 
}

export const _getRanDeploy=async()=>{

 
  try{
      const response=await instance.get(`${API_CONFIG.GET_RAN_DEPLOY}`);
      console.log("_getRanStatus",response.data);
      return response.data;
  }
  catch(err){throw err;}
 
}
export const _getRanDeploy1=async()=>{

 
  try{
      const response=await instance.get(`${API_CONFIG.GET_RAN_DEPLOY1}`);
      console.log("_getRanStatus",response.data);
      return response.data;
  }
  catch(err){throw err;}
 
}

export const _getRanStatus=async()=>{

 
  try{
      const response=await instance.get(`${API_CONFIG.GET_RAN_STATUS}`);
      console.log("_getRanStatuses",response.data);
      return response.data;
  }
  catch(err){throw err;}
 
}

export const _getRanStop=async()=>{

 
  try{
      const response=await instance.get(`${API_CONFIG.GET_RAN_STOP}`);
      console.log("_getRanStop",response.data);
      return response.data;
  }
  catch(err){throw err;}
 
}

export const _getPacketCapture=async()=>{

 
  try{
      const response=await instance.get(`${API_CONFIG.GET_PACKET_CAPTURE}`);
      console.log("_getPacketCapture",response.data);
      return response.data;
  }
  catch(err){throw err;}
 
}
 
export const _getDockerCompose=async(command)=>{
    try{
        const response =await instance.get(`${API_CONFIG.GET_DOCKERCOMPOSE}?cmdtype=${command}`)
        return response.data;
    }
    catch(err){throw err;}
}
export const _getLogin=async(loginData)=>{
try{
    const response= await instance.post(API_CONFIG.GET_LOGIN,loginData);
    return response;
 
}
catch(err){throw err;}
}
 
export const _getDockerPSResponse=async()=>{
  try{
 
    const response= await instance.get(`${API_CONFIG.GET_CORESTATUS}`)
    return response.data;
  }
  catch(err){throw err;}
}
 
export const _getDockerUpResponse=async()=>{
  try{
 
    const response= await instance.get(`${API_CONFIG.GET_COREDEPLOY}`)
    return response;
  }
  catch(err){throw err;}
}
export const _getDockerDownResponse=async()=>{
  try{
 
    const response= await instance.get(`${API_CONFIG.GET_CORESTOP}`)
    return response;
  }
  catch(err){throw err;}
}

export const _getNetworkkpi=async()=>{
 
  try{
    const response=await axios.get( API_CONFIG.BASE_URL + API_CONFIG.GET_NETWORKCAPTURE);
    
    return response.data;
}
catch(err){throw err;}
 
}