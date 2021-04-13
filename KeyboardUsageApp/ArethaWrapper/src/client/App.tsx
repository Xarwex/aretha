import * as React from 'react';
import { useState, useEffect } from 'react';
import arethaRegistryURL from './../../config/index'

const App = (props: AppProps) => {
	const [keyLogList, setKeyLogList] = useState<KeyLog[]>([])
	const query = '{ "get": { "keylog": { } } }'

	useEffect(() => {
		function getAppList() {
			fetch('/miniql/' + query)
				.then(response => response.json())
				.then((data: KeyLogs) => {
					setKeyLogList(data.keylog)
				})
				.catch(e => console.error(e))
		}
		const interval = setInterval(getAppList, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<main>
			<h1> Keyboard usage</h1>
			<table cellPadding={5}>
				<thead>
					<tr>
						<td>Key</td>
						<td>Pressed</td>
					</tr>
				</thead>
				<tbody>
					{
						Object.keys(keyLogList).map((index) => {
							return <tr key={index.toString()}>
								<td key={index.toString() + "_first"}>{keyLogList[index].Key}</td>
								<td key={index.toString() + "_second"}>{keyLogList[index].Value}</td>
							</tr>
						})
					}
				</tbody>
			</table>
		</main>
	);
};

interface AppProps { }

interface KeyLogs {
	keylog: KeyLog[]
}

interface KeyLog {
	Key: string;
	Value: number;
}

export default App;
