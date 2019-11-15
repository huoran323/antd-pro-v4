import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { ConnectProps } from '@/models/connect';

import Account from './Account';
import styles from './index.less';

interface IGlobalProps extends ConnectProps {
  userInfo: any;
}

export default class GlobalHeader extends PureComponent<IGlobalProps> {
  render() {
    const { userInfo } = this.props;
    return (
      <div className={classNames(styles.header)}>
        <div className={styles.content}>
          <Account userInfo={userInfo}></Account>
        </div>
      </div>
    );
  }
}
