import Vue from 'vue'
import Router from 'vue-router'

const Home = () =>
    import ('../views/home/Home')
const Category = () =>
    import ('../views/category/Category')
const ShopCart = () =>
    import ('../views/shopcart/ShopCart.vue')
const Profile = () =>
    import ('../views/profile/Profile')




Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/ShopCart',
            component: ShopCart
        },
        {
            path: '/category',
            component: Category
        },
        {
            path: '/profile',
            component: Profile
        }
    ]
})

export default router