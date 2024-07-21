import { createRouter, createWebHistory } from 'vue-router';
import ImageEditor from '../components/ImageEditor.vue';

const routes = [
  {
    path: '/editor',
    name: 'ImageEditor',
    component: ImageEditor
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
