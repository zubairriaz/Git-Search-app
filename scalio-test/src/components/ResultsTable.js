/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import arrowdown from "../static/images/arrow-down.png";
import arrowup from "../static/images/arrow-up.png";

export default function ResultsTable({ columns, data }) {
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
	}, [data]);

	const SortByColumn = (column) => {
		let sortedData, updatedColumns;
		let col = stateColumns.filter((column) => column.isSorted)[0];
		if (col.key == column.key) {
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
								padding-right: 100px;
								border: 1px solid black;
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

const sortObj = (property) => (a, b) => {
	return a[property].localeCompare(b[property]);
};

const invert =
	(fn) =>
	(...args) =>
		-fn(...args);

const toggle = (function () {
	let bit = false;
	return () => {
		bit = !bit;
		return bit;
	};
})();

const sortData = (data, column, reverse = false) => {
	let sortedData;
	data = copy(data);
	if (reverse) {
		sortedData = data.sort(invert(sortObj(column["key"])));
	} else {
		sortedData = data.sort(sortObj(column["key"]));
	}
	return sortedData;
};

const updateColumns = (columns, column, again = true) => {
	return columns.map((item) =>
		item.key == column.key
			? again
				? {
						...item,
						isSorted: true,
						isSortedAgain: !item.isSortedAgain,
				  }
				: {
						...item,
						isSorted: true,
						isSortedAgain: false,
				  }
			: { ...item, isSorted: false, isSortedAgain: false }
	);
};

const copy = (data) => {
	return data ? JSON.parse(JSON.stringify(data)) : undefined;
};
