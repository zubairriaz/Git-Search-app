/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import arrowdown from "../../static/images/arrow-down.png";
import arrowup from "../../static/images/arrow-up.png";
import {sortData,toggle,updateColumns} from "../../utils/utils"
import Pagination from "./pagination";
import { PAGE_LIMT } from "../../utils/constants";

export default function ResultsTable({ columns, data, currentPage, pages, setPage }) {
	const [items, setItems] = useState([]);
	const [stateColumns, setStateColumns] = useState([]);

	useEffect(() => {
		let column = columns.filter((column) => column.isSorted)[0];
		let sortedData = sortData(data, column, false);
		setItems(sortedData);
		setStateColumns(columns);
	}, []);

	useEffect(() => {
		let column = columns.filter((column) => column.isSorted)[0];
		let sortedData = sortData(data, column, false);
		setItems(sortedData);
	}, [columns,data]);

	function SortByColumn(column) {
		let sortedData, updatedColumns;
		let col = stateColumns.filter((column) => column.isSorted)[0];
		if (col.key ===  column.key) {
			sortedData = sortData(data, column, toggle());
			updatedColumns = updateColumns(stateColumns, column);
		} else {
			sortedData = sortData(data, column, false);
			updatedColumns = updateColumns(stateColumns, column, false);
		}
		setItems([...sortedData]);
		setStateColumns([...updatedColumns]);
	};

	const TableHeader = ({ columns }) => {
		return (
			<thead>
				<tr css={getTrCss()}>
					{columns.map((column) => (
						<th
							css={css`
								border: 1px solid lightblue;
							`}
							key={column.id}
						>
							<div>
								<span
									css={getHeaderSpanCss()}
									onClick={() => SortByColumn(column)}
								>
									{column.name}

									{column &&
										column.isSorted &&
										!column.isSortedAgain && (
											<img src={arrowdown}></img>
										)}
									{column &&
										column.isSorted &&
										column.isSortedAgain && (
											<img src={arrowup}></img>
										)}
								</span>
							</div>
						</th>
					))}
				</tr>
			</thead>
		);
	};

	return (
		<React.Fragment>
			<table css={getTableCss()}>
				<TableHeader columns={stateColumns}></TableHeader>
				<TableRows data={items} columns={stateColumns}></TableRows>
			</table>
			<Pagination
						currentPage={currentPage}
						pages={pages}
						pageLimit={PAGE_LIMT}
						setPage={setPage}
					></Pagination>
		</React.Fragment>
	);
}

const TableRow = ({ item, columns }) => {
	return (
		<tr>
			{columns.map((column) => {
				if (column.onRender) {
					return (
						<td key={column.id}>
							<span>{column.onRender(item)}</span>
						</td>
					);
				}
				return <td key={column.id}><span>{item[column.key]}</span></td>;
			})}
		</tr>
	);
};

const TableRows = ({ data, columns }) => {
	return (
		<tbody>
			{data.map((item) => {
				return (
					<TableRow
						key={item.id}
						item={item}
						columns={columns}
					></TableRow>
				);
			})}
		</tbody>
	);
};

const getTrCss = () => {
	return css`
		border: 1px solid gray;
	`;
};

const getTableCss = () => {
	return css`
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
		width: 100%;
		padding: 10px 30px;
		font-size: 14px;
		border-radius: 4px;
	`;
};

const getHeaderSpanCss = () => {
	return css`
		color: gray;
		font-size: 16px;
		font-weight: 400;
		float: left;
		&:hover {
			cursor: pointer;
		}
	`;
};
