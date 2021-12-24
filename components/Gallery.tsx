import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Dialog,
  Grid,
  IconButton,
  Skeleton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  Close as CloseIcon,
} from '@mui/icons-material'
import styles from './Gallery.module.css'

interface Props {
  album: string | undefined
  onClose: () => void
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Gallery = (props: Props) => {
  const images = useState<string[]>([
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
  ])

  return (
    <Dialog open={props.album !== undefined} onClose={props.onClose} TransitionComponent={Transition} fullWidth fullScreen>
      <AppBar className={styles.header} position="sticky">
        <Toolbar>
          <Box width="100%" display="flex">
            <Box marginTop="auto" marginBottom="auto">
              <Typography className={styles.title} variant="h6">{props.album}</Typography>
            </Box>
            <Box marginLeft="auto">
              <IconButton onClick={() => props.onClose()}>
                <CloseIcon className={styles.close} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container>
        {images.map((image, idx) => (
          <Grid key={idx} className={styles.image} item xs={4}>
            <Skeleton variant="rectangular" />
          </Grid>
        ))}
      </Grid>
    </Dialog>
  )
}

export default Gallery