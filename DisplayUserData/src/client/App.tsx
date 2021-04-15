import * as React from 'react';
import { useState, useEffect } from 'react';
import { arethaRegistryURL } from './../../config/index'
import styled from 'styled-components'

const query1: string = '{"get": {"emotion": {"args": {"type": "total"}}}}'
const query2: string = '{"get": {"keylog": {}}}'

const App = (props: AppProps) => {
	const [emotions, setEmotions] = useState<JSON>(JSON.parse('{"emotion": {}}'))
	const [keylogs, setKeylogs] = useState<JSON>(JSON.parse("{}"))


	useEffect(() => {
		function askQueries() {
			fetch('ask/' + query1)
				.then(response => response.json())
				.then(data => {
					setEmotions(data[0]["emotion"])
				})
				.catch(e => console.error(e))
			fetch('ask/' + query2)
				.then(response => response.json())
				.then(data => {
					setKeylogs(data[0]["keylog"])
				})
				.catch(e => console.error(e))
		}
		const interval = setInterval(askQueries, 1000)
		return () => clearInterval(interval)
	}, [emotions, keylogs])

	return (
		<MainWrapper>
			<h1>DUD</h1>
			<InnerWrapper>
				<Panel>
					<table cellPadding={5}>
						<thead>
							<tr>
								<td>Emotion</td>
								<td>Value</td>
							</tr>
						</thead>
						<tbody>
							{
								Object.keys(emotions).map(function (name) {
									if (name != "totalTime")
										return <tr>
											<td>{name}</td>
											<td>{Math.round(emotions[name] * 100)}%</td>
										</tr>
								})
							}
						</tbody>
					</table>
					<text> Total time: {emotions["totalTime"]} </text>
				</Panel>
				<Panel>
					<table cellPadding={5}>
						<thead>
							<tr>
								<td>Key</td>
								<td>Value</td>
							</tr>
						</thead>
						<tbody>
							{
								Object.keys(keylogs).map((index) => {
									return <tr key={index.toString()}>
										<td key={index.toString() + "_first"}>{keylogs[index].Key}</td>
										<td key={index.toString() + "_second"}>{keylogs[index].Value}</td>
									</tr>
								})
							}
						</tbody>
					</table>
				</Panel>
			</InnerWrapper>
		</MainWrapper>
	);
};

const MainWrapper = styled.main`
display: flex;
flex-direction: column;
min-height: 100vh;
`

const InnerWrapper = styled.div`
display: flex;
flex-direction: row;
flex-grow: 1;
`

const Panel = styled.div`
width: 400px;
min-height: 200px;
`

interface AppProps { }

export default App;
