import axios from 'axios';
import { Notification } from '@/types/notification';

const BASE_URL = 'http://3.35.54.100:8080';

export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/notification`);
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetching notifications]', error);
    throw error;
  }
};

export const updateNotification = async (notificationId: number): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/api/notification/${notificationId}`);
  } catch (error) {
    console.log('[❌Error updating notification]', error);
    throw error;
  }
};
