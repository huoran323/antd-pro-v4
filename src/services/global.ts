import request from '@/utils/request';

export async function fetchMenus(params: { user_type: string }) {
  return request('/user/getUserMenu', {
    method: 'POST',
    data: params,
  });
}
