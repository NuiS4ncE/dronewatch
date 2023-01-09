import axios from 'axios'

const getInfoOf = async (serNum) => {
    try {
        console.log("serNum in pilots.js: " + serNum)
        const url = `${process.env.REACT_APP_API_URL}/pilots/${serNum}`
        const result = await axios.get(url)
        //console.log(result.data)
        return result.data
    } catch (ex) {
        console.log(ex)
    }
}


export default { getInfoOf }