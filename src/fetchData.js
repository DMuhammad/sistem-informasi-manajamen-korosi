import axios from "axios";

export default async function fetchData() {
  try {
    const response = await axios.get("https://api.dzrmhmd.dev/api/corrosions");
    const result = await response.data;
    return result;
  } catch (error) {
    return error;
  }
}
