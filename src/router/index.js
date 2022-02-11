import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/posts-page',
    component: () => import('@/views/PostsPage.vue'),
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/another',
    component: () => import('@/views/Another.vue'),
  },
  {
    path: '/PostIdPage/:id',
    name: 'PostIdPage',
    component: () => import('@/views/PostIdPage.vue'),
  },
  {
    path: '/store',
    component: () => import('../views/PostPageWithStore.vue'),
  },
  {
    path: '/composition',
    component: () => import('@/views/PostPageComposition.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
