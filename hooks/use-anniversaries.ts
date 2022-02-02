import axios from 'axios';
import useApiKey from './use-apikey';
import { Memo } from '../lib/types';

const useAnniversaries = () => {
  const [apiKey, setApiKey] = useApiKey();

  const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';
  const instance = axios.create({
    baseURL: `${apiHost}/album/api/anniversaries`,
  });
  instance.defaults.headers.common['X-API-KEY'] = apiKey;
  instance.defaults.headers.common['Content-Type'] = 'application/json';

  return {
    getAnniversaries: async (parentId: string = '') => {
      const response = await instance.get(`/?sort=date`);
      const responseJson = response.data;
      return responseJson.anniversaries;
    },
    // addAnniversary: async (title: string, isList: boolean = false, parentId: string | null = null) => {
    //   const response = await instance.post('/', {
    // 	'title': title,
    // 	'isList': isList,
    // 	'parent': parentId,
    //   });
    //   const responseJson = response.data;
    //   return responseJson;
    // },
    // deleteAnniversary: async (memoId: string) => {
    //   const response = await instance.delete(`/${memoId}`);
    // },
  };
};

export default useAnniversaries;
