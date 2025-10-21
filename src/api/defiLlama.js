import axios from 'axios';

export const fetchAPYs = async () => {
  try {
    const { data } = await axios.get('http://localhost:3001/api/apy');
    return data;
  } catch (err) {
    console.error('API error:', err);
    return [];
  }
};
