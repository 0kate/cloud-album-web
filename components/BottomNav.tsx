import { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';
import {
  Home as HomeIcon,
  NoteAlt as NoteAltIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import useTitle from '../hooks/use-title';

interface Props {}

const BottomNav: FC<Props> = () => {
  const title = useTitle();
  const router = useRouter();

  const onClickNav = useCallback((path) => {
    router.push(path);
  }, [router]);

  return (
    <Box position="fixed" bottom={0} top="auto" width="100%" zIndex={2}>
      <Paper elevation={3}>
	<BottomNavigation value={title} showLabels>
	  <BottomNavigationAction value="Home" label="Home" icon={<HomeIcon />} onClick={() => onClickNav('/')} />
	  <BottomNavigationAction value="Albums" label="Albums" icon={<PhotoLibraryIcon />} onClick={() => onClickNav('/albums')} />
	  <BottomNavigationAction value="Memos" label="Memos" icon={<NoteAltIcon />} onClick={() => onClickNav('/memos')} />
	  <BottomNavigationAction value="Settings" label="Settings" icon={<SettingsIcon />} onClick={() => onClickNav('/settings')} />
	</BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
