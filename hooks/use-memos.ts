import axios from 'axios';
import useApiKey from './use-apikey';

const useMemos = () => {
  const [apiKey, setApiKey] = useApiKey();

  const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';
  const instance = axios.create({
    baseURL: `${apiHost}/album/api/memos`,
  });
  instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  instance.defaults.headers.common['X-API-KEY'] = apiKey;
  instance.defaults.headers.post['Content-Type'] = 'application/json';

  return {
    getMemos: async () => {
      const response = await instance.get('/');
      const responseJson = response.data;
      return responseJson.memos;
    },
    addMemo: async (title: string) => {
      const response = await instance.post('/', {
	'title': title,
      });
      const responseJson = response.data;
      return responseJson;
    },
    checkDone: async (memo: { id: string, title: string, done: boolean }) => {
      const response = await instance.put(`/${memo.id}`, {
	'title': memo.title,
	'done': true,
      });
    },
  };
};

export default useMemos;
