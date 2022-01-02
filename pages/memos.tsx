import { useState } from 'react'
import type { NextPage } from 'next'
import {
  Box,
  Checkbox,
  Fab,
  FormGroup,
  FormControlLabel,
} from '@mui/material'
import {
  Add as AddIcon,
} from '@mui/icons-material'
import Layout from '../components/Layout'
import useApiKey from '../hooks/use-apikey'

interface Memo {
  title: string;
  done: boolean;
}

const Memos: NextPage = () => {
  const [apiKey, setApiKey] = useApiKey()
  const [memos, setMemos] = useState<Memo[]>([
    {
      title: 'ハンバーグ',
      done: false,
    },
    {
      title: '肉じゃが',
      done: true,
    },
    {
      title: 'ディズニー',
      done: false,
    }
  ])

  if (apiKey.length === 0) {
    return (
      <Layout>
	memos
      </Layout>
    )
  }

  return (
    <Layout>
      {memos.map((memo: Memo, idx: number) => (
	<FormGroup key={idx}>
	  <FormControlLabel control={<Checkbox checked={memo.done} />} label={memo.title} />
	</FormGroup>
      ))}
      <Box position="absolute" bottom={75} right={15}>
	<Fab color="primary"><AddIcon /></Fab>
      </Box>
    </Layout>
  )
}

export default Memos
