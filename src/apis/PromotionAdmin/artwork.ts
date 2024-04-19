import { ArtworkData, UpdateArtwork } from '@/types/PromotionAdmin/artwork';
import axios from 'axios';

const BASE_URL = 'http://3.35.54.100:8080';

export const getAllArtworks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/projects`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getArtworkDetail = async (artworkId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/projects/${artworkId}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching artwork detail]', error);
    throw error;
  }
};

export const putArtwork = async (artworkData: FormData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.put(`${BASE_URL}/api/projects`, artworkData, config);
    return response.data;
  } catch (error) {
    console.error('[❌ Error updating artwork]', error);
    throw error;
  }
};
