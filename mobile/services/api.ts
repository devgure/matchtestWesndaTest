// mobile/services/api.ts
import axios from 'axios';

const API_BASE = __DEV__
  ? 'http://192.168.1.100:3000'  // Your Ubuntu server IP
  : 'https://api.matchai.com';

export default axios.create({
  baseURL: API_BASE,
});
