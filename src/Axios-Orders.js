import axios from "axios";

const instance = axios.create({
  baseURL:"https://burger-builder-db98e-default-rtdb.firebaseio.com/"
})
export default instance;
