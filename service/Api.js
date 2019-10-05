import axios from 'axios';


class Api {
    constructor(){

    }

    createUser(name, email, password){
        return axios.post("/api/user/createUser", {
            name: name,
            email: email,
            password: password
        })
    }

    login(email,password){
        return axios.post("/api/user/login", {
            email: email,
            password: password
        })
    }


}


export default Api
