import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const postRecruitment = async (recruitmentData: { title: string; content: string }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${PROMOTION_BASIC_PATH}/api/recruitment`, recruitmentData, config);
    return response.data;
  } catch (error) {
    console.error('[❌ Error creating recruitment]', error);
    throw error;
  }
};

export const getAllRecruitmentData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/recruitment`);
    return response.data;
  } catch (error) {
    console.log('[❌ Error fetching RecruitmentData]', error);
    throw error;
  }
};

export const getRecruitmentData = async (id: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/recruitment/${id}`);
    return response.data;
  } catch (error) {
    console.log(`[❌ Error fetching RecruitmentData for id: ${id}]`, error);
    throw error;
  }
};

export const updateRecruitmentData = async (recruitmentData: { id: number; title: string; content: string }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(
      `${PROMOTION_BASIC_PATH}/api/recruitment/${recruitmentData.id}`,
      recruitmentData,
      config,
    );
    return response.data;
  } catch (error) {
    console.log('[❌ Error updating RecruitmentData]', error);
    throw error;
  }
};

export const deleteRecruitmentData = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${PROMOTION_BASIC_PATH}/api/recruitment/${id}`);
  } catch (error) {
    console.log('[❌Error delete RecruitmentData]', error);
    throw error;
  }
};
