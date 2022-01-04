import { FC, Fragment, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import BottomNav from './BottomNav';
import LoginDialog from './LoginDialog';

interface Props {
  fullWidth?: boolean;
}

const Layout: FC<Props> = ({ children, fullWidth }) => {
  const boxProps = {
    paddingTop: fullWidth ? 0 : 1,
    paddingRight: fullWidth ? 0 : 3,
    paddingLeft: fullWidth ? 0 : 3,
    paddingBottom: 10,
  };

  return (
    <Fragment>
      <Header />
      <Box {...boxProps}>
	{children}
      </Box>
      <BottomNav />
      <LoginDialog />
    </Fragment>
  );
};

export default Layout;
