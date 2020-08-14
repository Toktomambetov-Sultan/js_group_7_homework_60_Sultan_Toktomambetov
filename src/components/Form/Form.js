import React from "react";
import "./Form.css";
export default function Form(props) {
	return (
		<div className="Form">
			<form onSubmit={props.sendMessage}>
				<label className="Form__label">
					<span className="Form-group__name">Логин:</span>
					<input
						className="Form__input"
						onChange={(event) =>
							props.setAuthorName(event.target.value)
						}
						value={props.authorName}
						type="text"
					/>
				</label>
				<label className="Form__label">
					<span className="Form-group__name">Сообщение:</span>
					<textarea
						className="Form__textarea"
						onChange={(event) => {
							props.setTextOfMessage(event.target.value);
						}}
						value={props.textOfMessage}
					></textarea>
				</label>
				<button className="Form__submit-btn" type="submit">
					send
				</button>
			</form>
		</div>
	);
}
