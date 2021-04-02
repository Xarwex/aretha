import * as React from 'react';
import { useState, useEffect } from 'react';
import arethaRegistryURL from './../../config/index'

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
	const [appNameList, setAppNameList] = useState<JSON>(JSON.parse("{}"))

	useEffect(() => {
		function getAppList() {
			fetch('/appNames')
				.then(response => response.json())
				.then(data => {
					setAppNameList(data)
					console.log(data)
				})
				.catch(e => console.error(e))
		}
		const interval = setInterval(getAppList, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<main>
			<h1> Demo app</h1>
			<table cellPadding={5}>
				<thead>
					<tr>
						<td>Apps connected</td>
					</tr>
				</thead>
				<tbody>
					{
						Object.keys(appNameList).map(function (name) {
							return <tr>
								<td>{name}</td>
							</tr>
						})
					}
				</tbody>
			</table>
		</main>
	);
};

interface AppProps { }

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

export default App;
