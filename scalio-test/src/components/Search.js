/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { url } from "../utils/constants";
import { useStore } from "../store/Store";

export default function Search({ onChangeText, searchTerm, errorMessage, onSubmitForm }) {
return (
		<React.Fragment>
			<form onSubmit={onSubmitForm}>
				<input
					placeholder={"Enter Login Text"}
					css={getInputCss(errorMessage)}
					type="text"
					name="name"
					value={searchTerm}
					onChange={(event) => onChangeText(event)}
				/>

				<input
				    data-testid="form"
					css={getButtonCss()}
					type="submit"
					value="Submit"
				/>
			</form>
			{errorMessage && (
				<span
					css={css`
						font-size: 12px;
						color: red;
					`}
				>
					{errorMessage}
				</span>
			)}
		</React.Fragment>
	);
}


const getInputCss = (error)=>{
	let color  =  error ? 'red':'#ccc'
	return css`	width: 75%;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid ${color};
	box-shadow: inset 0 1px 3px #ddd;
	border-radius: 4px;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 12px;
	padding-bottom: 12px;`
}

const getButtonCss = ()=>{
	return css`
	background-color: royalblue;
	border: none;
	color: white;
	padding: 13px 32px;
	text-decoration: none;
	margin: 4px 2px;
	cursor: pointer;
	`
}