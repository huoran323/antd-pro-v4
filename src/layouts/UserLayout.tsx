import React from 'react';
import { ConnectProps } from '@/models/connect';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {

}

const UserLayout: React.FunctionComponent<ConnectProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <span className={styles.title}>后台管理系统</span>
          </div>
          <div className={styles.desc}>不积跬步无以至千里</div>
        </div>
        {children}
      </div>

    </div>
  );
};

export default UserLayout;

