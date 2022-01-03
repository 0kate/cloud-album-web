import React, { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import {
  Box,
  Typography,
} from '@mui/material'
import Layout from '../components/Layout'
import useApiKey from '../hooks/use-apikey'

const Home: NextPage = () => {
  const [apiKey, setApiKey] = useApiKey()

  const startDate: Date = new Date('2021-10-11')
  const currentDate: Date = new Date()
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (apiKey.length === 0) {
    return (
      <Layout>
	home
      </Layout>
    )
  }

  return (
    <Layout>
      <Box display="flex">
	<Typography variant="h4">{diffDays}</Typography>
	<Box marginTop="auto">
	  <Typography noWrap>days</Typography>
	</Box>
      </Box>
    </Layout>
  )
}

export default Home
