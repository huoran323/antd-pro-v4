import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { ConnectProps } from '@/models/connect';
import BaseMenu from './BaseMenu';
import styles from './index.less';
import { getFlatMenuKeys, getDefaultCollapsedSubMenus } from '@/utils/menu';
import logo from '@/assets/logo.svg';

const { Sider } = Layout;

export interface ISiderMenu extends ConnectProps {
  menuList: any[];
  collapsed?: boolean;
  onCollapse?: (collapsed) => void;
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

  isMainMenu = key => {
    const { menuList } = this.props;
    return menuList.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  // onOpenChange	SubMenu 展开/关闭的回调	function(openKeys: string[]) openKeys是默认的参数，不需要手动传输
  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({ openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys] });
  };
  render() {
    const { openKeys } = this.state;
    const { collapsed, onCollapse, menuList } = this.props;

    const flatMenuKeys = getFlatMenuKeys(menuList);
    const defaultProps = collapsed ? {} : { openKeys };
    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="lg"
        width={256}
        className={styles.sider}
      >
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1>通用后台管理系统</h1>
        </div>
        <BaseMenu
          {...this.props}
          flatMenuKeys={flatMenuKeys}
          handleOpenChange={this.handleOpenChange}
          onOpenChange={this.handleOpenChange}
          style={{ padding: '12px 0', width: '100%' }}
          {...defaultProps}
        ></BaseMenu>
      </Sider>
    );
  }
}

export default SiderMenuWrapper;
