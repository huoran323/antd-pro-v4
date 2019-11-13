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
  static getDerivedStateFromProps(props, state) {
    const { pathname } = state;
    if (props.location.pathname !== pathname) {
      return {
        pathname: props.location.pathname,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

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

  handleOpenChange = openKeys => {
    console.log('openKeys ====', openKeys);
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({ openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys] });
  };
  render() {
    const { openKeys } = this.state;
    const { menuList } = this.props;

    const flatMenuKeys = getFlatMenuKeys(menuList);
    const defaultProps = { openKeys };
    return (
      <Sider trigger={null} collapsible width={256} className={styles.sider}>
        <BaseMenu
          {...this.props}
          flatMenuKeys={flatMenuKeys}
          handleOpenChange={this.handleOpenChange}
          {...defaultProps}
        ></BaseMenu>
      </Sider>
    );
  }
}

export default SiderMenuWrapper;
