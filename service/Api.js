import axios from 'axios';
import Axios from 'axios';


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


    createSport(nom){
        return axios.post("/api/user/createSport",{
        
            nom:nom

        }
        

        )
    }

    getSports(){
        return axios.get("/api/user/getSports");
    }


}


export default Api
