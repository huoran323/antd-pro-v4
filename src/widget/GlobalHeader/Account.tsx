import React from 'react';
import { connect } from 'dva';
import { Menu, Icon, Avatar } from 'antd';
import { ConnectProps } from '@/models/connect';
import { formatMessage } from 'umi-plugin-react/locale';
import HeaderDropdown from './components/HeaderDropdown';

import styles from './index.less';

export interface IAccountProps extends ConnectProps {
  userInfo?: any;
}

const Account: React.FC<IAccountProps> = props => {
  const { dispatch, userInfo } = props;

  const onMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch({ type: 'global/logout' });
    }
  };

  const menu = (
    <Menu className={styles.menu} onClick={onMenuClick}>
      <Menu.Item key="userInfo">
        <Icon type="setting" />
        {formatMessage({ id: 'globalHeader.account.settings' })}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        {formatMessage({ id: 'globalHeader.account.logout' })}
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menu}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar className={styles.avatar} src={userInfo.avatar}></Avatar>
        <span className={styles.name}>{userInfo.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default connect()(Account);
