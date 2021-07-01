import React from "react";
import Container from "./container/container";
import { StoreProvider } from "./store/Store";
import { initialState, appReducer } from "./store/reducer";

function App() {
	return (
		<React.Fragment>
			<StoreProvider initialState={initialState} reducer={appReducer}>
				<Container></Container>
			</StoreProvider>
		</React.Fragment>
	);
}

export default App;
