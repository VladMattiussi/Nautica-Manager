const Chat = {
    template: `
<div id="chat">
<div id="form_nickname">
    <router-link to="/dashboard" id="dashboard" class="btn btn-success" tag="button">Dashboard</router-link>
</div>
<ul id="messages" v-for="msg in mess" :key="mess">
    <li style="background-color:#dadada;" v-if="mess.indexOf(msg) % 2 == 0">{{msg.nickname+': '+msg.content}}</li>
    <li v-if="mess.indexOf(msg) % 2 != 0">{{msg.nickname+': '+msg.content}}</li>
</ul>
<form id="form_messages">
    <input v-model="data_mess.content" id="m" type="text" autocomplete="off" />
    <button @click.prevent="send()" class="btn btn-success">Send</button>
</form>
</div>

	`,
    data: function (){
        return {
            mess: [],
            nickname: '',
            data_mess: {
                'content': '',
                'nickname': ''
            },
            permission: false
        }
    },
    methods: {
        check_permission: function (){
            if(localStorage.getItem('jwt') != null){
                this.permission = true;
            }
        },
        list_chat: function (){
            axios.get("http://localhost:3000/chat/messages")
                .then(response => {
                    this.mess = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        update_chat: function (){
            axios.post('/chat/messages', this.data_mess)
                .then(response => {
                    this.data_mess = {
                        'content': '',
                        'nickname': ''
                    };
                })
                .catch(error => {
                    console.log(error);
                })
        },
        send: function (){
            this.data_mess.nickname = this.nickname;
            socket.emit('chat message',this.data_mess.content);
            this.update_chat();
        }
    },
    mounted: function (){
        this.check_permission();
        this.list_chat();
        this.nickname = JSON.parse(localStorage.getItem('user')).username;
        socket.emit('change nickname',this.nickname);
        socket.on('chat message', (msg) => {
            this.mess.push(msg);
        });
    },
}