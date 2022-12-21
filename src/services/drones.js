import axios from 'axios'

const getInfo = async () => {
    try {
        const url = `${BASEURL}/drones`
        const result = await axios.get(url)
        return result.data
    } catch (ex) {
        console.log(ex)
    }
}


export default { getInfo }