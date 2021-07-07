const Dashboard = {
    template: `
<div id="profile">

    <div v-if="permission">

        <h1>Dashboard</h1>

        <div id="utility">
            
            <router-link to="/sailors" style="background-color: chocolate" class="btn btn-success" tag="button">Sailor list</router-link>

            <router-link to="/operators" style="background-color: chocolate" class="btn btn-success" tag="button">Operator list</router-link>
            
            <router-link to="/chat" style="background-color: chocolate" class="btn btn-success" tag="button">Chat</router-link>

            <button id="logout" class="btn btn-success" v-if="localStorage.length > 0" v-on:click="log_out">Logout</button>
        </div>

    <div class="row">
        <div class="col">
            <button @click.prevent="adding = true" type="button" class="btn btn-success"><i class="fas fa-plus"></i> Add </button>
        </div>
    </div>

    </div>

    <div class="sailors" v-if="localStorage.getItem('type') == 'sailor'">

    <div class="row" v-if="adding">
        <div class="col">
            <form>
                <div class="form-group">
                    <label for="name">Boat name</label>
                    <input v-model="new_boat.boats[0].boat_name" type="text" class="form-control" id="name" placeholder="Enter name">
                </div>
                <div class="form-group">
                    <label for="type">Boat type</label>
                    <input v-model="new_boat.boats[0].boat_type" type="text" class="form-control" id="type" placeholder="Enter type">
                </div>
                <div class="form-group">
                    <label for="location">Boat location</label>
                    <input v-model="new_boat.boats[0].boat_location" type="text" class="form-control" id="location" placeholder="Enter location">
                </div>
                <div class="form-group">
                    <label for="release">Boat release year</label>
                    <input v-model="new_boat.boats[0].boat_year" type="text" class="form-control" id="release" placeholder="Enter year">
                </div>
                <div class="form-group">
                    <label for="release">Boat image</label>
                    <input v-model="new_boat.boats[0].boat_image" type="text" class="form-control" id="image" placeholder="Enter image">
                </div>
                <button @click.prevent="update_sailor(JSON.parse(localStorage.getItem('user')).username)" type="submit" class="btn btn-primary">Submit</button>
                <button @click.prevent="click" type="submit" class="btn btn-danger">Cancel</button>

            </form>
        </div>

    </div>
        <div id="cards2">
            <figure class="card card--normal" v-for="boat in actual_boat" :key="actual_boat">
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

                        <button v-on:click="delete_boat(JSON.parse(localStorage.getItem('user')).username,boat.boat_name)">Delete</button>

                        </tbody></table>

                </figcaption>
            </figure>
        </div>
    </div>

    <div class="operators" v-if="localStorage.getItem('type') == 'operator'">

    <div class="row" v-if="adding ">
        <div class="col">
            <form>
                <div class="form-group">
                    <label for="Service_name">Service name</label>
                    <input v-model="new_service.services[0].name" type="text" class="form-control" id="Service_name" placeholder="Enter service name">
                    <label for="Service_name">Service description</label>
                    <input v-model="new_service.services[0].info" type="text" class="form-control" id="Service_info" placeholder="Enter service description">
                </div>
                <button @click.prevent="update_operator(JSON.parse(localStorage.getItem('user')).username)" type="submit" class="btn btn-primary">Submit</button>
                <button @click.prevent="click" type="submit" class="btn btn-danger">Cancel</button>

            </form>
        </div>
    </div>

        <h2>My service list</h2>

        <div id="cards">
            <figure class="card card--fire" v-for="service in actual_service" :key="actual_service">

                <figcaption class="card__caption">
                    <h1 class="card__name">Service</h1>

                    <table class="card__stats">
                        <tbody><tr>
                            <th>Service name</th>
                            <td>{{service.name}}</td>
                        </tr>

                        <tr>
                            <th>Info</th>
                            <td><p style="width: 170px">{{service.info}}</p></td>
                        </tr>

                        <button v-on:click="delete_service(JSON.parse(localStorage.getItem('user')).username,service.name)">Delete</button>

                        </tbody></table>

                </figcaption>
            </figure>
        </div>
    </div>

</div>
	`,
    data: function (){
        return {
            permission: false,
            adding: false,
            sailors: [],
            actual_boat: [],
            actual_service: [],
            new_boat: {
                'boats':[{
                    'boat_name': '',
                    'boat_type': '',
                    'boat_location': '',
                    'boat_year': '',
                    'boat_image': '',
                }]
            },
            new_service: {
                'services': [{
                    'name': '',
                    'info': ''
                }]
            }
        }
    },
    methods: {
        log_out: function (){
            localStorage.clear();
            location.href='/';
        },
        check_permission: function (){
            if(localStorage.getItem('jwt') != null){
                this.permission = true;
            }
        },
        click: function (){
            this.adding = !this.adding;
        },
        update_sailor: function (username){
            var user = JSON.parse(localStorage.getItem('user'));
            for(i = 0; i < user.boats.length; i++){
                this.new_boat.boats.push(user.boats[i]);
            }

            if(this.new_boat.boats[0].boat_image == ""){
                this.new_boat.boats[0].boat_image = "https://images.assetsdelivery.com/compings_v2/get4net/get4net1711/get4net171100234.jpg";
            }
            this.actual_boat = this.new_boat.boats;

            axios.put('/api/sailors/'+username,this.new_boat)
                .then(response => {
                    localStorage.setItem('user',JSON.stringify(response.data));
                    this.new_boat = {
                        'boats':[{
                            'boat_name': '',
                            'boat_type': '',
                            'boat_location': '',
                            'boat_year': '',
                            'boat_image': ''
                        }]
                    }
                })
            this.click();
        },
        update_operator: function (username){
            var user = JSON.parse(localStorage.getItem('user'));
            for(i = 0; i < user.services.length; i++){
                this.new_service.services.push(user.services[i]);
            }
            this.actual_service = this.new_service.services;
            axios.put('/api/operators/'+username,this.new_service)
                .then(response => {
                    console.log(response.data);
                    localStorage.setItem('user',JSON.stringify(response.data));
                    this.new_service = {
                        'services': [{
                            'name': '',
                            'info': ''
                        }]
                    }
                    this.actual_service = JSON.parse(localStorage.getItem('user')).services;
                })
            this.click();
        },
        delete_boat: function (username,boat){
            var user = JSON.parse(localStorage.getItem('user'));
            for(i = 0; i < user.boats.length; i++){
                if(boat != user.boats[i].boat_name && user.boats[i].boat_name != ""){
                    this.new_boat.boats.push(user.boats[i]);
                }
            }
            if(user.boats.length == 1){
                this.new_boat.boats = [];
            }
            if(this.new_boat.boats.length != 0 && this.new_boat.boats[0].boat_name == ""){
                this.new_boat.boats.shift();
            }
            this.actual_boat = this.new_boat.boats;

            axios.put('/api/sailors/'+username,this.new_boat)
                .then(response => {
                    localStorage.setItem('user',JSON.stringify(response.data));
                    this.new_boat = {
                        'boats':[{
                            'boat_name': '',
                            'boat_type': '',
                            'boat_location': '',
                            'boat_year': '',
                            'boat_image': ''
                        }]
                    }
                })
        },
        delete_service: function (username,service){
            var user = JSON.parse(localStorage.getItem('user'));
            for(i = 0; i < user.services.length; i++){
                if(service != user.services[i].name && user.services[i].name != ""){
                    this.new_service.services.push(user.services[i]);
                }
            }
            if(user.services.length == 1){
                this.new_service.services = [];
            }
            if(this.new_service.services.length != 0 && this.new_service.services[0].name == ""){
                this.new_service.services.shift();
            }
            this.actual_service = this.new_service.services;

            axios.put('/api/operators/'+username,this.new_service)
                .then(response => {
                    console.log(response.data);
                    localStorage.setItem('user',JSON.stringify(response.data));
                    this.new_service = {
                        'services': [{
                            'name': '',
                            'info': ''
                        }]
                    }
                    this.actual_service = JSON.parse(localStorage.getItem('user')).services;
                })
        }
    },
    mounted: function (){
        this.check_permission();
        var user = JSON.parse(localStorage.getItem('user'));
        this.actual_boat = user.boats;
        this.actual_service = user.services;
    },
}