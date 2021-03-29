import * as React from 'react';
import { useState, useEffect } from 'react';
import { queryResolver } from './QueryResolver'
import { miniql } from 'miniql'
import json5 from 'json5'

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
	const [greeting, setGreeting] = useState<string>('');

	//
    // Execute a query and display the results.
    //
    async function executeQuery(queryText) {
        try {
            const query = json5.parse(queryText);
            console.log("Executing query:");
            console.log(query);
            const result = await miniql(query, queryResolver, { verbose: true });
            console.log("Setting query result:");
            console.log(result);
            //setQueryResult(result);
        }
        catch (err) {
            console.error("An error occured running the query:");
            console.error(err && err.stack || err);
            //setQueryResult({ error: serializeError(err) });
        }
    }

	useEffect(() => {
		async function getGreeting() {
			try {
				executeQuery(exampleQuery.text)
				const res = await fetch('/api/hello');
				const greeting = await res.json();
				setGreeting(greeting);
			} catch (error) {
				console.log(error);
			}
		}
		getGreeting();
	}, []);

	return (
		<main className="container my-5">
			<h1 className="text-primary text-center">Hello {greeting}!</h1>
		</main>
	);
};

interface AppProps {}

/* CLASS REACT EXAMPLE */
// class App extends React.Component<IAppProps, IAppState> {
// 	constructor(props: IAppProps) {
// 		super(props);
// 		this.state = {
// 			name: null
// 		};
// 	}

// 	async componentDidMount() {
// 		try {
// 			let r = await fetch('/api/hello');
// 			let name = await r.json();
// 			this.setState({ name });
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}

// 	render() {
// 		return (
// 			<main className="container my-5">
// 				<h1 className="text-primary text-center">Hello {this.state.name}!</h1>
// 			</main>
// 		);
// 	}
// }

// export interface IAppProps {}

// export interface IAppState {
// 	name: string;
// }

const exampleQuery = require('./../queries/get-all-actions').default

export default App;
