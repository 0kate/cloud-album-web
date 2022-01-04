import { FC, useMemo } from 'react';
import {
  Box,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import styles from './Album.module.css';

interface Props {
  title: string;
  thumbnail: string | undefined;
  onClick: (title: string) => void;
}

const paperElevation = 5;

const Album: FC<Props> = ({ title, thumbnail, onClick }: Props) => {
  return thumbnail !== undefined ? (
    <Paper
      elevation={paperElevation}
      onClick={() => onClick(title)}
      style={{
        backgroundImage: `url(data:image/jpg;base64,${thumbnail})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Box width="100%" display="flex" position="relative" minHeight="130px">
        <div className={styles.backgroundFilter}></div>
        <Typography className={styles.title} variant="h6">{title}</Typography>
      </Box>
    </Paper>
  ) : (
    <Paper className={styles.albumFrame} elevation={paperElevation}>
      <Skeleton variant="rectangular" animation="wave" height="100%" />
    </Paper>
  );
};

export default Album;
