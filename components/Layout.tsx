import { FC, Fragment, useCallback, useState } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import LoginDialog from './LoginDialog';

interface Props {
  fullWidth?: boolean;
}

const Layout: FC<Props> = ({ children, fullWidth }) => {
  const contentStyles = {
    paddingTop: fullWidth ? 0 : 1,
    paddingRight: fullWidth ? 0 : 3,
    paddingLeft: fullWidth ? 0 : 3,
    paddingBottom: 10,
  };

  return (
    <Fragment>
      <Header />
      <div styles={contentStyles}>
	{children}
      </div>
      <BottomNav />
      <LoginDialog />
    </Fragment>
  );
};

export default Layout;
