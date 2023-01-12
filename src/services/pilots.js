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

const getViolatingPilots = async () => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/pilots`
        const result = await axios.get(url)
        //console.log("result.data: " + JSON.stringify(result.data))
        return result.data
    } catch (ex) {
        console.log(ex)
    }
}

const exportedPilots = { getInfoOf, getViolatingPilots }

export default exportedPilots