import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { ConnectProps } from '@/models/connect';
import BaseMenu from './BaseMenu';
import styles from './index.less';
import { getFlatMenuKeys, getDefaultCollapsedSubMenus } from '@/utils/menu';

const { Sider } = Layout;

export interface ISiderMenu extends ConnectProps {
  menuList: any[];
}

class SiderMenuWrapper extends PureComponent<ISiderMenu> {
  // static getDerivedStateFromProps(props, state) {
  //   const { pathname } = state;
  //   if (props.location.pathname !== pathname) {
  //     return {
  //       pathname: props.location.pathname,
  //       openKeys: getDefaultCollapsedSubMenus(props),
  //     };
  //   }
  //   return null;
  // }

  state = {
    openKeys: getDefaultCollapsedSubMenus(this.props),
  };
  render() {
    const { openKeys } = this.state;
    const { menuList } = this.props;

    const flatMenuKeys = getFlatMenuKeys(menuList);
    const defaultProps = { openKeys };
    return (
      <Sider trigger={null} collapsible width={256} className={styles.sider}>
        <BaseMenu {...this.props} flatMenuKeys={flatMenuKeys} {...defaultProps}></BaseMenu>
      </Sider>
    );
  }
}

export default SiderMenuWrapper;
