import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Button,
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Cake as CakeIcon,
  Celebration as CelebrationIcon,
} from '@mui/icons-material';
import { Global } from '@emotion/react';
import Layout from '../components/Layout';
import useApiKey from '../hooks/use-apikey';
import styles from '../styles/Home.module.css';

const drawBleeding = 168;

const Home: NextPage = () => {
  const [apiKey, setApiKey] = useApiKey();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const startDate: Date = new Date('2021-10-11');
  const currentDate: Date = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (apiKey.length === 0) {
    return (
      <Layout>
	home
      </Layout>
    );
  }

  return (
    <Layout fullWidth>
      <div className={styles.background}>
	<div className={styles.textContainer}>
	  <span className={styles.daysNum}>{diffDays}</span>
	  <span className={styles.daysText}>DAYS</span>
	  <div className={styles.startDate}>
	    2021/10/11
	  </div>
	</div>
      </div>
      <div className={styles.anniversaryDrawer}>
	<CssBaseline />
	<Global
	  styles={{
	    '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(50% - ${drawBleeding}px)`,
              overflow: 'visible',
            },
	  }}
	/>
	<SwipeableDrawer
	  open={openDrawer}
	  onOpen={() => setOpenDrawer(true)}
	  onClose={() => setOpenDrawer(false)}
          anchor="bottom"
	  swipeAreaWidth={200}
	  disableBackdropTransition={true}
          disableSwipeToOpen={false}
          ModalProps={{ keepMounted: true }}
	>
	  <div style={{
	    position: 'absolute',
	    visibility: 'visible',
	    top: -drawBleeding,
	    backgroundColor: 'white',
	    height: '100%',
	    width: '100%',
	    borderTopRightRadius: 15,
	    borderTopLeftRadius: 15,
	  }}>
	    <div
	      style={{
		width: 30,
		height: 6,
		backgroundColor: 'grey',
		borderRadius: 3,
		position: 'absolute',
		top: 8,
		left: 'calc(50% - 15px)',
	      }}
	    ></div>
	    <div style={{
	      position: 'absolute',
	      width: '100%',
	      top: 10,
	      paddingTop: '13px',
	      paddingLeft: '20px',
	      paddingRight: '20px',
	    }}>
	      <Typography className={styles.anniversariesTitle} variant="h6">
		Anniversaries
	      </Typography>
	      <List>
		<ListItem>
		  <ListItemIcon><CakeIcon /></ListItemIcon>
		  <ListItemText primary="yyyy/mm/dd - birthday" />
		</ListItem>
		<Divider />
		<ListItem>
		  <ListItemIcon><CelebrationIcon /></ListItemIcon>
		  <ListItemText primary="yyyy/mm/dd - four monthsary" />
		</ListItem>
	      </List>
	    </div>
	  </div>
	</SwipeableDrawer>
      </div>
    </Layout>
  );
};

export default Home;
