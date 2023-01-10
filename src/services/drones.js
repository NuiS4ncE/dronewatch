import axios from 'axios'

const getInfo = async () => {
    try {
        //console.log("API_URL: ")
        //console.log(process.env.REACT_APP_API_URL)
        const url = `${process.env.REACT_APP_API_URL}/drones`
        const result = await axios.get(url)
        //console.log("Got the info in service")
        return result.data
    } catch (ex) {
        console.log(ex)
    }
}


const getViolatorDrones = async () => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/dangerclose`
        const result = await axios.get(url)
        //console.log("Got the info in service")
        return result.data
    } catch (ex) {
        console.log(ex)
    }
}


const exportedDrones = { getInfo, getViolatorDrones }

export default exportedDrones