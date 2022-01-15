import { FC, Fragment } from 'react';
import {
  Checkbox,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Memo } from '../lib/types';
import styles from './MemoList.module.css';

interface Props {
  memos: Memo[];
  childrenMemo: {[id: string]: Memo[]};
  openList: {[id: string]: boolean};
  onClickExpandMenu: (event: any) => void;
  onClickMemo: (event: any) => void;
  onClickList: (target: Memo) => void;
}

const MemoList: FC<Props> = ({ memos, childrenMemo, openList, onClickExpandMenu, onClickMemo, onClickList }: Props) => {
  return (
    <List className={styles.memoList}>
      {memos.map((memo: Memo, idx: number) => (
	<Fragment key={idx}>
	  <ListItem
	    secondaryAction={
	      <IconButton
		edge="end"
		data-index={idx}
		onClick={onClickExpandMenu}
	      >
		<MoreVertIcon />
	      </IconButton>
	    }
	    dense
	  >
	    <ListItemButton data-index={idx} onClick={memo.isList ? () => onClickList(memo) : onClickMemo} dense>
	      <ListItemIcon>
		{memo.isList ?
		  openList[memo.id] ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />
		: (
		  <Checkbox edge="start" size="small" checked={memo.done} />
		)}
	      </ListItemIcon>
	      <ListItemText
	      primary={
		<Typography
		  className={styles.memoTitle}
		  variant="caption"
		>
		  {memo.title}
		</Typography>
	      }
	      />
	    </ListItemButton>
	  </ListItem>
	  <Divider />
	  {memo.isList ? (
	    <Collapse in={openList[memo.id] || false}>
	      <List component="div" disablePadding>
		{(childrenMemo[memo.id] || []).map(child => (
		  <Fragment key={child.id}>
		    <ListItem
		      secondaryAction={
			<IconButton
			  edge="end"
			  data-index={idx}
			>
			  <MoreVertIcon />
			</IconButton>
		      }
		      dense
		    >
		      <ListItemButton sx={{ pl: 5 }}>
			<ListItemIcon>
			  <Checkbox edge="start" size="small" checked={child.done} />
			</ListItemIcon>
			<ListItemText
			  primary={
			    <Typography
			      className={styles.memoTitle}
			      variant="caption"
			    >
			      {child.title}
			    </Typography>
			  }
			/>
		      </ListItemButton>
		    </ListItem>
		    <Divider />
		  </Fragment>
		))}
	      </List>
	    </Collapse>
	  ) : null}
	</Fragment>
      ))}
    </List>
  );
};

export default MemoList;
