import type { NextPage } from 'next'
import {
  Box,
  Grid,
} from '@mui/material';
import Album from '../components/Album'
import Header from '../components/Header'

const Home: NextPage = () => {
  const albums = [
    {
      title: 'test1',
    },
    {
      title: 'test2',
    },
    {
      title: 'test3',
    },
    {
      title: 'test4',
    },
    {
      title: 'test5',
    },
  ]
  return (
    <div>
      <Header />
      <Box paddingTop={2} paddingBottom={2}>
        <Grid container justifyContent="center" spacing={3}>
          {albums.map((album, idx) => (
            <Grid item key={idx} xs={10}>
              <Album title={album.title} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default Home
