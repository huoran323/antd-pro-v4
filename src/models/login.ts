import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { loginRequest, getUserInfo } from '@/services/login';

export interface ILoginModelState {
  userInfo: any;
}

export interface ModelType {
  namespace: string;
  state: ILoginModelState;
  effects: {
    login: Effect;
    getUserInfo: Effect;
  };
  reducers: {
    saveInfo: Reducer<ILoginModelState>;
  };
}

const LoginModel: ModelType = {
  namespace: 'userLogin',
  state: {
    userInfo: {},
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(loginRequest, payload);
      const { username } = response;
      // 存储用户名
      localStorage.setItem('username', username);
      // 获取用户信息
      yield put({ type: 'getUserInfo', payload: username });
    },
    // 获取用户信息
    *getUserInfo({ payload }, { call, put }) {
      const userInfo = yield call(getUserInfo, {
        username: payload,
      });

      yield put({ type: 'saveInfo', payload: userInfo });
      const { user_type } = userInfo;

      // 获取菜单路由
      yield put({
        type: 'global/getMenu',
        payload: {
          user_type: user_type,
        },
      });
    },
  },
  reducers: {
    saveInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
};

export default LoginModel;
