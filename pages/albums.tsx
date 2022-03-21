import { useCallback, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import { Button, Grid } from '@mui/material';
import {
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import useAsyncEffect from 'use-async-effect';
import axios from 'axios';
import Album from '../components/Album';
import Gallery from '../components/Gallery';
import Layout from '../components/Layout';
import useApiKey from '../hooks/use-apikey';

type Album = {
  name: string
};

type Thumbnails = {
  [name: string]: string;
};

const Albums: NextPage = () => {
  const [apiKey, setApiKey] = useApiKey();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [thumbnails, setThumbnails] = useState<Thumbnails>({});
  const [selectedAlbum, setSelectedAlbum] = useState<string|undefined>(undefined);
  const [images, setImages]= useState<string[]>([]);

  const api = useMemo(() => {
    const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';
    const instance = axios.create({
      baseURL: `${apiHost}/albums`,
    });
    instance.defaults.headers.common['X-API-KEY'] = apiKey;
    instance.defaults.headers.post['Content-Type'] = 'application/json';
    return instance;
  }, [apiKey]);

  const onClickAlbum = useCallback(async (album) => {
    setSelectedAlbum(album);

    if (album === undefined) return;
    const response = await api.get(`/${album}/photos`);
    const responseJson = response.data;
    console.log(responseJson);

    setImages(responseJson['images']);
  }, [api, setSelectedAlbum, setImages]);
  const onCloseGallery = useCallback(() => {
    setSelectedAlbum(undefined);
    setImages([]);
  }, []);
  const onClickOpenInGooglePhoto = () => {
    location.href = "googlephotos:///";
  };

  useAsyncEffect(async () => {
    if (apiKey === '') {
      setAlbums([]);
      setImages([]);
      setThumbnails({});
      setSelectedAlbum(undefined);
      return;
    }
    try {
      const response = await api.get('/');
      const responseJson = response.data;

      const albums = responseJson['albums'];
      setAlbums(albums);

      for (let album of albums) {
	const response = await api.get(`/${album.name}/thumbnail`);
	const responseJson = response.data;

	const thumbnailContent = responseJson.content;
	thumbnails[album.name] = thumbnailContent;
	setThumbnails({ ...thumbnails });
      }
    } catch (err) {
      console.log(err);
    }
  }, [api, apiKey]);

  return (
    <Layout>
      <Grid container justifyContent="center" spacing={3}>
	<Grid item xs={12}>
	  <Button
	    variant="contained"
	    size="xl"
	    startIcon={<OpenInNewIcon />}
	    onClick={onClickOpenInGooglePhoto}
	    fullWidth
	  >
	    Google Photoで開く
	  </Button>
	</Grid>
        {albums.map((album, idx) => (
          <Grid item key={idx} xs={12}>
	    <Album
              title={album.name}
              thumbnail={thumbnails[album.name]}
              onClick={onClickAlbum}
	    />
          </Grid>
        ))}
      </Grid>
      <Gallery album={selectedAlbum} onClose={onCloseGallery} images={images} />
    </Layout>
  );
};

export default Albums;
