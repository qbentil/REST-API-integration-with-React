import axios from 'axios'

const Axios = axios.create({
    baseURL: "https://mlsa-build-rest-api-workshop.onrender.com"
})

export default Axios