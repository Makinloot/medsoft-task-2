import axios from "axios"

export const fetchData = () => async (dispatch) => {
    try {
        const { data } = await axios.get('https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/')
        dispatch({
            type: "SAVE_DATA",
            payload: data
        })
    } catch (error) {
        console.log('ERROR DISPATCHING DATA', error)
    }

}