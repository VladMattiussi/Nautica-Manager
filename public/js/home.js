const Home = {
    template: `
<div id="boat-app">

<h1>Join the nautic community!</h1>

<p>
        <router-link to="/register" class="btn btn-success" tag="button">Register now!</router-link>
</p>

<p>
    <router-link to="/login" class="btn btn-success" tag="button">Login now!</router-link>
</p>

</div>
	`,
    data: function (){
        return {
            permission: false,
        }
    },
    methods: {
        check_permission: function (){
            if(localStorage.getItem('jwt') != null){
                this.permission = true;
                console.log(localStorage.getItem('user'));
            }
        }
    },
    mounted: function (){
        this.check_permission();
    },
}