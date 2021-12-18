import {
  Box,
  Paper,
  Typography,
} from '@mui/material'
import styles from './Album.module.css'

interface Props {
  title: string
}

const Album = (props: Props) => {
  return (
    <Paper elevation={5}>
      <Box width="100%" padding="15px" display="flex" minHeight="130px">
        <Typography className={styles.title}>{props.title}</Typography>
      </Box>
    </Paper>
  )
}

export default Album