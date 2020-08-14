import React from "react";
import moment from "moment";
import "./MessageItem.css";

export default function MessageItem({ message }) {
	return (
		<li className="Message" key={message._id}>
			<h5 className="Message__autor">{message.author}</h5>
			<span className="Message__datetime">
				{moment(message.datetime).format("DD MMM HH:mm:ss")}
			</span>
			<p className="Message__value">{message.message}</p>
		</li>
	);
}
