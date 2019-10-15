import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';

export interface BasicLayoutProps {
  //   breadcrumbNameMap: {
  //     [path: string]: MenuDataItem;
  //   };
  //   settings: Settings;
  dispatch: Dispatch;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  return <div>基础</div>;
};

export default connect()(BasicLayout);
