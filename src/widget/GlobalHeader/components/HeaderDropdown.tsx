import React from 'react';
import { Dropdown } from 'antd';
import cx from 'classnames';
import { DropDownProps } from 'antd/lib/dropdown';
import styles from '../index.less';

declare type OverlayFunc = () => React.ReactNode;
interface IHeaderDropdown extends DropDownProps {
  children?: any;
  className?: string;
  overlay: React.ReactNode | OverlayFunc;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

/**
 * React.forwardRef<T, P>: T -> 需要引用的元素类型， P -> 组件的 props 类型
 */
const HeaderDropdown = React.forwardRef<Dropdown, IHeaderDropdown>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <Dropdown overlayClassName={cx(styles.headerDropdown, className)} ref={ref} {...restProps} />
  );
});

export default HeaderDropdown;
