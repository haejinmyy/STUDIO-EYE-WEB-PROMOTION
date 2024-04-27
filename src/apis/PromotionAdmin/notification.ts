import axios from 'axios';
import { INotification } from '@/types/PromotionAdmin/notification';

export const fetchNotifications = async (userId: number): Promise<INotification[]> => {
  try {
    const response = await axios.get(`http://3.36.95.109:8080/api/userNotification/${userId}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetching notifications]', error);
    throw error;
  }
};

export const updateNotification = async (notificationId: number, userId: number): Promise<void> => {
  try {
    await axios.put(`http://3.36.95.109:8080/api/userNotification/${userId}/${notificationId}?userId=${userId}`);
  } catch (error) {
    console.log('[❌Error updating notification]', error);
    throw error;
  }
};

export const deleteNotification = async (notificationId: number, userId: number): Promise<void> => {
  try {
    await axios.delete(`http://3.36.95.109:8080/api/userNotification/${userId}/${notificationId}?userId=${userId}`);
  } catch (error) {
    console.log('[❌Error delete notification]', error);
    throw error;
  }
};
