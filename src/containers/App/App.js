import React, { useRef } from "react";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

import Form from "../../components/Form/Form";
import MessageItem from "../../components/MessageItem/MessageItem";
const url = "http://146.185.154.90:8000/messages";
function App() {
	const [massages, setMassages] = useState([]);
	const [authorName, setAuthorName] = useState("");
	const [textOfMessage, setTextOfMessage] = useState("");
	const [date, setDate] = useState(new Date(0).toJSON());
	const [intervalId, setIntervalId] = useState(null);
	const initMassages = (date) => {
		console.log("update massages!");
		const request = async () => {
			const response = await fetch(url + "?datetime" + date);
			if (response.ok) {
				response.json().then((res) => {
					setDate(new Date().toJSON());
					res.reverse();
					setMassages(res);
				});
			}
		};
		request().catch(console.error);
	};
	const lastDate = useRef(date);
	useEffect(() => {
		lastDate.current = date;
	});
	useEffect(() => {
		initMassages(lastDate.current);
		setIntervalId(
			setInterval(() => {
				initMassages(lastDate.current);
			}, 2000)
		);
	}, []);
	const sendMessage = (event) => {
		event.preventDefault();
		setTextOfMessage("");
		if (!textOfMessage || !authorName) return;
		const data = new URLSearchParams();
		data.set("message", textOfMessage);
		data.set("author", authorName);
		fetch(url, {
			method: "post",
			body: data,
		});
		clearInterval(intervalId);
		initMassages(date);
		setIntervalId(
			setInterval(() => {
				initMassages(date);
			}, 2000)
		);
	};
	return (
		<div className="container">
			<div className="App">
				<ul className="MessagesBlock">
					{massages.map((message) => (
						<MessageItem key={message._id} message={message} />
					))}
				</ul>
				<Form
					authorName={authorName}
					setAuthorName={setAuthorName}
					textOfMessage={textOfMessage}
					setTextOfMessage={setTextOfMessage}
					sendMessage={sendMessage}
				/>
			</div>
		</div>
	);
}

export default App;
