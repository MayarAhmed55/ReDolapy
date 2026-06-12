import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Recycle from '../views/Recycle.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import AboutPage from '../views/AboutPage.vue'
import Brands from '../views/Brands.vue'
import AboutRecycle from '../views/AboutRecycle.vue'
import TryOn from '../views/TryOn.vue'
import UserWardrobe from '../views/userWardrobe.vue'
import Pricing from '../views/pricing.vue'
import AboutTryon from '../views/AboutTryon.vue'
import Wardrobe from '../views/Wardrobe.vue'


const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LogIn},
  { path: '/SignUp', component: SignUp },
  { path: '/AboutPage', component: AboutPage },
  { path: '/Brands', component: Brands }, 
  { path: '/AboutRecycle', component:  AboutRecycle},
  { path: '/AboutTryon', component: AboutTryon },
  { path: '/Recycle', component: Recycle },
  { path: '/TryOn', component: TryOn },
  { path: '/pricing', component: Pricing },
  {path: '/wardrobe', component: Wardrobe},    
  { path: '/userWardrobe', component: UserWardrobe },
  { path: '/auth/callback', component: () => import('../views/GoogleCallback.vue')}
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router