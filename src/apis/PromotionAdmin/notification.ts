import axios from 'axios';
import { INotification } from '@/types/PromotionAdmin/notification';

const BASE_URL = 'http://3.35.54.100:8080';

export const fetchNotifications = async (userId: number): Promise<INotification[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/userNotification/${userId}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetching notifications]', error);
    throw error;
  }
};

export const updateNotification = async (notificationId: number, userId: number): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/api/userNotification/${userId}/${notificationId}?userId=${userId}`);
  } catch (error) {
    console.log('[❌Error updating notification]', error);
    throw error;
  }
};

export const deleteNotification = async (notificationId: number, userId: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/api/userNotification/${userId}/${notificationId}?userId=${userId}`);
  } catch (error) {
    console.log('[❌Error delete notification]', error);
    throw error;
  }
};
