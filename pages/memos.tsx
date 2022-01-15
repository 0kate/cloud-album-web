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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
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

const Memos: NextPage = () => {
  const [apiKey, setApiKey] = useApiKey();
  const {addMemo, getMemos, deleteMemo, checkDone} = useMemos();
  const [addMemoTitleCache, setAddMemoTitleCache] = useState<string>('');
  const [additionType, setAdditionType] = useState<AdditionType>('memo');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedMemoIdx, setSelectedMemoIdx] = useState<number | null>(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<ConfirmationDialogType>(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [inProcessing, setInProcessing] = useState<boolean>(false);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [openListMap, setOpenListMap] = useState<{[id: string]: boolean}>({});
  const [parentMemo, setParentMemo] = useState<Memo | null>(null);
  const [childrenMap, setChildrenMap] = useState<{[id: string]: Memo[]}>({});

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
      const parentId = parentMemo !== null ? parentMemo.id : null;
      const newMemo = await addMemo(addMemoTitleCache, addAsList, parentId);
      setMemos(await getMemos());
      setOpenDialog(false);
      setAddMemoTitleCache('');
      setAdditionType('memo');
      setParentMemo(null);
      setInProcessing(false);
    })();
  }, [addMemoTitleCache, setOpenDialog, addMemo, getMemos, setMemos, additionType, parentMemo]);
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
    setParentMemo(null);
    setAdditionType('memo');
  }, [setOpenDialog, setAddMemoTitleCache, setAdditionType]);
  const onFinishMemo = useCallback(async () => {
    if (selectedMemoIdx === null) {
      return;
    }
    setInProcessing(true);
    await checkDone(memos[selectedMemoIdx]);
    setSelectedMemoIdx(null);
    setMemos(await getMemos());
    setOpenConfirmationDialog(null);
    setInProcessing(false);
  }, [memos, setMemos, selectedMemoIdx, setOpenConfirmationDialog]);
  const onDeleteMemo = useCallback(async () => {
    if (selectedMemoIdx === null) {
      return;
    }
    setInProcessing(true);
    await deleteMemo(memos[selectedMemoIdx].id);
    setSelectedMemoIdx(null);
    setMemos(await getMemos());
    setOpenConfirmationDialog(null);
    setInProcessing(false);
  }, [selectedMemoIdx, setOpenConfirmationDialog]);
  const onChangeAdditionType = useCallback((event) => {
    setAdditionType(event.target.value);
  }, [setAdditionType]);
  const onClickList = useCallback(async (target: Memo) => {
    if (!openListMap[target.id]) {
      const children = await getMemos(target.id);
      const newChildrenMap = { ...childrenMap };
      newChildrenMap[target.id] = children;
      setChildrenMap(newChildrenMap);
    }
    const newOpenListMap = { ...openListMap };
    newOpenListMap[target.id] = !(newOpenListMap[target.id] || false);
    setOpenListMap(newOpenListMap);
  }, [childrenMap, openListMap]);
  const onClickAddChild = useCallback(async () => {
    if (selectedMemoIdx === null) {
      return;
    }
    setParentMemo(memos[selectedMemoIdx]);
    setOpenDialog(true);
  }, [memos, addMemoTitleCache, selectedMemoIdx]);

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
	childrenMemo={childrenMap}
	openList={openListMap}
	onClickExpandMenu={onClickExpandMenu}
	onClickMemo={onClickMemo}
	onClickList={onClickList}
      ></MemoList>
      {/* fab for adding memo */}
      <Box position="fixed" bottom={75} right={15}>
	<Fab color="primary" onClick={onClickFab}><AddIcon /></Fab>
      </Box>
      {/* Menu */}
      <Menu open={menuAnchor !== null} anchorEl={menuAnchor} onClose={onCloseMenu}>
	{selectedMemoIdx !== null && memos[selectedMemoIdx].isList ? (
	  <Fragment>
	    <MenuItem onClick={onClickAddChild} dense>
	      <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
	      <ListItemText style={{ color: 'grey' }}>
		Add child
	      </ListItemText>
	    </MenuItem>
	    <Divider />
	  </Fragment>
	) : null}
	<MenuItem onClick={onClickDeleteMemo} dense>
	  <ListItemIcon><DeleteIcon fontSize="small" style={{ color: '#ff4242' }} /></ListItemIcon>
	  <ListItemText style={{ color: '#ff4242' }}>
	    Delete
	  </ListItemText>
	</MenuItem>
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
