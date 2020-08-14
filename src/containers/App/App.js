import React, { useRef } from "react";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
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
			}, 1500)
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
			}, 1500)
		);
	};
	return (
		<div className="container">
			<div className="App">
				<ul className="MessagesBlock">
					{massages.map((message) => (
						<li className="Message" key={message._id}>
							<h5 className="Message__autor">{message.author}</h5>
							<span className="Message__datetime">
								{moment(message.datetime).format(
									"DD MMM HH:mm:ss"
								)}
							</span>
							<p className="Message__value">{message.message}</p>
						</li>
					))}
				</ul>
				<div className="Form">
					<form onSubmit={sendMessage}>
						<label className="Form__label">
							<span className="Form-group__name">Логин:</span>
							<input
								className="Form__input"
								onChange={(event) =>
									setAuthorName(event.target.value)
								}
								value={authorName}
								type="text"
							/>
						</label>
						<label className="Form__label">
							<span className="Form-group__name">Сообщение:</span>
							<textarea
								className="Form__textarea"
								onChange={(event) => {
									setTextOfMessage(event.target.value);
								}}
								value={textOfMessage}
							></textarea>
						</label>
						<button className="Form__submit-btn" type="submit">
							send
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
