import React from 'react';
import { Icon } from 'antd';
import { urlPattern } from './validate';
import pathToRegexp from 'path-to-regexp';
import { appRoutes } from '../../config/routerConfig';

/**
 * 获取 icon
 * @param icon string
 * @param className
 * @returns {any}
 * @example 'setting', 'http://demo.com/icon.png', <Icon type="setting" />
 * 判断icon是地址还是type
 */
export const getIcon = (icon, className?) => {
  if (typeof icon === 'string' && urlPattern.test(icon)) {
    return <img src={icon} alt="icon" className={className} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} style={{ fontSize: 14, marginRight: 6 }} />;
  }
  return icon;
};

/**
 * 递归获取菜单中的路由集合
 * @param {IMenuItemProps[]} menus
 * @returns {string[]}
 * @example [{path: '/mail'}, {path: '/customer', children: {path: 'all' }}] => ['/mail', '/customer', '/customer/all']
 */
export const getFlatMenuKeys = (menus): string[] => {
  let keys = [];
  menus.forEach(item => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};

/**
 * 基于 path 找出所有匹配的 menuKeys
 * @param {string[]} flatMenuKeys
 * @param {string} path
 * @returns {string[]}
 * @example (['/abc', '/abc/:id', '/abc/:id/info'], '/abc') => ['/abc', '/abc/11', '/abc/11/info']
 */
export const getMenuMatches = (flatMenuKeys: string[], path: string): string[] => {
  return flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });
};

/**
 * 将一个 url 拆分成 paths 数组
 * @param {string} url /customer/all
 * @returns {string[]} ['/customer', 'customer/all']
 */
export function urlToList(url: string): string[] {
  const urlList = url.split('/').filter(i => i);
  return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}

/**
 * 根据 pathname 获取默认展开的 subMenu
 * @param props
 * @returns {string[]}
 */
export const getDefaultCollapsedSubMenus = props => {
  const {
    location: { pathname },
    menuList,
  } = props;

  const flatMenuKeys = getFlatMenuKeys(menuList);
  return urlToList(pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item);
};

/**
 * 合并路由配置
 */
export const mergeMenuList = menuList => {
  const merge = (data, config) => {
    data.forEach(item => {
      item.path = item.path || item.url;

      // 匹配的config中定义的菜单
      const menu = config.find(i => i.path === item.path);
      if (menu) {
        // 如果后台返回菜单名和图标使用后台的，否则使用前台定义的
        item.name = item.name || menu.name;
        item.icon = item.icon || menu.icon;
      }

      if (menu && menu.children && menu.children.length) {
        // 合并隐藏菜单
        const hideMenu = menu.routes.filter(item => item.hideInMenu).filter(i => i);

        item.children = [...item.children, ...hideMenu];
        merge(item.children, menu.routes);
      }
    });
  };

  const menuConfig = appRoutes.filter(item => !item.hideInMenu);
  merge(menuList, menuConfig);
  return menuList;
};
