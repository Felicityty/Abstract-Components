import Vue from 'vue'
import Router from 'vue-router'
import ListPage from '@/view/index'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'ListPage',
      component: ListPage
    }
  ]
});

export default router;
