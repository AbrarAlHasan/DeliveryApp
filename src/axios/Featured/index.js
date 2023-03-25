import axios from "../axios";

export const getFeatured = async () => {
  try {
    const data = await axios.get("/featured");
    return data.data;
  } catch (err) {
    return err;
  }
};
