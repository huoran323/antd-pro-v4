import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { ConnectProps } from '@/models/connect';
import Debounce from 'lodash-decorators/debounce';
import { Icon } from 'antd';
import Account from './Account';
import styles from './index.less';

import Breadcrumb from '../Breadcrumb';

interface IGlobalProps extends ConnectProps {
  userInfo: any;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export default class GlobalHeader extends PureComponent<IGlobalProps> {
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  // 切换collapsed
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  render() {
    const { userInfo, collapsed, location, ...restProps } = this.props;
    return (
      <div className={classNames(styles.header)}>
        <div className={classNames('row-center', styles.operate)}>
          <span className={styles.trigger} onClick={this.toggle}>
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
          </span>
        </div>
        <Breadcrumb showIcon={true} location={location} {...restProps} />

        <div className={styles.content}>
          <Account userInfo={userInfo}></Account>
        </div>
      </div>
    );
  }
}
