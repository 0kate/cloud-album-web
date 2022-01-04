import { Fragment, useCallback, useState } from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  Fab,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import useApiKey from '../hooks/use-apikey';

interface Memo {
  title: string;
  done: boolean;
}

const Memos: NextPage = () => {
  const [apiKey, setApiKey] = useApiKey();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedMemoIdx, setSelectedMemoIdx] = useState<number|null>(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<'finishing'|'deleting' | null>(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [memos, setMemos] = useState<Memo[]>([
    {
      title: 'ハンバーグ',
      done: false,
    },
    {
      title: '肉じゃが',
      done: true,
    },
    {
      title: 'ディズニー',
      done: false,
    },
  ]);

  const onClickMemo = useCallback((event) => {
    setSelectedMemoIdx(event.currentTarget.dataset.index);
    setOpenConfirmationDialog('finishing');
  }, [setSelectedMemoIdx, setOpenConfirmationDialog]);
  const onClickDeleteMemo = useCallback((event) => {
    if (selectedMemoIdx === null) {
      return;
    }
    setMenuAnchor(null);
    setOpenConfirmationDialog('deleting');
  }, [selectedMemoIdx, setMenuAnchor, setOpenConfirmationDialog]);
  const onCloseConfirmationDialog = useCallback(() => {
    setOpenConfirmationDialog(null);
  }, [setOpenConfirmationDialog]);
  const onClickExpandMenu = useCallback((event) => {
    setSelectedMemoIdx(event.currentTarget.dataset.index);
    setMenuAnchor(event.currentTarget);
  }, [setMenuAnchor, setSelectedMemoIdx]);
  const onCloseMenu = useCallback(() => {
    setMenuAnchor(null);
    setSelectedMemoIdx(null);
  }, [setMenuAnchor, setSelectedMemoIdx]);
  const onClickFab = useCallback(() => {
    setOpenDialog(true);
  },  [setOpenDialog]);
  const onCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, [setOpenDialog]);
  const onFinishMemo = useCallback(() => {
    if (selectedMemoIdx === null) {
      return;
    }
    const newMemos = [...memos];
    newMemos[selectedMemoIdx].done = true;
    setMemos(newMemos);
    setSelectedMemoIdx(null);
    setOpenConfirmationDialog(null);
  }, [memos, setMemos, selectedMemoIdx, setOpenConfirmationDialog]);
  const onDeleteMemo = useCallback(() => {
    if (selectedMemoIdx === null) {
      return;
    }
    setSelectedMemoIdx(null);
    setOpenConfirmationDialog(null);
  }, [selectedMemoIdx, setOpenConfirmationDialog]);

  if (apiKey.length === 0) {
    return (
      <Layout>
	memos
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Memo list */}
      <List>
	{memos.map((memo: Memo, idx: number) => (
	  <Fragment key={idx}>
	    <ListItem secondaryAction={<IconButton edge="end" data-index={idx} onClick={onClickExpandMenu}><MoreVertIcon /></IconButton>}>
	      <ListItemButton data-index={idx} onClick={onClickMemo} dense>
		<ListItemIcon>
		  <Checkbox edge="start" checked={memo.done} />
		</ListItemIcon>
		<ListItemText primary={memo.title} />
	      </ListItemButton>
	    </ListItem>
	    <Divider />
	  </Fragment>
	))}
      </List>
      {/* Add fab */}
      <Box position="absolute" bottom={75} right={15}>
	<Fab color="primary" onClick={onClickFab}><AddIcon /></Fab>
      </Box>
      {/* Menu */}
      <Menu open={menuAnchor !== null} anchorEl={menuAnchor} onClose={onCloseMenu}>
	<MenuItem onClick={onClickDeleteMemo} dense>Delete</MenuItem>
      </Menu>
      {/* Add memo dialog */}
      <Dialog open={openDialog} maxWidth="md" onClose={onCloseDialog} fullWidth>
	<DialogContent>
	  <TextField variant="standard" label="title" InputLabelProps={{ shrink: true }} fullWidth />
	</DialogContent>
	<DialogActions>
	  <Button onClick={onCloseDialog} variant="outlined">CANCEL</Button>
	  <Button variant="contained">ADD</Button>
	</DialogActions>
      </Dialog>
      {/* Confirmation dialog for finishing memo */}
      <Dialog open={openConfirmationDialog === 'finishing'} onClose={onCloseConfirmationDialog} fullWidth>
	<DialogContent>
	  Are you sure you want to finish this memo.
	</DialogContent>
	<DialogActions>
	  <Button variant="outlined" onClick={onCloseConfirmationDialog}>CANCEL</Button>
	  <Button variant="contained" onClick={onFinishMemo}>OK</Button>
	</DialogActions>
      </Dialog>
      {/* Configmation dialog for deleting memo */}
      <Dialog open={openConfirmationDialog === 'deleting'} onClose={onCloseConfirmationDialog} fullWidth>
	<DialogContent>
	  Are you sure you want to delete this memo.
	</DialogContent>
	<DialogActions>
	  <Button variant="outlined" onClick={onCloseConfirmationDialog}>CANCEL</Button>
	  <Button variant="contained" onClick={onDeleteMemo}>OK</Button>
	</DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Memos;
