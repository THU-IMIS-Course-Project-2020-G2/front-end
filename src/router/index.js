import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../components/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        redirect: '/welcome',
 
        component: () =>
            import ('../views/Home'),
        children: [{
                path: '/welcome',
       
                component: () =>
                    import ('../components/Welcome')
            },
            {
                path: '/params',
                component: () =>
                    import ('../components/goods/Params.vue')
            },
            {
                path:'/kitchen',
                component:()=>
                    import ('../components/goods/Kitchen.vue')
            },
            {
                path:'/test',
                component:()=>
                    import('../components/goods/Test.vue')
            },
            {
                path:'/cate',
                component:()=>
                    import ('../components/goods/Cate.vue')
            },
            {
                path:'/status',
                component:()=>
                    import ('../components/goods/Status.vue')
            },
            {
                path:'/order',
                component:()=>
                    import('../components/goods/Order.vue')
            },
            //{
              //  path:'/station',
                //component:()=>
                  //  import ('../components/goods/Station.vue')
            //},
            {
                path:'/system',
                component:()=>
                    import ('../components/goods/System.vue')

            },
            {
                path:'/kitchenCombined',
                component:()=>
                    import('../components/goods/KitchenComb.vue')
            },
            {
                path: '/goods',
            
                component: () =>
                    import ('../components/goods/List.vue')
            },
            {
                path: '/goods/add',
               
                component: () =>
                    import ('../components/goods/Add.vue')
            }
        ],
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ('../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})


//路由导航守卫
//router.beforeEach((to, from, next) => {
  //  if (to.path === '/login') return next()
    //const tokenStr = window.sessionStorage.getItem('token')
    //if (!tokenStr) return next('/login')
    //next()
//}) 
export default router