import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { ConnectProps } from '@/models/connect';
import BaseMenu from './BaseMenu';
import styles from './index.less';

const { Sider } = Layout;

export interface ISiderMenu extends ConnectProps {
  menuList: any[];
}

class SiderMenuWrapper extends PureComponent<ISiderMenu> {
  render() {
    const { menuList } = this.props;

    return (
      <Sider trigger={null} collapsible width={256} className={styles.sider}>
        <div>测试</div>
        <BaseMenu {...this.props}></BaseMenu>
      </Sider>
    );
  }
}

export default SiderMenuWrapper;
