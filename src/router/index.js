import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IntroPage from '../views/IntroPage.vue';
import ToDo from '../views/ToDo.vue'
import TablePage from '../views/TablePage.vue' 
import CalendarPage from '../views/CalendarPage.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: IntroPage
    },

    {
      path: '/tablepage', 
      name: 'TablePage',
      component: TablePage 
    },
    {
      path: '/calendarpage', 
      name: 'CalendarPage',
      component: CalendarPage 
    },
    {
      path: '/todo',
      name: 'ToDo',
      component: ToDo,
      props: (route) => ({ tasks: JSON.parse(route.query.tasks || '[]') }),
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
