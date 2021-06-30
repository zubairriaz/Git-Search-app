/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

export const Spinner = ({ loading }) => (
    <React.Fragment>
    {loading &&(
        <div
		css={css`
			top: 0;
			position: absolute;
			z-index: 10;
			width: 100%;
			height: 100%;
            background-color: rgba(230,230,250,0.5);
		`}
	>
		<span
			css={css`
				position: relative;
				top: 40%;
				left: 40%;
			`}
		>
			<PuffLoader loading={loading} size={150} color={'royalblue'} />
		</span>
	</div>
    )}
    </React.Fragment>
	
);
