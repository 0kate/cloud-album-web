import React, { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import Album from '../components/Album'
import Header from '../components/Header'

type Album = {
  name: string
}

const Home: NextPage = () => {
  const [apiKey, setApiKey] = useState<string>('')
  const [apiKeyCache, setApiKeyCache] = useState<string>('')
  const [albums, setAlbums] = useState<Album[]>([])

  const onChangeApiKeyCache = useCallback((event) => {
    setApiKeyCache(event.target.value)
  }, [setApiKeyCache])
  const onClickSet = useCallback(() => {
    setApiKey(apiKeyCache)
  }, [apiKeyCache, setApiKey])

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
      setAlbums(responseJson['albums'])
    })()
  }, [apiKey])

  return (
    <React.Fragment>
      <Header />
      <Box paddingTop={2} paddingBottom={2}>
        <Grid container justifyContent="center" spacing={3}>
          {albums.map((album, idx) => (
            <Grid item key={idx} xs={10}>
              <Album title={album.name} />
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
    </React.Fragment>
  )
}

export default Home
