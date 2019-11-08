import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { ConnectProps } from '@/models/connect';

import Account from './Account';
import styles from './index.less';

interface IGlobalProps extends ConnectProps {}

export default class GlobalHeader extends PureComponent<IGlobalProps> {
  render() {
    return (
      <div className={classNames(styles.header)}>
        <div className={styles.content}>
          <Account></Account>
        </div>
      </div>
    );
  }
}
