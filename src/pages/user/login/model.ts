import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { loginRequest } from './service';

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
      yield put({
        type: 'saveInfo',
        payload: response,
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
