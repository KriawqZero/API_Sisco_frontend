import axios from 'axios';
import config from '../config/env';

export const fetchFeedbacks = async (page: number, limit: number, orderBy: string) => {
  const response = await axios.get(`${config.API_URL}/feedbacks`, {
    params: { page, limit, orderBy }
  });
  return {
    data: response.data.data,
    pagination: response.data.pagination
  };
};

export const fetchSingleFeedback = async (id: number) => {
  const response = await axios.get(`${config.API_URL}/feedback/${id}`);
  return response.data;
};

export const getFileUrl = (id: number) => {
  return `${config.API_URL}/feedback/${id}/arquivo`;
};
