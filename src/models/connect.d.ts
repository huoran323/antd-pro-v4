import { AnyAction, Dispatch } from 'redux';
import { RouterTypes } from 'umi';

export interface Route {
  routes?: Route[];
}

// export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
//   dispatch?: Dispatch<AnyAction>;
// }

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<P extends { [K in keyof P]?: string } = {}>
  extends Partial<RouterTypes<any>> {
  dispatch?: Dispatch;
}
