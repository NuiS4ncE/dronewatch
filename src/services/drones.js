import axios from 'axios'

const getInfo = async () => {
    try {
        const url = `${process.env.BASEURL}/drones`
        const result = await axios.get(url)
        console.log("Got the info in service")
        return result.data
    } catch (ex) {
        console.log(ex)
    }
}


export default { getInfo }