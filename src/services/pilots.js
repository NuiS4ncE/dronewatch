import axios from 'axios'

const getInfoOf = async (serNum) => {
    try {
        const url = `${process.env.BASEURL}/pilots/${serNum}`
        const result = await axios.get(url)
        console.log(result.data)
        return result.data
    } catch (ex) {
        console.log(ex)
    }
}


export default { getInfoOf }