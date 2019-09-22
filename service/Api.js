import axios from 'axios';


class Api {
    constructor(){
        this.mapboxToken = "pk.eyJ1Ijoic2VibXNoIiwiYSI6ImNqcmRoODN3azB1cDg0Nm1yY3dpZHFkZ2gifQ.OFKcQAPVJAQeLf3hi9HJXA"
    }


    getMagasins(category, location){
        return axios.post("/api/magasin/getMagasins", {
            category: category,
            location: location
        });
    }

    getMagasinsSearchBar(search){
        return axios.post("/api/magasin/getMagasinsSearchBar", {
            search: search
        });
    }

    searchAddress(address){
        console.log(address)
        return axios.post("/api/magasin/searchAddress", {
            address: address,
        });
    }

    addCompany(newCompany){
        return axios.post('/api/magasin/addCompany', {
            newCompany: newCompany
        });
    }

    uploadFile(formData){
        return axios.post('/api/magasin/uploadFile', formData)
    }

    login(email, password){
        return axios.post('/api/auth/login', {
            email: email,
            password: password
        })
    }

    signup(email, password, name){
        return axios.put('/api/auth/register', {
            email: email,
            password: password,
            name: name
        })
    }

    submitModifierMagasin(magasin){
      return axios.post('/api/magasin/submitModifierMagasin', {magasin: magasin})
    }

    // fonction pour obtenir le user
    getUser(token){
        return axios.post("/api/auth/getUser", {
            token: token
        })
    }

    // fonction pour mapbox directions

    goToMagasin(departure, arrival){

      const requestBody = {
        coordinates: departure[0]+","+departure[1]+";"+arrival[0]+","+arrival[1]
      }

      let data = "coordinates="+departure[0]+","+departure[1]+";"+arrival[0]+","+arrival[1]+"&steps=true"


      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      return axios.post("https://api.mapbox.com/directions/v5/mapbox/walking?access_token="+this.mapboxToken, data, config)
    }


}


export default Api
