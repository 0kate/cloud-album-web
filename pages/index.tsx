import React, { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from '@mui/material';
import Album from '../components/Album'
import Gallery from '../components/Gallery'
import Header from '../components/Header'

type Album = {
  name: string
}

type Thumbnails = {
  [name: string]: string;
}

const Home: NextPage = () => {
  const [apiKey, setApiKey] = useState<string>('')
  const [apiKeyCache, setApiKeyCache] = useState<string>('')
  const [albums, setAlbums] = useState<Album[]>([])
  const [thumbnails, setThumbnails] = useState<Thumbnails>({})
  const [selectedAlbum, setSelectedAlbum] = useState<string | undefined>(undefined)
  const [images, setImages]= useState<string[]>([])

  const onChangeApiKeyCache = useCallback((event) => {
    setApiKeyCache(event.target.value)
  }, [setApiKeyCache])
  const onClickSet = useCallback(() => {
    setApiKey(apiKeyCache)
  }, [apiKeyCache, setApiKey])
  const onClickAlbum = useCallback(async (album) => {
    setSelectedAlbum(album)
    if (album === undefined) return
    const apiHost = process.env.NEXT_PUBLIC_API_HOST || ''
    const response = await fetch(`${apiHost}/album/api/albums/${album}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
    })
    const responseJson = await response.json()

    const newImages = []
    for (let image of responseJson['images']) {
      console.log(image)
      const response = await fetch(`${apiHost}/album/api/albums/${album}/${image.name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey,
        },
      })
      const responseJson = await response.json()

      newImages.push(responseJson.content)
      setImages([...newImages])
    }
  }, [apiKey, selectedAlbum, setSelectedAlbum, images, setImages])
  const onCloseGallery = useCallback(() => {
    setSelectedAlbum(undefined)
    setImages([])
  }, [])

  useEffect(() => {
    if (apiKey === '') {
      return
    }
    (async () => {
      const apiHost = process.env.NEXT_PUBLIC_API_HOST || ''
      const response = await fetch(`${apiHost}/album/api/albums`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey,
        },
      })
      const responseJson = await response.json()

      const albums = responseJson['albums']
      setAlbums(albums)

      await Promise.all(albums.map(album => {
	return new Promise(async (resolve, reject) => {
	  const response = await fetch(`${apiHost}/album/api/albums/${album.name}/thumbnail`, {
	    method: 'GET',
	    headers: {
	      'Content-Type': 'application/json',
	      'X-API-KEY': apiKey,
	    },
	  })
	  const responseJson = await response.json()

          const thumbnailContent = responseJson.content
	  thumbnails[album.name] = thumbnailContent
	  resolve()
	})
      }))
      setThumbnails({ ...thumbnails })
    })()
  }, [apiKey, setThumbnails])

  return (
    <React.Fragment>
      <Header />
      <Box paddingTop={3} paddingBottom={2}>
        <Grid container justifyContent="center" spacing={3}>
          {albums.map((album, idx) => (
            <Grid item key={idx} xs={10}>
              <Album 
                title={album.name}
                thumbnail={thumbnails[album.name]}
                onClick={onClickAlbum}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog open={apiKey.length === 0} maxWidth="sm" fullWidth>
        <DialogContent>
          <TextField
            variant="standard"
            label="Key"
            value={apiKeyCache}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeApiKeyCache}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClickSet}>
            SET
          </Button>
        </DialogActions>
      </Dialog>
      <Gallery album={selectedAlbum} onClose={onCloseGallery} images={images} />
    </React.Fragment>
  )
}

export default Home
