import { Fragment, useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  Fab,
  FormControlLabel,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import ConfirmationDialog from '../components/ConfirmationDialog';
import Layout from '../components/Layout';
import MemoList from '../components/MemoList';
import useApiKey from '../hooks/use-apikey';
import useMemos from '../hooks/use-memos';
import { Memo } from '../lib/types';

type AdditionType = 'memo' | 'list';
type ConfirmationDialogType = 'finishing' | 'deleting' | null;
type OpenListFlags = {
  [id: string]: boolean;
};

const Memos: NextPage = () => {
  const [apiKey, setApiKey] = useApiKey();
  const {addMemo, getMemos, deleteMemo, checkDone} = useMemos();
  const [addMemoTitleCache, setAddMemoTitleCache] = useState<string>('');
  const [additionType, setAdditionType] = useState<AdditionType>('memo');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedMemoIdx, setSelectedMemoIdx] = useState<number|null>(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<ConfirmationDialogType>(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [inProcessing, setInProcessing] = useState<boolean>(false);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [openList, setOpenList] = useState<OpenListFlags>({});

  const onChangeAddMemoTitleCache = useCallback((event) => {
    setAddMemoTitleCache(event.target.value);
  }, [setAddMemoTitleCache]);
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
  const onClickAddMemo = useCallback(() => {
    (async () => {
      setInProcessing(true);
      const addAsList = additionType === 'list';
      const newMemo = await addMemo(addMemoTitleCache, addAsList);
      setMemos(await getMemos());
      setOpenDialog(false);
      setAddMemoTitleCache('');
      setAdditionType('memo');
      setInProcessing(false);
    })();
  }, [addMemoTitleCache, setOpenDialog, addMemo, getMemos, setMemos, additionType]);
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
    setAddMemoTitleCache('');
    setAdditionType('memo');
  }, [setOpenDialog, setAddMemoTitleCache, setAdditionType]);
  const onFinishMemo = useCallback(async () => {
    if (selectedMemoIdx === null) {
      return;
    }
    setInProcessing(true);
    await checkDone(memos[selectedMemoIdx]);
    setMemos(await getMemos());
    setSelectedMemoIdx(null);
    setOpenConfirmationDialog(null);
    setInProcessing(false);
  }, [memos, setMemos, selectedMemoIdx, setOpenConfirmationDialog]);
  const onDeleteMemo = useCallback(async () => {
    if (selectedMemoIdx === null) {
      return;
    }
    setInProcessing(true);
    await deleteMemo(memos[selectedMemoIdx].id);
    setMemos(await getMemos());
    setSelectedMemoIdx(null);
    setOpenConfirmationDialog(null);
    setInProcessing(false);
  }, [selectedMemoIdx, setOpenConfirmationDialog]);
  const onChangeAdditionType = useCallback((event) => {
    setAdditionType(event.target.value);
  }, [setAdditionType]);

  useEffect(() => {
    if (memos.length > 1) {
      return;
    }
    (async () => {
      setMemos(await getMemos());
    })();
  }, []);

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
      <MemoList
	memos={memos}
	onClickExpandMenu={onClickExpandMenu}
	onClickMemo={onClickMemo}
      ></MemoList>
      {/* fab for adding memo */}
      <Box position="fixed" bottom={75} right={15}>
	<Fab color="primary" onClick={onClickFab}><AddIcon /></Fab>
      </Box>
      {/* Menu */}
      <Menu open={menuAnchor !== null} anchorEl={menuAnchor} onClose={onCloseMenu}>
	<MenuItem onClick={onClickDeleteMemo} dense>Delete</MenuItem>
      </Menu>
      {/* Add memo dialog */}
      <Dialog open={openDialog} maxWidth="md" onClose={onCloseDialog} fullWidth>
	<DialogContent>
	  <TextField
	    variant="standard"
	    label="title"
	    value={addMemoTitleCache}
	    InputLabelProps={{ shrink: true }}
	    onChange={onChangeAddMemoTitleCache}
	    fullWidth
	  />
	  <RadioGroup value={additionType} onChange={onChangeAdditionType} row>
	    <FormControlLabel
	      value="memo"
	      control={<Radio size="small" />}
	      label={<Typography variant="subtitle2" style={{ color: 'grey' }}>Memo</Typography>}
	    />
	    <FormControlLabel
	      value="list"
	      control={<Radio size="small" />}
	      label={<Typography variant="subtitle2" style={{ color: 'grey' }}>List</Typography>}
	    />
	  </RadioGroup>
	</DialogContent>
	<DialogActions>
	  <Button onClick={onCloseDialog} variant="outlined" disabled={inProcessing}>
	    CANCEL
	  </Button>
	  <Button onClick={onClickAddMemo} variant="contained" disabled={inProcessing}>
	    {inProcessing ? <CircularProgress color="secondary" size={25} /> : 'ADD'}
	  </Button>
	</DialogActions>
      </Dialog>
      {/* Confirmation dialog for finishing memo */}
      <ConfirmationDialog
	message="Are you sure you want to finish this memo?"
	open={openConfirmationDialog === 'finishing'}
	onClose={onCloseConfirmationDialog}
	onClickCancel={onCloseConfirmationDialog}
	onClickOk={onFinishMemo}
	inProcessing={inProcessing}
      ></ConfirmationDialog>
      {/* Configmation dialog for deleting memo */}
      <ConfirmationDialog
	message="Are you sure you want to delete this memo?"
	open={openConfirmationDialog === 'deleting'}
	onClose={onCloseConfirmationDialog}
	onClickCancel={onCloseConfirmationDialog}
	onClickOk={onDeleteMemo}
	inProcessing={inProcessing}
      ></ConfirmationDialog>
    </Layout>
  );
};

export default Memos;
