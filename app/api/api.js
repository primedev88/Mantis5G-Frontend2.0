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
export const _getipaddress = async () => {
  try {
    const response = await instance.get(`${API_CONFIG.GET_IPADDRESS}`);

    return response.data.IPAddress;

  }
  catch (err) {
    throw err;
  }
}
export const _speedTest = async () => {
  try {
    const response = await instance.get(`${API_CONFIG.GET_SPEED_TEST}`);

    return response.data;

  }
  catch (err) {
    throw err;
  }
}
export const _getUserDetails = async (username) => {


  try {
    const response = await instance.get(`${API_CONFIG.GET_USERDETAILS}/${username}`);
    return response.data;
  }
  catch (err) { throw err; }

}
export const _getUeStatus = async () => {


  try {
    const response = await instance.get(`${API_CONFIG.GET_UE_STATUS}`);

    return response.data;
  }
  catch (err) { throw err; }

}

export const _getRanDeploy = async () => {


  try {
    const response = await instance.get(`${API_CONFIG.GET_RAN_DEPLOY}`);

    return response.data;
  }
  catch (err) { throw err; }

}
export const _getRanDeploy1 = async () => {


  try {
    const response = await instance.get(`${API_CONFIG.GET_RAN_DEPLOY1}`);

    return response.data;
  }
  catch (err) { throw err; }

}

export const _getRanStatus = async () => {


  try {
    const response = await instance.get(`${API_CONFIG.GET_RAN_STATUS}`);

    return response.data;
  }
  catch (err) { throw err; }

}

export const _getRanStop = async () => {


  try {
    const response = await instance.get(`${API_CONFIG.GET_RAN_STOP}`);

    return response.data;
  }
  catch (err) { throw err; }

}

export const _getPacketCapture = async () => {


  try {
    const response = await instance.get(`${API_CONFIG.GET_PACKET_CAPTURE}`);

    return response.data;
  }
  catch (err) { throw err; }

}

export const _getDockerCompose = async (command) => {
  try {
    const response = await instance.get(`${API_CONFIG.GET_DOCKERCOMPOSE}?cmdtype=${command}`)
    return response.data;
  }
  catch (err) { throw err; }
}
export const _getLogin = async (loginData) => {
  try {
    const response = await instance.post(API_CONFIG.GET_LOGIN, loginData);
    return response;

  }
  catch (err) { throw err; }
}

export const _getDockerPSResponse = async () => {
  try {

    const response = await instance.get(`${API_CONFIG.GET_CORESTATUS}`)
    return response.data;
  }
  catch (err) { throw err; }
}

export const _getDockerUpResponse = async () => {
  try {

    const response = await instance.get(`${API_CONFIG.GET_COREDEPLOY}`)
    return response;
  }
  catch (err) { throw err; }
}
export const _getDockerDownResponse = async () => {
  try {

    const response = await instance.get(`${API_CONFIG.GET_CORESTOP}`)
    return response;
  }
  catch (err) { throw err; }
}

export const _getNetworkkpi = async () => {

  try {
    const response = await axios.get(API_CONFIG.BASE_URL + API_CONFIG.GET_NETWORKCAPTURE);

    return response.data;
  }
  catch (err) { throw err; }

}

export const _postCoreConfig = async (data) => {
  try {
    console.log("api line 182 ",data)
    const response = await axios.post(
      API_CONFIG.BASE_URL + API_CONFIG.POST_CORECONFIGURE,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${API_CONFIG.TOKEN}` // Adjust authorization as needed
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error; // Re-throw the error after logging it
  }
};


export const _postSisoConfig = async (data) => {
  try {
    const response = await axios.post(
      API_CONFIG.BASE_URL + API_CONFIG.POST_SISOCONFIGURE,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${API_CONFIG.TOKEN}` // Adjust authorization as needed
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error; // Re-throw the error after logging it
  }
};


export const _postMimoConfig = async (data) => {
  try {
    const response = await axios.post(
      API_CONFIG.BASE_URL + API_CONFIG.POST_MIMOCONFIGURE,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${API_CONFIG.TOKEN}` // Adjust authorization as needed
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error; // Re-throw the error after logging it
  }
};