import { useCallback } from 'react'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  Apps as AppsIcon,
  RestartAlt as RestartAltIcon,
} from '@mui/icons-material'
import useApiKey from '../hooks/use-apikey'
import useTitle from '../hooks/use-title'
import styles from './Header.module.css'

const Header = () => {
  const [apiKey, setApiKey] = useApiKey()
  const title = useTitle()

  const onClickReset = useCallback(() => {
    setApiKey('')
  }, [setApiKey])

  return (
    <AppBar className={styles.appbar} position="sticky" elevation={0}>
      <Toolbar>
        <Typography className={styles.title} variant="h6">{title}</Typography>
        <Box width="100%" display="flex">
          <Box marginLeft="auto">
            <IconButton>
              <AppsIcon className={styles.icon} />
            </IconButton>
	    <IconButton onClick={onClickReset}>
	      <RestartAltIcon className={styles.icon} />
	    </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
