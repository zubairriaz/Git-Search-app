/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { Fragment } from "react";

export default function Pagination({ currentPage, pages, setPage, pageLimit }) {
	const numPages = Math.ceil(pages / pageLimit);

	const getPagesLimit = () => {
		if (currentPage + 30 > numPages) {
			return numPages;
		} else {
			return currentPage + 30;
		}
	};

	const getPaginationNumbers = () => {
		const blocks = [];
		for (let i = currentPage; i < getPagesLimit(); i++) {
			blocks.push(i);
		}
		return blocks;
	};

	const renderPageBlocks = () => {
		const getPageNumbers = getPaginationNumbers();
		return getPageNumbers.map((pageNum) => (
			<a
				key={pageNum}
				css={getPageCss()}
				onClick={() => setPage(pageNum)}
				style={
					pageNum === currentPage
						? { backgroundColor: "lightBlue" }
						: pageNum <= currentPage + 15
						? null
						: { display: "none" }
				}
			>
				{pageNum}
			</a>
		));
	};

	const goToPrevPage = () => {
		if (currentPage > 0) {
			setPage(currentPage - 1);
		}
	};

	const goToNextPage = () => {
		if (currentPage < numPages - 1) {
			setPage(currentPage + 1);
		}
	};

	const renderPrevPageBlocks = () => {
		return (
			<Fragment>
				<a
					key="first-page"
					css={getPageCss()}
					onClick={() => setPage(0)}
				>
					&#171;
				</a>
				<a key="prev-page" css={getPageCss()} onClick={goToPrevPage}>
					&#8592;
				</a>
			</Fragment>
		);
	};

	const renderNextPageBlocks = () => {
		return (
			<Fragment>
				<a key="next-page" css={getPageCss()} onClick={goToNextPage}>
					&rarr;
				</a>
				<a
					key="last-page"
					css={getPageCss()}
					onClick={() => setPage(getLastPage())}
				>
					&raquo;
				</a>
			</Fragment>
		);
	};

	const getLastPage = () => {
		if (currentPage + 15 > numPages) {
			return numPages;
		} else {
			return currentPage + 15;
		}
	};

	return (
		<div css={getDivCSS()}>
			{numPages && numPages > 1 && (
				<React.Fragment>
					{renderPrevPageBlocks()}
					{renderPageBlocks()}
					{renderNextPageBlocks()}
				</React.Fragment>
			)}
		</div>
	);
}

const getPageCss = () => {
	return css`
		border: "1px solid black";
		padding: 8px;
		cursor: "pointer";
		border-radius: 10px;
	`;
};

const getDivCSS = () => {
	return css`
		border: "1px solid black";
		textalign: "right";
		padding: 20px;
		paddingleft: 0px;
		cursor: pointer;
	`;
};
