import axios from 'axios';
import useApiKey from './use-apikey';
import { Memo } from '../lib/types';

const useMemos = () => {
  const [apiKey, setApiKey] = useApiKey();

  const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';
  const instance = axios.create({
    baseURL: `${apiHost}/memos`,
  });
  instance.defaults.headers.common['X-API-KEY'] = apiKey;
  instance.defaults.headers.common['Content-Type'] = 'application/json';

  return {
    getMemos: async (parentId: string = '') => {
      const response = await instance.get(`/${parentId}`);
      const responseJson = response.data;
      return responseJson.memos;
    },
    addMemo: async (title: string, isList: boolean = false, parentId: string | null = null) => {
      const response = await instance.post('/', {
	'title': title,
	'isList': isList,
	'parent': parentId,
      });
      const responseJson = response.data;
      return responseJson;
    },
    deleteMemo: async (memoId: string) => {
      const response = await instance.delete(`/${memoId}`);
    },
    checkDone: async (memo: Memo) => {
      const response = await instance.put(`/${memo.id}`, {
	'title': memo.title,
	'done': true,
	'parent': memo.parent,
      });
    },
    moveToList: async (memo: Memo, parentId: string) => {
      const response = await instance.put(`/${memo.id}`, {
	'title': memo.title,
	'done': memo.done,
	'parent': parentId,
      });
    },
  };
};

export default useMemos;
