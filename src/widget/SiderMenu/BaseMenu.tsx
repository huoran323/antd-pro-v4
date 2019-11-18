import React, { PureComponent } from 'react';
import { Menu } from 'antd';
import Link from 'umi/link';
import { getIcon, getMenuMatches, urlToList } from '@/utils/menu';
const { SubMenu } = Menu;

export default class BaseMenu extends PureComponent<any> {
  /**
   * 获得菜单子节点
   */
  getNavMenuItems = menuList => {
    if (!menuList) {
      return [];
    }
    return menuList
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item));
  };

  /**
   * 获取 SubMenu 或 MenuItem
   */
  getSubMenuOrItem = item => {
    /**
   * some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
        some() 方法会依次执行数组的每个元素：
        如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
        如果没有满足条件的元素，则返回false。
   */
    if (item.children && item.children.some(child => child.name)) {
      //遍历是否是SubMenu
      const { name } = item;

      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    // 以下是MenuItem
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   */
  getMenuItemPath = item => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location } = this.props;

    return (
      <Link to={itemPath} target={target} replace={itemPath === location.pathname}>
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  // 去除多余斜杠
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  // 获取当前选中的菜单
  getSelectedMenuKeys = pathname => {
    const { flatMenuKeys } = this.props;
    //pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
  };

  render() {
    const {
      menuList,
      openKeys,
      location: { pathname },
    } = this.props;

    let selectedKeys = this.getSelectedMenuKeys(pathname).filter(i => i);
    if (!selectedKeys.length) {
      if (openKeys && openKeys.length) {
        selectedKeys = [openKeys[openKeys.length - 1]];
      } else {
        selectedKeys = ['/'];
      }
    }
    let props = {};
    if (openKeys) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }

    const { handleOpenChange } = this.props;

    return (
      <Menu
        key="Menu"
        theme="dark"
        mode="inline"
        inlineIndent={24}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedKeys}
        {...props}
      >
        {this.getNavMenuItems(menuList)}
      </Menu>
    );
  }
}
