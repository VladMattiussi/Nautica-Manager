const Register = {
    template: `
<div id="login-box">
    <div class="login">
        <h1>Register</h1>

        <input required v-model="new_member.username" type="text" name="username" placeholder="Username" />
        <input required v-model="new_member.email" type="text" name="email" placeholder="E-mail"  required pattern="[^]+@[^]+[.][a-z]{2,63}$" />
        <input required v-model="new_member.password" type="password" name="password" placeholder="Password" />
        <input type="checkbox" id="operator"  v-model="checked" name="operator" value="operator"> <div id="textbox">Register as operator</div>

        <input @click.prevent="add_member(checked)" type="submit" name="signup_submit" value="Register" />
    </div>

    <div v-if="error_check" class="error-message">
        <span class="error-text">Checkout could not be completed. Please check your login information and try again.</span>
    </div>

    <router-link to="/" class="btn btn-success" tag="button">Home</router-link>
    
</div>
	`,
    data: function (){
        return {
            checked: false,
            error_check: false,
            operators: [],
            sailors: [],
            new_member:{
                "username" : "",
                "email" : "",
                "password": ""
            }
        }
    },
    methods: {
        add_member: function (checked){
            if(this.new_member.username != "" && this.new_member.password != "" && this.new_member.email != "") {
                if (checked) {
                    this.add_operator();
                } else {
                    this.add_sailor();
                }
            }
            else{
                this.error_check = true;
                setTimeout(() => this.error_check = false, 4000)
            }
        },
        list_sailors : function (){
            axios.get("http://localhost:3000/api/sailors")
                .then(response => {
                    console.log(response.data)
                    this.sailors = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        list_operators : function (){
            axios.get("http://localhost:3000/api/operators")
                .then(response => {
                    console.log(response.data)
                    this.operators = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        add_operator: function () {
            axios.post('/api/operators', this.new_member)
                .then(response => {
                    if(response.data.auth){
                        this.operators.push(response.data);
                        localStorage.setItem('jwt',response.data.token);
                        localStorage.setItem('user',JSON.stringify(response.data.user));
                        localStorage.setItem('type',"operator");
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
        },
        add_sailor: function () {
            axios.post('/api/sailors', this.new_member)
                .then(response => {
                    if(response.data.auth){
                        this.sailors.push(response.data);
                        localStorage.setItem('jwt',response.data.token);
                        localStorage.setItem('user',JSON.stringify(response.data.user));
                        localStorage.setItem('type',"sailor");
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
    mounted: function () {
        this.list_operators();
        this.list_sailors();
    },
}