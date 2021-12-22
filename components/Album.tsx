import {
  Box,
  Paper,
  Typography,
} from '@mui/material'
import styles from './Album.module.css'

interface Props {
  title: string
  thumbnail: string | undefined
}

const Album = (props: Props) => {
  return (
    <Paper elevation={5} style={{ backgroundImage: `url(data:image/jpg;base64,${props.thumbnail})`, backgroundSize: "320px 220px", backgroundRepeat: "no-repeat", backdropFilter: "grayscale(30%) !important" }}>
      <Box width="100%" padding="15px" display="flex" minHeight="130px">
        <Typography className={styles.title} variant="h6">{props.title}</Typography>
      </Box>
    </Paper>
  )
}

export default Album