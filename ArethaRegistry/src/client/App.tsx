import * as React from 'react';
import { useState, useEffect } from 'react';

const App = (props: AppProps) => {
	const [appList, setAppList] = useState<JSON>(JSON.parse("{}"))

	useEffect(() => {
		function getAppList() {
			fetch('/apps')
				.then(response => response.json())
				.then(data => setAppList(data))
				.catch(e => console.error(e))
		}
		getAppList()
	}, [])

	return (
		<main>
			<h1> Aretha Registry </h1>
			<table cellPadding={5}>
				<thead>
					<tr>
						<td>App</td>
						<td>Port</td>
					</tr>
				</thead>
				<tbody>
					{
						Object.keys(appList).map(function (name) {
							return <tr>
								<td>{name}</td>
								<td>{appList[name]}</td>
							</tr>
						})
					}
				</tbody>
			</table>
		</main>
	)
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
