import axios from 'axios'

const getInfo = async () => {
    try {
        console.log("API_URL: ")
        console.log(process.env.REACT_APP_API_URL)
        const url = `${process.env.REACT_APP_API_URL}/drones`
        const result = await axios.get(url)
        console.log("Got the info in service")
        return result.data
    } catch (ex) {
        console.log(ex)
    }
}


export default { getInfo }