import axios from "axios";

export default {
  createUser: async userProfile =>
    await axios.post(process.env.VUE_APP_API + "/user/create", userProfile)
};
