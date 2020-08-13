import React from "react";
import "./App.css";

function App() {
	return (
		<div className="container">
			<div className="App">
				<ul className="MessagesBlock">
					<li className="Message">
						<h5 className="Message__autor">Султан</h5>
						<p className="Message__value">
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Maxime delectus repellendus ratione laudantium
							provident.
						</p>
					</li>
				</ul>
				<div className="Form">
					<form>
						<label className="Form__label">
							<span className="Form-group__name">Логин:</span>
							<input className="Form__input" type="text" />
						</label>
						<label className="Form__label">
							<span className="Form-group__name">Сообщение:</span>
							<textarea className="Form__textarea"></textarea>
						</label>
						<button className="Form__submit-btn" type="submit">send</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
