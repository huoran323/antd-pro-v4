import { IConfig, IPlugin } from 'umi-types';

const plugins: IPlugin[] = [
  ['umi-plugin-react', {
    antd: true,
    dva: true,
    dynamicImport: { webpackChunkName: true },
    title: 'antd-pro-v4',
    dll: true,
    locale: {
      enable: true,
      default: 'zh-CN',
    },
  }],
];

export default  {
  plugins,
  hash: true,
  routes: [
    {
      path: "/",
      component: "../layouts/BlankLayout",
      routes: [
        {
          path: "/user",
          component: "../layouts/UserLayout",
          routes: [
            {
              path: "/user",
              redirect: "/user/login"
            },
            {
              name: "login",
              path: "/user/login",
              component: "./user/login"
            }
          ]
        }
      ]
    }
  ]
} as IConfig


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