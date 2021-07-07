const router = new VueRouter({
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/login', name: 'Login', component: Login },
        { path: '/register', name: 'Register', component: Register },
        { path: '/dashboard', name: 'Dashboard', component: Dashboard },
        { path: '/sailors', name: 'Sailors', component: Sailors },
        { path: '/operators', name: 'Operators', component: Operators },
        { path: '/chat', name: 'Chat', component: Chat },
        { path: '/:pathMatch(.*)*', component: Home }
    ]
})
