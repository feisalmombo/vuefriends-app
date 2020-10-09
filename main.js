// Vue.component('friend-component', {
//     props: ['friend'],
//     filters: {
//         ageInOneYear(age) {
//             return age + 1;
//         },
//         fullName(value) {
//             return `${value.last} ${value.first}`;
//         }
//     },
//     methods: {
//         decrementAge(friend) {
//             friend.age = friend.age - 1;
//         },
//         incrementAge(friend) {
//             friend.age = friend.age + 1;
//         },
//     },
//     template: `
//     <div>
//     <h4>{{ friend | fullName}}</h4>
//     <h5>{{ friend.age}}</h5>
//     <button v-on:click="decrementAge(friend)">-</button>
//     <button v-on:click="incrementAge(friend)">+</button>

//     <input v-model="friend.first"/>
//     <input v-model="friend.last"/>
//     </div>
//     `
// });


// const app = new Vue({
//     el: "#app",
//     data: {
//         friends: [{
//                 first: "Feisal",
//                 last: "Mombo",
//                 age: 27,
//             },
//             {
//                 first: "Johanan",
//                 last: "Mombo",
//                 age: 2,
//             }
//         ],
//     },
// name: "Bobby",
// age: 25,
//     feisal: {
//         first: "Feisal",
//         last: "Mombo",
//         age: 27,
//     },
//     johanan: {
//         first: "Johanan",
//         last: "Mombo",
//         age: 2,
//     }
// },
// computed: {
//     feisalFullName() {
//         return `${ this.feisal.first } ${ this.feisal.last }`
//     },

//     johananFullName() {
//         return `${ this.johanan.first } ${ this.johanan.last }`
//     },

//     johananAgeInOneYear() {
//         return this.johanan.age + 1;
//     }
// },
// filters: {
//     ageInOneYear(age) {
//         return age + 1;
//     },
//     fullName(value) {
//         return `${value.last} ${value.first}`;
//     }
// },
// methods: {
//     decrementAge(friend) {
//         friend.age = friend.age - 1;
//     },
//     incrementAge(friend) {
//         friend.age = friend.age + 1;
//     },
// },
// template: "<h1>Hi!</h1>"
// template: '<div><h1>Name: {{ feisal.name }}</h1> <h1>Age: {{ feisal.age }}</h1>   <h1>Name: {{ johanan.name }}</h1> <h1>Age: {{ johanan.age }}</h1> </div>'
// template: `
//             <div>
//             <friend-component v-for="item in friends" v-bind:friend="item"/>
//             </div>
//             `

// `
//     <div>
//     <h1>Name: {{ feisal | fullName }}</h1> 
//     <h1>Age: {{ feisal.age | ageInOneYear }}</h1> 
//     <h1>Name: {{ johanan | fullName }}</h1> 
//     <h1>Age: {{ johanan.age | ageInOneYear }}</h1> 
//     </div>
//     `
// <h1>Age: {{ feisal.age }} </h1> 
// <button v - on: click = "friend.age = friend.age + 1" > + < /button>

// })

// app.$mount("#app") To the console part

const app = new Vue({
    el: "#app",
    data: {
        editFriend: null,
        friends: [],
    },
    methods: {
        deleteFriend(id, i) {
            fetch("http://rest.learncode.academy/api/vue-5/friends/" + id, {
                    method: "DELETE"
                })
                .then(() => {
                    // console.log("DELETED!!!!!");
                    this.friends.splice(i, 1);
                })
        },
        updateFriend(friend) {
            fetch("http://rest.learncode.academy/api/vue-5/friends/" + friend.id, {
                    body: JSON.stringify(friend),
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(() => {
                    this.editFriend = null;
                })
        }
    },
    mounted() {
        // console.log("mounted!!!!");
        // used to apply to fetch an API
        fetch("http://rest.learncode.academy/api/vue-5/friends")
            .then(response => response.json())
            .then((data) => {
                this.friends = data;
            })
    },
    template: `
    <div>
      <li v-for="friend, i in friends">
      <div v-if="editFriend === friend.id">
      <input v-on:keyup.13="updateFriend(friend)" v-model="friend.name" />
      <button v-on:click="updateFriend(friend)">save</button>
      </div>

      <div v-else>
      <button v-on:click="editFriend = friend.id">edit</button>
      <button v-on:click="deleteFriend(friend.id, i)">x</button>
      {{friend.name}}
      </div>
      </li>
    </div>
    `,
});