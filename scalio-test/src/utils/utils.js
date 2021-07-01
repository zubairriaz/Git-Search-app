import axios from "axios";
import { setItems, setIsLoading, setErrorMessgae } from "../store/actions";

export const extractData = (response) => (response ? response.data : null);

export const request = (dispatch) => {
	return async (url) => {
		try {
			dispatch(setIsLoading(true));
			let response = await axios.get(url);
			dispatch(setItems(extractData(response)));
		} catch (error) {
			dispatch(setIsLoading(false));
			let message = error.response;
			console.log(error.response);
			dispatch(setErrorMessgae(message));
		}
	};
};

export const sortObj = (property) => (a, b) => {
	return a[property].localeCompare(b[property]);
};

export const invert =
	(fn) =>
	(...args) =>
		-fn(...args);

export const toggle = (function () {
	let bit = false;
	return () => {
		bit = !bit;
		return bit;
	};
})();

export const sortData = (data, column, reverse = false) => {
	let sortedData;
	data = copy(data);
	if (reverse) {
		sortedData = data.sort(invert(sortObj(column["key"])));
	} else {
		sortedData = data.sort(sortObj(column["key"]));
	}
	return sortedData;
};

const getObj = (item, toggle) => ({
	...item,
	isSorted: true,
	isSortedAgain: toggle ? !item.isSortedAgain : false,
});

export const updateColumns = (columns, column, again = true) => {
	return columns.map((item) =>
		item.key === column.key
			? again
				? getObj(item, true)
				: getObj(item,false)
			: { ...item, isSorted: false, isSortedAgain: false }
	);
};

export const copy = (data) => {
	return data ? JSON.parse(JSON.stringify(data)) : undefined;
};

export const replaceText = (url, searchTerm) =>
	url.replace("{login}", searchTerm);
