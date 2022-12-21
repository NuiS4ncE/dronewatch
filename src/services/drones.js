import axios from 'axios'


const getInfo = async () => {
    try {
        const url = `https://assignments.reaktor.com/birdnest/drones`
        const result = await axios.get(url)
        console.log(result.data)
        return result.data
    } catch (ex) {
        console.log(ex)
    }
}

const getInfoOf = async (serNum) => {
    try {
        const url = `https://assignments.reaktor.com/pilots/${serNum}`
        const result = await axios.get(url)
        console.log(result.data)
        return result.data
    } catch (ex) {
        console.log(ex)
    }
}


export default{getInfo}