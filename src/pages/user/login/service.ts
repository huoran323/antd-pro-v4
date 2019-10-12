import request from '@/utils/request';
import { FormDataType } from './index';

export async function loginRequest(params: FormDataType) {
  return request('/user/login', {
    method: 'POST',
    data: params,
  });
}
