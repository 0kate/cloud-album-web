import {
  Box,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material'
import styles from './Album.module.css'

interface Props {
  title: string
  thumbnail: string | undefined
}

const Album = (props: Props) => {
  return props.thumbnail !== undefined ? (
    <Paper elevation={5} style={{
      backgroundImage: `url(data:image/jpg;base64,${props.thumbnail})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}>
      <Box width="100%" display="flex" position="relative" minHeight="130px">
        <div className={styles.backgroundFilter}></div>
        <Typography className={styles.title} variant="h6">{props.title}</Typography>
      </Box>
    </Paper>
  ) : (
    <Paper elevation={5} style={{ width: "auto", height: "130px" }}>
      <Skeleton variant="rectangular" height="100%" />
    </Paper>
  )
}

export default Album