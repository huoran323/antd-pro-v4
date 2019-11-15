import request from '@/utils/request';

interface FormDataType {
  username: string;
  password: string;
}

interface UserInfoParam {
  username: string;
}

export async function loginRequest(params: FormDataType) {
  return request('/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function getUserInfo(params: UserInfoParam) {
  return request('/user/getUserInfo', {
    method: 'POST',
    data: params,
  });
}
