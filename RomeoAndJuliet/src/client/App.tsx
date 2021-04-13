import * as React from 'react';
import { useState, useEffect } from 'react';
import arethaRegistryURL from './../../config/index'
import styled from 'styled-components'
import { setTextRange } from 'typescript';

const App = (props: AppProps) => {
	const [text, setText] = useState<string>('')
	const [keyLogList, setKeyLogList] = useState<KeyLog[]>([])
	const [writable, setWritable] = useState(true)

	useEffect(() => {
		function check() {
			fetch('/keylog')
				.then(response => response.json())
				.then((data: KeyLogs) => {
					textToKeyLogs(data[0].keylog)
				})
				.catch(e => console.error(e))
		}

		function textToKeyLogs(newKeyLogList: KeyLog[]) {
			let arr = new Array<number>(26)
			for (var i = 0; i < 26; i++)
				arr[i] = 0
			for (var i = 0; i < text.length; i++) {
				const charCode = text.toUpperCase().charCodeAt(i)
				if (charCode >= 65 && charCode <= 90) {
					//console.log(charCode)
					arr[charCode - 65]++
				}
				//console.log("updated: " + newKeyLogList)
			}
			//console.log(arr)
			Object.keys(newKeyLogList).map((index) => {
				newKeyLogList[index].Value = (newKeyLogList[index].Value - arr[newKeyLogList[index].Key.charCodeAt(0) - 65])
			})
			checkIfWritable(newKeyLogList)
		}

		function checkIfWritable(newKeyLogList: KeyLog[]) {
			let res = true
			Object.keys(newKeyLogList).map((index) => {
				if (newKeyLogList[index].Value < 0)
					res = false
			})
			setWritable(res)
			setKeyLogList(newKeyLogList)
		}
		const interval = setInterval(() => check(), 1000)
		return () => clearInterval(interval)
	}, [text, keyLogList, writable])

	return (
		<MainWrapper>
			<h1> Romeo and Juliet</h1>
			<InnerWrapper>
				<TextArea
					value={text}
					onChange={(event => setText(event.target.value))} />
				<RightPanel>
					<table cellPadding={5}>
						<thead>
							<tr>
								<td>Could you write it? </td>
								<td>{writable.toString()}</td>
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
				</RightPanel>
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
@media(max-width: 800px) {
	flex-direction: column;
}
`

const RightPanel = styled.div`
width: 400px;
min-height: 200px;
`

const TextArea = styled.textarea`
flex-grow: 1;
`

interface AppProps { }

interface KeyLogs {
	keylog: KeyLog[]
}

interface KeyLog {
	Key: string;
	Value: number;
}

export default App;
