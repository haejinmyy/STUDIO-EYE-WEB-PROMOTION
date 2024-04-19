import axios from 'axios';

const BASE_URL = 'http://3.35.54.100:8080';

export const fetchViewsData = async (startYear: number, startMonth: number, endYear: number, endMonth: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/views/${startYear}/${startMonth}/${endYear}/${endMonth}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchViewsData]', error);
    throw error;
  }
};

export const fetchRequestsData = async (startYear: number, startMonth: number, endYear: number, endMonth: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/requests/${startYear}/${startMonth}/${endYear}/${endMonth}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchRequestsData]', error);
    throw error;
  }
};

export const fetchWaitingRequests = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/requests/waiting`);
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchWaitingRequests]', error);
    throw error;
  }
};
