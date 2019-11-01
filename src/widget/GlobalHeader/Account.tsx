import React from 'react';
import { connect } from 'dva';
import { Menu, Icon, Avatar } from 'antd';
import { ConnectProps } from '@/models/connect';
import HeaderDropdown from './components/HeaderDropdown';

import styles from './index.less';

export interface IAccountProps extends ConnectProps {
  userInfo?: any;
}

const Account: React.FC<IAccountProps> = props => {
  const { dispatch } = props;

  const onMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch({ type: 'global/logout' });
    }
  };

  const menu = (
    <Menu className={styles.menu} onClick={onMenuClick}>
      <Menu.Item key="userInfo">
        <Icon type="setting" />
        个人中心
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menu}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar className={styles.avatar}></Avatar>
        <span className={styles.name}>测试账户</span>
      </span>
    </HeaderDropdown>
  );
};

export default connect()(Account);