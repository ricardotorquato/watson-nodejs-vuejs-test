<template>
    <div class="chat">
        <div class="chatarea" id="chatarea" v-autoscroll="bottom">
            <div class="chatwindow">
                <h2 class="chattitle">Chat</h2>
                <ul>
                    <li class="robot"><strong>Robot: </strong> Olá, tudo bem?</li>
                </ul>
                <ul :key="index" v-for="(message, index) in messages">
                    <li :class="message.owner"><strong>{{ message.name }}: </strong> {{ message.value }}</li>
                    <li :key="replyindex" v-for="(reply, replyindex) in message.messages" :class="reply.owner"><strong>{{ reply.name }}: </strong> {{ reply.value }}</li>
                </ul>
                <br clear="both"/>
            </div>
        </div>
        <div class="messagearea">
            <div class="messagewindow">
                <input @keydown.enter="sendMessage" v-model="messageToSend" class="messageinput" />
                <button @click="sendMessage" class="messagebutton" type="button">Enviar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { autoscroll } from 'vue-autoscroll';

const URL_CHATBOT_API = 'http://localhost:3000/conversation/';

export default {
    data: () => ({
        messages: [],
        messageToSend: ''
    }),
    directives: {
        autoscroll
    },
    methods: {
        sendMessage() {
            if ( this.messageToSend.trim().length > 0 ) {
                const newMessage = {
                    owner: 'me',
                    name: 'Você',
                    value: this.messageToSend.trim(),
                    messages: [{
                        owner: 'robot',
                        name: 'Robot',
                        value: '....'
                    }]
                };

                this.messages.push(newMessage);

                this.messageToSend = '';
                
                axios.post(URL_CHATBOT_API, { text: newMessage.value })
                     .then(response => {
                         newMessage.messages = [];

                         response.data.output.text.map( text => {
                             newMessage.messages.push({
                                 owner: 'robot',
                                 name: 'Robot',
                                 value: text
                             });
                         });
                     });
            }
        }
    }
}
</script>

<style scoped>
.chat {
    overflow: hidden;
}

.chatarea {
    height: 85vh;
    overflow: auto;
}

.chattitle {
    width: 700px;
    margin: 0 auto;
    text-align: left;
    margin: 10px;
}

.chatwindow {
    margin: 0 auto;
    width: 700px;
}

ul {
    padding: 0;
}

li {
    list-style: none;
    padding: 20px;
    margin: 10px;
    width: 80%;
    clear: both;
    border-radius: 5px;
}

li.me {
    text-align: left;
    background-color: #d6f2ff;
    border: 1px solid #80bdda;
    color: #2c6c8a;
}

li.robot {
    text-align: right;
    background-color: #d7f3e2;
    color: #34734d;
    border: 1px solid #96bfa6;
    float: right;
}

.messagearea {
    height: 15vh;
    overflow: hidden;
}

.messagewindow {
    width: 700px;
    margin: 0 auto;
}

.messageinput {
    font-size: 15px;
    line-height: 30px;
    margin-top: 20px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 590px;
}

.messagebutton {
    width: 80px;
    line-height: 25px;
    background-color: #d6f2ff;
    border: 1px solid #80bdda;
    color: #2c6c8a;
    border-radius: 5px;
    cursor: pointer;
}
</style>
