const Sailors = {
    template: `
<div id="profile">

<h1 v-if="!boats">Sailor list</h1>

<h1 v-if="boats">{{user.username}}'s boat list</h1>

        <router-link to="/dashboard" style="margin-top: 2%; margin-bottom: 3%" id="dashboard" class="btn btn-success" tag="button">Dashboard</router-link>

        <div v-if="!boats" id="cards">
            <figure class="card card--water" v-for="sail in sailors" :key="sailors">
                <div class="card__image-container">
                    <img src="https://d2mtioty8nfglf.cloudfront.net/eyJidWNrZXQiOiJwcm9kd2ViYXNzZXRzIiwia2V5IjoiYm9hdHMvNjYwNDYzNC82NjA0NjM0XzIwMTkxMDA5MTAwNzI4ODA1XzFfWExBUkdFLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0Ijo2ODMsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI0MSwiZyI6MjQ1LCJiIjoyNDgsImFscGhhIjoxfX19fQ==" alt="Eevee" class="card__image">
                </div>

                <figcaption class="card__caption">
                    <h1 class="card__name">Sailor</h1>

                    <table class="card__stats">
                        <tbody><tr>
                            <th>Username</th>
                            <td>{{sail.username}}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{{sail.email}}</td>
                        </tr>

                        <button v-on:click="show_boats(sail.username)">See boats</button>

                        </tbody>
                    </table>
                </figcaption>
            </figure>
    </div>

    <div v-if="boats" id="cards2">
        <figure class="card card--normal" v-for="boat in user.boats" :key="user">
            <div class="card__image-container">
                <img v-bind:src=boat.boat_image alt="Eevee" class="card__image">
            </div>

            <figcaption class="card__caption">
                <h1 class="card__name">Boat</h1>

                <table class="card__stats">
                    <tbody><tr>
                        <th>Boat name</th>
                        <td>{{boat.boat_name}}</td>
                    </tr>
                    <tr>
                        <th>Boat location</th>
                        <td>{{boat.boat_location}}</td>
                    </tr>

                    <tr>
                        <th>Boat type</th>
                        <td>{{boat.boat_type}}</td>
                    </tr>

                    <tr>
                        <th>Boat year</th>
                        <td>{{boat.boat_year}}</td>
                    </tr>

                    <button v-on:click="show_boats('')">Go back</button>

                    </tbody>
                </table>
            </figcaption>
        </figure>
    </div>

</div>
	`,
    data: function (){
        return {
            boats: false,
            user: [],
            sailors: []
        }
    },
    methods: {
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
        show_boats: function (username){
            this.user = this.sailors[this.sailors.findIndex(sailor =>  sailor.username == username)];
            this.boats = !this.boats;
        }
    },
    mounted: function (){
        this.list_sailors();
    },
}