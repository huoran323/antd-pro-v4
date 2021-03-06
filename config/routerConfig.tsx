/**
 * hideInMenu: 在侧边菜单栏隐藏
 * showTabNav: 是否展示在标签导航中
 * multiple: 不同参数是否开启多个标签页
 * shouldCache: 是否缓存(默认会缓存)
 */
const appRoutes = [
  {
    path: '/home',
    name: '首页',
    icon: 'home',
    routes: [
      {
        path: '/home/driver',
        name: '引导指南',
        component: './driver',
      },
    ],
  },
  {
    path: '/dashboard',
    name: '仪表盘',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard/analysis',
        name: '分析页',
        component: './dashboard/analysis',
      },
      {
        path: '/dashboard/workplace',
        name: '工作台',
        component: './dashboard/workplace',
      },
    ],
  },
  {
    path: '/list',
    name: '列表',
    icon: 'unordered-list',
    routes: [
      {
        path: '/list/basic',
        name: '基础列表',
        component: './list/basic',
      },
      {
        path: '/list/complex',
        name: '复杂列表',
        component: './list/complex',
      },
    ],
  },
];

module.exports = {
  appRoutes,
  routerList: [
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
          routes: appRoutes,
        },
      ],
    },
  ],
};
