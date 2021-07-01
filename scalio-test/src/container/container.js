/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { lazy, Suspense } from "react";
import { useStore } from "../store/Store";
import { columns } from "../utils/constants";
import Search from "../components/Search";
import {Spinner} from "../components/spinner";
import {replaceText} from "../utils/utils"
import { url } from "../utils/constants";

const Results = lazy(() => import("../components/Results"));

function Container() {
	const [state] = useStore();
	const [searchTerm, setSearchTerm] = useState("");
	const [_, dispatch, apiRequest] = useStore();

	const onChangeText = useCallback(
		(e) => setSearchTerm(e.target.value),
	);

	const onSubmitForm =useCallback(async (e)=> {
		e.preventDefault();
		let rUrl = replaceText(url,searchTerm);
		await apiRequest(rUrl);
	})

	const getItems = () => (state.item ? state.item.items : undefined);
	return (
		<React.Fragment>
            	<Spinner loading={state.isLoading}></Spinner>
		<div css={getCss(getItems())}>
				<Search
					onChangeText={onChangeText}
					searchTerm={searchTerm}
                    errorMessage= {state.errorMessage}
					onSubmitForm = {onSubmitForm}
				></Search>{" "}
			</div>
			<Suspense fallback={<Spinner></Spinner>}>
				<div
					css={css`
						margin: auto;
						width: 45%;
						margin-top: 20px;
					`}
				>
					<Results
						columns={columns}
						item={state.item}
						searchTerm={searchTerm}
					></Results>
				</div>
			</Suspense>
		</React.Fragment>
	);
}

const getCss = (items) =>
	items && items.length > 0 ? defaultCss(1) : defaultCss(20);

const defaultCss = (top) => {
	return {
		margin: "auto",
		width: "35%",
		marginTop: `${top}%`,
	};
};

export default Container;
