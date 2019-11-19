import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
import { Effect } from '@/models/connect';
// import { getRedirect } from '@/utils';
import { mergeMenuList, getBreadcrumbNameMap } from '@/utils/menu';
import { fetchMenus } from '@/services/global';
const routerConfig = require('../../config/routerConfig');

export interface IGlobalModelState {
  collapsed: boolean;
  menuList: any[];
  breadcrumbNameMap: any[];
}

export interface IGlobalModel {
  namespace: string;
  state: IGlobalModelState;
  effects: {
    getMenu: Effect;
    logout: Effect;
  };
  reducers: {
    changeCollapsed: Reducer<any>;
    updateState: Reducer<any>;
  };
}

const GlobalModel: IGlobalModel = {
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
      const breadcrumbNameMap = getBreadcrumbNameMap([...menuList, ...routerConfig.appRoutes]);

      yield put({
        type: 'updateState',
        payload: {
          menuList,
          breadcrumbNameMap,
        },
      });
      const params = new URL(window.location.href);

      let redirect = params.pathname;
      // yield put(routerRedux.push({ pathname: '/' }));
      if (params.pathname !== '/user/login') {
        yield put(routerRedux.replace(redirect || '/home/driver'));
      } else {
        yield put(routerRedux.replace('/home/driver'));
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

export default GlobalModel;
