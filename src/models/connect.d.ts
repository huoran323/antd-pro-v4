import { AnyAction, Dispatch } from 'redux';
import { RouterTypes } from 'umi';

export interface Route  {
  routes?: Route[];
}

export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}
