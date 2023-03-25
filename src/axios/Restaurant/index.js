import axios from "../axios.js";

export const getRestaurant = async (id) => {
  try {
    const data = await axios.get(`/restaurant/${id}`);
    return data.data[0];
  } catch (err) {
    return err;
  }
};
