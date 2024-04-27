import { ArtworkData, UpdateArtwork } from '@/types/PromotionAdmin/artwork';
import axios from 'axios';

export const getAllArtworks = async () => {
  try {
    const response = await axios.get(`http://3.36.95.109:8080/api/projects`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getArtworkDetail = async (artworkId: number) => {
  try {
    const response = await axios.get(`http://3.36.95.109:8080/api/projects/${artworkId}`);
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

    const response = await axios.put(`http://3.36.95.109:8080/api/projects`, artworkData, config);
    return response.data;
  } catch (error) {
    console.error('[❌ Error updating artwork]', error);
    throw error;
  }
};
