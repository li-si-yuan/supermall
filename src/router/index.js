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
const Detail = () =>
    import ('views/detail/Detail.vue')




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
        },
        {
            path: '/detail/:iid',
            component: Detail
        }
    ]
})

export default router