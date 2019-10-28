import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { ConnectProps } from '@/models/connect';

const { Sider } = Layout;

export interface ISiderMenu extends ConnectProps {
  menuList: any[];
}

class SiderMenuWrapper extends PureComponent<ISiderMenu> {
  render() {
    return (
      <Sider trigger={null} collapsible width={256}>
        <div>测试</div>
      </Sider>
    );
  }
}

export default SiderMenuWrapper;
