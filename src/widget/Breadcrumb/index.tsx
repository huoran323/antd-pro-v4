import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import Link from 'umi/link';
import { ConnectProps } from '@/models/connect';

export interface IBreadcrumbProps extends ConnectProps {
  breadcrumbNameMap?: any[];
}

class CusBreadcrumb extends React.PureComponent<IBreadcrumbProps, any> {
  render() {
    const { breadcrumbNameMap } = this.props;
    console.log('breadcrumbNameMap --', breadcrumbNameMap);
    return <div>我是面包屑</div>;
  }
}

export default CusBreadcrumb;
