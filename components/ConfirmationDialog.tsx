import { FC } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import styles from './ConfirmationDialog.module.css';

interface Props {
  message: string;
  open: boolean;
  onClose: () => void;
  onClickCancel: () => void;
  onClickOk: () => void;
  inProcessing: boolean;
};

const ConfirmationDialog: FC<Props> = ({ message, open, onClose, onClickCancel, onClickOk, inProcessing }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
	<Typography className={styles.message} variant="subtitle1">{message}</Typography>
      </DialogContent>
      <DialogActions>
	<Button variant="outlined" onClick={onClickCancel} disabled={inProcessing}>
	  CANCEL
	</Button>
	<Button variant="contained" onClick={onClickOk} disabled={inProcessing}>
	  {inProcessing ? <CircularProgress color="secondary" size={25} /> : "OK"}
	</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
