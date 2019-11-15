import { AnyAction, Dispatch } from 'redux';
import { EffectsCommandMap } from 'dva';
import { RouterTypes } from 'umi';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { IGlobalModelState } from './global';
import { ILoginModelState } from './login';

export { IGlobalModelState, ILoginModelState };

// export interface Route {
//   routes?: Route[];
// }

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    userLogin?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  userLogin: ILoginModelState;
  global: IGlobalModelState;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

// export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
//   dispatch?: Dispatch<AnyAction>;
// }

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<P extends { [K in keyof P]?: string } = {}>
  extends Partial<RouterTypes<any>> {
  dispatch?: Dispatch;
  form?: WrappedFormUtils;
}
