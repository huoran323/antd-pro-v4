import React from 'react';
import { Icon } from 'antd';
import { urlPattern } from './validate';

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
