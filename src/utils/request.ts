import { extend } from 'umi-request';

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  return response;
};

const request = extend({
  //   prefix: '/api/v1',
  errorHandler,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default request;
