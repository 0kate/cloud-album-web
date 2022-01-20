import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Button,
  Card,
  Typography,
} from '@mui/material';
import Layout from '../components/Layout';
import useApiKey from '../hooks/use-apikey';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [apiKey, setApiKey] = useApiKey();

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
	<div className={styles.days}>
	  <span className={styles.daysNum}>{diffDays}</span>
	  <span>days</span>
	</div>
      </div>
    </Layout>
  );
};

export default Home;
