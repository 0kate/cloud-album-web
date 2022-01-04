import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import useApiKey from '../hooks/use-apikey';

const Settings: NextPage = () => {
  const [apiKey, setApiKey] = useApiKey();

  if (apiKey.length === 0) {
    return (
      <Layout>
	settings
      </Layout>
    );
  }

  return (
    <Layout>
      Coming soon
    </Layout>
  );
};

export default Settings;
