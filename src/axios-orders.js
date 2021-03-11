import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-6f351-default-rtdb.firebaseio.com/",
});

export default instance;
