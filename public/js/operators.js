const Operators = {
    template: `
<div id="profile">

<h1 v-if="!service">Operator list</h1>

<h1 v-if="service">{{user.username}}'s service list</h1>

        <router-link to="/dashboard" style="margin-top: 2%; margin-bottom: 3%" id="dashboard" class="btn btn-success" tag="button">Dashboard</router-link>

    <div v-if="!service" id="cards">
        <figure class="card card--grass" v-for="op in operators" :key="operators">
            <div class="card__image-container">
                <img src="https://d178ivhysawugh.cloudfront.net/1594370813/fsv-1.jpg" alt="Eevee" class="card__image">
            </div>

            <figcaption class="card__caption">
                <h1 class="card__name">Operator</h1>

                <table class="card__stats">
                    <tbody><tr>
                        <th>Username</th>
                        <td>{{op.username}}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{{op.email}}</td>
                    </tr>

                    <button v-on:click="show_services(op.username)">See services</button>

                    </tbody>
                </table>
            </figcaption>
        </figure>
    </div>

    <div v-if="service" id="cards2">
        <figure class="card card--fire" v-for="service in user.services" :key="user">

            <figcaption class="card__caption">
                <h1 class="card__name">Service</h1>

                <table class="card__stats">
                    <tbody><tr>
                        <th>Name</th>
                        <td>{{service.name}}</td>
                    </tr>
                    <tr>
                        <th>Info</th>
                        <td><p style="width: 170px">{{service.info}}</p></td>
                    </tr>

                    <button v-on:click="show_services('')">Go back</button>

                    </tbody>
                </table>
            </figcaption>
        </figure>
    </div>

</div>
	`,
    data: function (){
        return {
            user: [],
            service: false,
            operators: []
        }
    },
    methods: {
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
        show_services: function (username){
            this.user = this.operators[this.operators.findIndex(operator =>  operator.username == username)];
            this.service = !this.service;
        }
    },
    mounted: function (){
        this.list_operators();
    },
}