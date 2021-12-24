import { forwardRef } from 'react'
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
import { default as GridGallery } from 'react-grid-gallery'
import styles from './Gallery.module.css'

interface Props {
  album: string | undefined
  images: string[]
  onClose: () => void
}

const Transition = forwardRef<any, any>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Gallery = (props: Props) => {
  const images = (props.images || []).map(image => {
    return {
      src: `url(data:image/jpg;base64,${image})`,
      thumbnail: `data:image/jpg;base64,${image}`
    }
  })

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
      <GridGallery images={images} />
    </Dialog>
  )
}

export default Gallery