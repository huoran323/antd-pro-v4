import { Reducer, AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { routerRedux } from 'dva/router';
import { getRedirect } from '@/utils';
import { mergeMenuList } from '@/utils/menu';
import { fetchMenus } from '@/services/global';

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
    logout: Effect;
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
    // 获取当前用户及菜单数据
    *getMenu({ payload }, { call, put }) {
      const data = yield call(fetchMenus, payload);

      const menuList = mergeMenuList(data);

      yield put({
        type: 'updateState',
        payload: {
          menuList,
          // breadcrumbNameMap,
        },
      });
      const params = new URL(window.location.href);
      console.log('params --', params);
      let redirect = params.pathname;
      // yield put(routerRedux.push({ pathname: '/' }));
      if (params.pathname !== '/user/login') {
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        yield put(routerRedux.replace('/'));
      }
    },
    *logout(_, { put }) {
      yield put(routerRedux.push({ pathname: '/user/login' }));
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
