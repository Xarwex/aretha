import * as React from 'react';
import { useState, useEffect } from 'react';
import arethaRegistryURL from './../../config/index'

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

export default App;
