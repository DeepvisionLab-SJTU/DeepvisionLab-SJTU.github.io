// src/api.ts
import axios from 'axios';

//export const fetchServerData = async (server: string, port: number, apipage) => {
//  try {
//    const response = await axios.get(`${server}:${port}/${apipage}`);
//    return response.data;
//  } catch (error) {
//    console.error(`Failed to fetch data from ${server}:${port}/${apipage}`, error);
//    return null;
//  }
//};

export const fetchServerData = async (server: string, port: number, apipage: string) => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}:${port}/${apipage}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch data from ${server}:${port}/${apipage}`, error);
      return null;
    }
  };

  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => resolve(null), 9000); // 5 秒超时
  });

  return Promise.race([fetchData(), timeoutPromise]);
};
