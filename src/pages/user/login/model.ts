import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { loginRequest, getUserInfo } from './service';

export interface StateType {
  token: string;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
  };
  reducers: {
    saveInfo: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userLogin',
  state: {
    token: '',
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(loginRequest, payload);
      const { username } = response;
      // 获取用户信息
      const userInfo = yield call(getUserInfo, { username: username });

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
        token: payload.token,
      };
    },
  },
};

export default Model;
