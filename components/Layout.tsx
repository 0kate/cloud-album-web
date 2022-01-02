import { FC, Fragment, useCallback, useState } from 'react'
import { Box } from '@mui/material'
import Header from './Header'
import BottomNav from './BottomNav'
import LoginDialog from './LoginDialog'

interface Props {}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Box paddingTop={1} paddingRight={3} paddingLeft={3} paddingBottom={10}>
	{children}
      </Box>
      <BottomNav />
      <LoginDialog />
    </Fragment>
  )
}

export default Layout
