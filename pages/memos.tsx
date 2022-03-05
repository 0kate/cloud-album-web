import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
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
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
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
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DriveFileMove as DriveFileMoveIcon,
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
type MemoOfMap = {[id: string]: Memo};

const Memos: NextPage = () => {
  const [apiKey, setApiKey] = useApiKey();
  const {addMemo, getMemos, deleteMemo, checkDone, moveToList} = useMemos();
  const [addMemoTitleCache, setAddMemoTitleCache] = useState<string>('');
  const [additionType, setAdditionType] = useState<AdditionType>('memo');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<ConfirmationDialogType>(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [inProcessing, setInProcessing] = useState<boolean>(false);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [memoOf, setMemoOf] = useState<MemoOfMap>({});
  const [openListMap, setOpenListMap] = useState<{[id: string]: boolean}>({});
  const [parentMemo, setParentMemo] = useState<Memo | null>(null);
  const [childrenMap, setChildrenMap] = useState<{[id: string]: Memo[]}>({});
  const [openMoveDialog, setOpenMoveDialog] = useState<boolean>(false);
  const [moveDestination, setMoveDestination] = useState<string | null>(null);

  const lists = useMemo(() => {
    return memos.filter((memo: Memo) => memo.isList);
  }, [memos]);

  const updateMemos = useCallback((newMemos) => {
    setMemos(newMemos);

    const newMemoOf: MemoOfMap = {};
    for (let memo of newMemos) {
      newMemoOf[memo.id] = memo;
    }
    setMemoOf(newMemoOf);
  }, []);
  const updateChildren = useCallback(async (child: Memo) => {
    if (child.parent === null) {
      return;
    }

    const children = await getMemos(child.parent);
    const newChildrenMap = { ...childrenMap };
    newChildrenMap[child.parent] = children;
    setChildrenMap(newChildrenMap);

    const newMemoOf: MemoOfMap = {...memoOf};
    for (let child of children) {
      newMemoOf[child.id] = child;
    }
    setMemoOf(newMemoOf);
  }, [memoOf, childrenMap]);

  const onChangeAddMemoTitleCache = useCallback((event) => {
    setAddMemoTitleCache(event.target.value);
  }, [setAddMemoTitleCache]);
  const onClickMemo = useCallback((event) => {
    setSelectedMemoId(event.currentTarget.dataset.id);
    setOpenConfirmationDialog('finishing');
  }, [setSelectedMemoId, setOpenConfirmationDialog]);
  const onClickDeleteMemo = useCallback((event) => {
    if (selectedMemoId === null) {
      return;
    }
    setMenuAnchor(null);
    setOpenConfirmationDialog('deleting');
  }, [selectedMemoId, setMenuAnchor, setOpenConfirmationDialog]);
  const onClickAddMemo = useCallback(() => {
    (async () => {
      setInProcessing(true);
      const addAsList = additionType === 'list';
      const parentId = parentMemo !== null ? parentMemo.id : null;
      const newMemo = await addMemo(addMemoTitleCache, addAsList, parentId);
      const newMemos = await getMemos();
      updateMemos(newMemos);
      setOpenDialog(false);
      setAddMemoTitleCache('');
      setAdditionType('memo');
      setParentMemo(null);
      setInProcessing(false);
    })();
  }, [addMemoTitleCache, setOpenDialog, addMemo, getMemos, additionType, parentMemo]);
  const onCloseConfirmationDialog = useCallback(() => {
    setOpenConfirmationDialog(null);
  }, [setOpenConfirmationDialog]);
  const onClickExpandMenu = useCallback((event) => {
    setSelectedMemoId(event.currentTarget.dataset.id);
    setMenuAnchor(event.currentTarget);
  }, [setMenuAnchor, setSelectedMemoId]);
  const onCloseMenu = useCallback(() => {
    setMenuAnchor(null);
    setSelectedMemoId(null);
  }, [setMenuAnchor, setSelectedMemoId]);
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
    if (selectedMemoId === null) {
      return;
    }
    setInProcessing(true);
    await checkDone(memoOf[selectedMemoId]);
    setSelectedMemoId(null);

    const newMemos = await getMemos();
    updateMemos(newMemos);
    updateChildren(memoOf[selectedMemoId]);

    setOpenConfirmationDialog(null);
    setInProcessing(false);
  }, [memos, memoOf, setMemoOf, selectedMemoId, setOpenConfirmationDialog]);
  const onDeleteMemo = useCallback(async () => {
    if (selectedMemoId === null) {
      return;
    }
    setInProcessing(true);
    await deleteMemo(selectedMemoId);
    setSelectedMemoId(null);
    const newMemos = await getMemos();
    updateMemos(newMemos);
    setOpenConfirmationDialog(null);
    setInProcessing(false);
  }, [selectedMemoId, setOpenConfirmationDialog]);
  const onChangeAdditionType = useCallback((event) => {
    setAdditionType(event.target.value);
  }, [setAdditionType]);
  const onClickList = useCallback(async (target: Memo) => {
    if (!openListMap[target.id]) {
      const children = await getMemos(target.id);
      const newChildrenMap = { ...childrenMap };
      newChildrenMap[target.id] = children;
      setChildrenMap(newChildrenMap);

      const newMemoOf = {...memoOf};
      for (let child of children) {
	newMemoOf[child.id] = child;
      }
      setMemoOf(newMemoOf);
    }
    const newOpenListMap = { ...openListMap };
    newOpenListMap[target.id] = !(newOpenListMap[target.id] || false);
    setOpenListMap(newOpenListMap);
  }, [childrenMap, memoOf, openListMap]);
  const onClickAddChild = useCallback(async () => {
    if (selectedMemoId === null) {
      return;
    }
    setParentMemo(memoOf[selectedMemoId]);
    setOpenDialog(true);
  }, [memos, memoOf, addMemoTitleCache, selectedMemoId]);
  const onClickMoveToList = useCallback(() => {
    setOpenMoveDialog(true);
    setMenuAnchor(null);
  }, []);
  const onCloseMoveDialog = useCallback(() => {
    setOpenMoveDialog(false);
    setMoveDestination(null);
  }, []);
  const onClickMove = useCallback(async () => {
    if (selectedMemoId === null) {
      return;
    }
    if (moveDestination !== null) {
      setInProcessing(true);
      await moveToList(memoOf[selectedMemoId], moveDestination);
      setSelectedMemoId(null);
      const newMemos = await getMemos();
      updateMemos(newMemos);
    }
    setSelectedMemoId(null);
    setOpenMoveDialog(false);
    setMoveDestination(null);
    setInProcessing(false);
  }, [selectedMemoId, memos, memoOf, moveDestination]);
  const onChangeMoveDestination = useCallback((event) => {
    setMoveDestination(event.target.value);
  }, []);

  useEffect(() => {
    if (memos.length > 1) {
      return;
    }
    (async () => {
      const newMemos = await getMemos();
      updateMemos(newMemos);
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
	{selectedMemoId !== null && memoOf[selectedMemoId].isList ? (
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
	<MenuItem onClick={onClickMoveToList} dense>
	  <ListItemIcon><DriveFileMoveIcon fontSize="small" /></ListItemIcon>
	  <ListItemText style={{ color: 'grey' }}>
	    Move to list
	  </ListItemText>
	</MenuItem>
	<Divider />
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
      {/* Move memo dialog */}
      <Dialog open={openMoveDialog} maxWidth="md" onClose={onCloseMoveDialog} fullWidth>
	<DialogContent>
	  <FormControl variant="standard" fullWidth>
	    <InputLabel id="move-select-label">Move to</InputLabel>
	    <Select
	      labelId="move-select-label"
	      value={moveDestination}
	      onChange={onChangeMoveDestination}
	    >
	      {lists.map((list: Memo) => (
		<MenuItem key={list.id} value={list.id}>
		  <Typography variant="subtitle1" style={{ color: 'grey' }}>{list.title}</Typography>
		</MenuItem>
	      ))}
	    </Select>
	  </FormControl>
	</DialogContent>
	<DialogActions>
	  <Button onClick={onCloseMoveDialog} variant="outlined" disabled={inProcessing}>
	    CANCEL
	  </Button>
	  <Button onClick={onClickMove} variant="contained" disabled={inProcessing}>
	    {inProcessing ? <CircularProgress color="secondary" size={25} /> : 'MOVE'}
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
