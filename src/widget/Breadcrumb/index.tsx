import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import Link from 'umi/link';
import PathToRegexp from 'path-to-regexp';
import { ConnectProps } from '@/models/connect';
import { urlToList } from '@/utils/menu';
import styles from './index.less';

export interface IBreadcrumbProps extends ConnectProps {
  breadcrumbNameMap?: any[];
  breadcrumbSeparator?: React.ReactNode;
  home?: React.ReactNode;
  showIcon?: boolean; // 是否展示 icon 图标
  routes?: any[];
}

export const renderItemLocal = item => {
  // if (item.locale) {
  //   return projectConfig.menu.disableLocal
  //     ? item.name
  //     : formatMessage({ id: item.locale, defaultMessage: item.name });
  // }
  return item.name;
};

export const getBreadcrumb = (breadcrumbNameMap, url) => {
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(item => {
      if (PathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || {};
};

class CusBreadcrumb extends React.PureComponent<IBreadcrumbProps, any> {
  static defaultProps = {
    breadcrumbSeparator: '/',
  };

  constructor(props) {
    super(props);
  }

  conversionFromLocation = (location, breadcrumbNameMap) => {
    const { breadcrumbSeparator, home, showIcon } = this.props;
    const pathSnippets = urlToList(location.pathname);

    // Loop data mosaic routing
    const extraBreadcrumbItems = pathSnippets.map(url => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      if (currentBreadcrumb.inherited) {
        return null;
      }
      const name = renderItemLocal(currentBreadcrumb);
      return (
        <Breadcrumb.Item key={url}>
          {showIcon && currentBreadcrumb.icon && <Icon type={currentBreadcrumb.icon} />}
          <span>{name}</span>
        </Breadcrumb.Item>
      );
    });

    // Add home breadcrumbs to your head
    extraBreadcrumbItems.unshift(
      <Breadcrumb.Item key="home">
        {showIcon && <Icon type="home" />}
        <Link to="/home/driver">{home || '首页'}</Link>
      </Breadcrumb.Item>,
    );

    return <Breadcrumb separator={breadcrumbSeparator}>{extraBreadcrumbItems}</Breadcrumb>;
  };

  render() {
    const { breadcrumbNameMap, location } = this.props;

    let content = null;
    // 根据 location 生成面包屑
    if (location && location.pathname) {
      content = this.conversionFromLocation(location, breadcrumbNameMap);
    }
    return <div className={styles.breadcrumb}>{content}</div>;
  }
}

export default CusBreadcrumb;
