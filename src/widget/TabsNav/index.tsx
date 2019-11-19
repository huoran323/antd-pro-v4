import React, { Component } from 'react';
import { ConnectProps, ConnectState } from '@/models/connect';

interface ITabsNavProps extends ConnectProps {
  children: any;
}

interface ITabsNavState extends ConnectState {}

class TabsNav extends Component<ITabsNavProps, ITabsNavState> {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default TabsNav;
