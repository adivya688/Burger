import axios from "axios";

const instance = axios.create({ 
   baseURL: "https://react-my-burger-27704.firebaseio.com/"

})

export default instance;