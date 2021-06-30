import axios from "axios";
import { setItems,setIsLoading , setErrorMessgae} from "../store/actions";

const extractData = (response) => (response ? response.data : null);

function request(dispatch) {
	return async (url) => {
        try{
        dispatch(setIsLoading(true))
		let response =await axios.get(url);
		dispatch(setItems(extractData(response)));
        }catch(error){
            dispatch(setIsLoading(false))
            let message = error.response
            console.log(error.response)
            dispatch(setErrorMessgae(message))
        }
	};
}

export default request
