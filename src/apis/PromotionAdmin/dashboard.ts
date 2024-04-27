import axios from 'axios';

export const fetchViewsData = async (startYear: number, startMonth: number, endYear: number, endMonth: number) => {
  try {
    const response = await axios.get(
      `http://3.36.95.109:8080/api/views/${startYear}/${startMonth}/${endYear}/${endMonth}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchViewsData]', error);
    throw error;
  }
};

export const fetchRequestsData = async (startYear: number, startMonth: number, endYear: number, endMonth: number) => {
  try {
    const response = await axios.get(
      `http://3.36.95.109:8080/api/requests/${startYear}/${startMonth}/${endYear}/${endMonth}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchRequestsData]', error);
    throw error;
  }
};

export const fetchWaitingRequests = async () => {
  try {
    const response = await axios.get(`http://3.36.95.109:8080/api/requests/waiting`);
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchWaitingRequests]', error);
    throw error;
  }
};
