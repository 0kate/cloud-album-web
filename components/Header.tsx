import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  Add as AddIcon,
  Apps as AppsIcon,
} from '@mui/icons-material'
import styles from './Header.module.css'

const Header = () => {
  return (
    <AppBar className={styles.appbar} position="sticky">
      <Toolbar>
        <Typography className={styles.title} variant="h6">Albums</Typography>
        <Box width="100%" display="flex">
          <Box marginLeft="auto">
            <IconButton>
              <AppsIcon className={styles.icon} />
            </IconButton>
            <IconButton>
              <AddIcon className={styles.icon} />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header