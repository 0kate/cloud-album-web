import { FC, useCallback } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Apps as AppsIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import useApiKey from '../hooks/use-apikey';
import useTitle from '../hooks/use-title';
import styles from './Header.module.css';

interface Props {}

const Header: FC<Props> = () => {
  const [apiKey, setApiKey] = useApiKey();
  const title = useTitle();

  const onClickReset = useCallback(() => {
    setApiKey('');
  }, [setApiKey]);

  return (
    <AppBar className={styles.appbar} position="sticky" elevation={3}>
      <Toolbar>
        <Typography className={styles.title} variant="h6">{title}</Typography>
        <Box width="100%" display="flex">
          <Box marginLeft="auto">
	    <IconButton onClick={onClickReset}>
	      <ExitToAppIcon />
	    </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
