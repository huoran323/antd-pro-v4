import { Reducer, AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { routerRedux } from 'dva/router';
import { getRedirect } from '@/utils';
import { getUserInfo } from '@/services/global';

export interface GlobalModelState {
  collapsed: boolean;
  menuList: any[];
  breadcrumbNameMap: any[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: GlobalModelState) => T) => T },
) => void;

export interface GlobalModel {
  namespace: string;
  state: GlobalModelState;
  effects: {
    getMenu: Effect;
  };
  reducers: {
    changeCollapsed: Reducer<any>;
    updateState: Reducer<any>;
  };
}

const Model: GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    menuList: [],
    breadcrumbNameMap: [],
  },
  effects: {
    *getMenu({ payload }, { call, put }) {
      const menuList = yield call(getUserInfo, payload);

      yield put({
        type: 'updateState',
        payload: {
          menuList,
          // breadcrumbNameMap,
        },
      });
      yield put(routerRedux.push({ pathname: '/' }));
    },
  },
  reducers: {
    changeCollapsed(state, { collapsed }) {
      return { ...state, collapsed };
    },
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
