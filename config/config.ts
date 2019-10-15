import { IConfig, IPlugin } from 'umi-types';

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
        immer: true,
      },
      dynamicImport: { webpackChunkName: true },
      title: '后台管理系统',
      dll: true,
      locale: {
        enable: true,
        default: 'zh-CN',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    },
  ],
];

const config: IConfig = {
  plugins,
  hash: true,
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              path: '/user/login',
              component: './user/login',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              name: 'analysis',
              path: '/dashboard/analysis',
              component: './dashboard/analysis',
            },
          ],
        },
      ],
    },
  ],
  proxy: {
    '/api': {
      target: 'http://139.159.248.18:80',
      // target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: { '': '' },
    },
  },
};
export default config;

// ref: https://umijs.org/config/
// const config: IConfig = {
//   treeShaking: true,
//   plugins: [
//     // ref: https://umijs.org/plugin/umi-plugin-react.html
//     ['umi-plugin-react', {
//       antd: true,
//       dva: true,
//       dynamicImport: { webpackChunkName: true },
//       title: 'antd-pro-v4',
//       dll: true,
//       locale: {
//         enable: true,
//         default: 'en-US',
//       },
//       routes: {
//         exclude: [
//           /models\//,
//           /services\//,
//           /model\.(t|j)sx?$/,
//           /service\.(t|j)sx?$/,
//           /components\//,
//         ],
//       },
//     }],
//   ],
// };
//
// export default config;
