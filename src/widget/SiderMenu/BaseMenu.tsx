import React, { PureComponent } from 'react';
import { Menu } from 'antd';
import Link from 'umi/link';
import { getIcon } from '@/utils/menu';
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
      .filter(item => item.menu_name && !item.hideInMenu)
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
    if (item.childList && item.childList.some(child => child.menu_name)) {
      //遍历是否是SubMenu
      const { menu_name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{menu_name}</span>
              </span>
            ) : (
              menu_name
            )
          }
          key="item.id"
        >
          {this.getNavMenuItems(item.childList)}
        </SubMenu>
      );
    }
    // 以下是MenuItem
    return <Menu.Item key={item.id}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   */
  getMenuItemPath = item => {
    const { menu_name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{menu_name}</span>
        </a>
      );
    }
    const { location } = this.props;

    return (
      <Link to={itemPath} target={target} replace={itemPath === location.pathname}>
        {icon}
        <span>{menu_name}</span>
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

  render() {
    const { menuList } = this.props;
    return (
      <Menu theme="dark" mode="inline">
        {this.getNavMenuItems(menuList)}
      </Menu>
    );
  }
}
