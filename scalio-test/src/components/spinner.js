/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

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
			<PulseLoader loading={loading} size={10} color={'royalblue'} />
		</span>
	</div>
    )}
    </React.Fragment>
	
);
