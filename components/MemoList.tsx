import { FC, Fragment } from 'react';
import {
  Checkbox,
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
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Memo } from '../lib/types';
import styles from './MemoList.module.css';

interface Props {
  memos: Memo[];
  onClickExpandMenu: (event: any) => void;
  onClickMemo: (event: any) => void;
}

const MemoList: FC<Props> = ({ memos, onClickExpandMenu, onClickMemo }: Props) => {
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
	    <ListItemButton data-index={idx} onClick={onClickMemo} dense>
	      <ListItemIcon>
		<Checkbox edge="start" size="small" checked={memo.done} />
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
	</Fragment>
      ))}
    </List>
  );
};

export default MemoList;
