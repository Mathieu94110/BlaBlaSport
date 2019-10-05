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

    getMagasins(category, location){
        return axios.post("/api/magasin/getMagasins", {
            category: category,
            location: location
        });
    }


}


export default Api
