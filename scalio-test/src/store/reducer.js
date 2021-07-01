import { SET_ITEM, SET_ISLOADING, SET_ERROR_MESSAGE } from "../utils/constants";
export const initialState = {
	item: {},
	isLoading: false,
	errorMessage: "",
};


export const appReducer = (state = initialState, action) => {
	if (action.type === SET_ITEM) {
		return {
			...state,
			item: { ...action.item },
			isLoading: false,
      errorMessage:""
		};
	}
	if (action.type === SET_ERROR_MESSAGE) {
		return {
			...state,
			errorMessage: extractMessage(action.message),
      item:{items:[],total_count:0},
			isLoading: false,
		};
	}
	if (action.type === SET_ISLOADING) {
		return {
			...state,
			isLoading: action.bool,
		};
	}
};


const extractMessage=res=>res? res.data? res.data.message : "" :"";