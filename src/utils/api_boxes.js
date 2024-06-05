import axios from "axios";

const API_URL = "http://localhost:5000";

export const getBoxes = async () => {
    try {
        const response = await axios.get(API_URL + "/boxes");
        return response.data
    } catch (error) {
        console.log(error)
    }
}
