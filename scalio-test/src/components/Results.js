
import React, { useEffect, useState } from "react";
import ResultTable from "./ResultsTable";
import { columns } from "../utils/constants";
import { url } from "../utils/constants";
import { useStore } from "../store/Store";

export default function Results({ item, searchTerm }) {
	const [_, dispatch, apiRequest] = useStore();
	const replaceText = (url) => url.replace("{login}", searchTerm);
	const [currentPage, setCurrentPage] = useState(1);

	const [stateItem, setStateItem] = useState({});

	async function onSetPage(pageNumber) {
		let appendedUrl = `${url}&page=${pageNumber}`;
		setCurrentPage(pageNumber);
		await apiRequest(replaceText(appendedUrl));
	}

	useEffect(() => {
		setStateItem(item);
	}, []);

	useEffect(() => {
		if (
			stateItem.total_count !== item.total_count &&
			JSON.stringify(stateItem.items) !== JSON.stringify(item.items)
		) {
			setCurrentPage(1);
			setStateItem(item);
		}
	}, [item]);

	return (
		<React.Fragment>
			{stateItem && stateItem.items && stateItem.items.length > 0 && (
				<React.Fragment>
					<ResultTable
						data={item.items}
						columns={columns}
						currentPage={currentPage}
						pages={stateItem.total_count}
						setPage={onSetPage}
					></ResultTable>
				</React.Fragment>
			)}
		</React.Fragment>
	);
}
