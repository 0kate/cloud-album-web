import { useCallback, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material'
import useApiKey from '../hooks/use-apikey'

const LoginDialog = () => {
  const [apiKey, setApiKey] = useApiKey()
  const [apiKeyCache, setApiKeyCache] = useState('')

  const onChangeApiKeyCache = useCallback((event) => {
    setApiKeyCache(event.target.value)
  }, [])
  const onClickSet = useCallback(() => {
    setApiKey(apiKeyCache)
  }, [apiKeyCache, setApiKey])

  return (
    <Dialog open={apiKey.length === 0} maxWidth="sm" fullWidth>
      <DialogContent>
        <TextField
          variant="standard"
          label="Key"
          value={apiKeyCache}
          InputLabelProps={{ shrink: true }}
          onChange={onChangeApiKeyCache}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClickSet}>
          SET
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoginDialog
