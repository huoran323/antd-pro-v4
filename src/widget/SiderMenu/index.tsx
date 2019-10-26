import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { ConnectProps } from '@/models/connect';

export interface ISiderMenu extends ConnectProps {
  menuList: any[];
}

class SiderMenuWrapper extends PureComponent<ISiderMenu> {}
