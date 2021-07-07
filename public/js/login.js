const Login = {
    template: `
<div id="login-box">
    <div class="login">
        <h1>Login</h1>
        <form>
        <input required v-model="member.username" type="text" name="username" placeholder="Username" />
        <input required v-model="member.password" type="password" name="password" placeholder="Password" />
        <input type="checkbox" id="operator"  v-model="checked" name="operator" value="operator"> <div id="textbox">Login as operator</div>

        <input v-on:click.prevent="check_member(checked,member.username)" type="submit" name="signup_submit" value="Login" />
        </form>
    </div>

    <div v-if="error_check" class="error-message">
        <span class="error-text">{{error_message}}</span>
    </div>
    <router-link to="/" class="btn btn-success" tag="button">Home</router-link>

</div>

	`,
    data: function (){
        return {
            checked: false,
            error_check: false,
            error_message: "Checkout could not be completed. Please check your login information and try again.",
            operators: [],
            sailors: [],
            member:{
                "username" : "",
                "password": ""
            }
        }
    },
    methods: {
        check_member: function (checked,username){
            if(this.member.username != "" && this.member.password != "") {
                if (checked) {
                    this.get_operator(username);
                } else {
                    this.get_sailor(username);
                }
            }
            else{
                this.error_check = true;
                setTimeout(() => this.error_check = false, 4000)
            }
        },
        get_operator: function (username) {
            axios.post('/api/operators/'+username, this.member)
                .then(response => {
                    console.log(response);
                    if(response.data.auth){
                        localStorage.setItem('jwt',response.data.token);
                        localStorage.setItem('user',JSON.stringify(response.data.user[0]));
                        localStorage.setItem('type',"operator");
                        this.$router.push('/dashboard');
                    }
                    else{
                        console.log("failure");
                        this.error_check = true;
                        setTimeout(() => this.error_check = false, 4000)
                    }
                })
        },
        get_sailor: function (username) {
            axios.post('/api/sailors/'+username, this.member)
                .then(response => {
                    console.log(response);
                    if(response.data.auth){
                        localStorage.setItem('jwt',response.data.token);
                        localStorage.setItem('user',JSON.stringify(response.data.user[0]));
                        localStorage.setItem('type','sailor');
                        this.$router.push('/dashboard');
                    }
                    else{
                        console.log("failure");
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.error_check = true;
                    setTimeout(() => this.error_check = false, 4000)
                })
        }
    },
}