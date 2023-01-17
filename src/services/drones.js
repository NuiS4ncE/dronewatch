import axios from 'axios'
const baseURL = '/api'

export const getViolatorDrones = async () => {
    try {
            const url = `${process.env.REACT_APP_API_URL}/drones`
            const result = await axios.get(url)
            //console.log("Got the info in service")
            return result.data
    } catch (ex) {
        console.log(ex)
    }
}

