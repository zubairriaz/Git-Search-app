import {
	extractData,
	invert,
	toggle,
	copy,
	sortObj,
	request,
    
} from "../utils/utils";
import {url} from "../utils/constants"
import mockAxios from "axios";
import { expect } from "@jest/globals";

describe("extract data", () => {
	test("extraact Data Working Correctly", () => {
		let obj = { data: "1" };
		let extractedData = extractData(obj);
		expect(extractedData).toBe("1");
	});
});

describe("Invert Function", () => {
	let funcToBeInverted, invertedFunc;
	beforeEach(() => {
		funcToBeInverted = () => 1;
		invertedFunc = invert(funcToBeInverted);
	});
	test("Invert function should invert 1 to -1", () => {
		expect(invertedFunc()).toBe(-1);
	});
});

describe("Toggle function", () => {
	test("Toggle Should toggle boolean values", () => {
		expect(toggle()).toBe(true);
		expect(toggle()).toBe(false);
	});
});

describe("Test copy method", () => {
	let obj;
	beforeEach(() => {
		obj = { a: 1, c: 2, d: { e: 4 } };
	});
	test("Copy should deep copy the object", () => {
		let obj2 = copy(obj);
		obj2.d.e = 6;
		expect(obj).not.toEqual(obj2);
		expect(obj.d.e).toBe(4);
	});

	test("Passing falsy value should return undefined ", () => {
		let obj2 = copy("");
		expect(obj2).toBe(undefined);
	});
});

describe("Test sort Method", () => {
	let obj, obj1, sortFunc;
	beforeEach(() => {
		obj = { name: "Apple" };
		obj1 = { name: "Zcom" };
		sortFunc = sortObj("name");
	});
	test("It should provide -1 when first argument is alphbatically lesser than the latter", () => {
		let result = sortFunc(obj, obj1);
		expect(result).toBe(-1);
	});

	test("It should provide 1 when first argument is alphbatically greater than the latter", () => {
		let result = sortFunc(obj1, obj);
		expect(result).toBe(1);
	});
});

describe("Test axios request method",  () => {
	test("Request should call axios get method with url", async () => {
        let dispatch = jest.fn();
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: { results: ["dummyData"] },
			})
		);

        const apiRequest = request(dispatch);
         await apiRequest(url);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith(url)
	});
});
