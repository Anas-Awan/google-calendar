import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Event from "./component/Event";
// import Calendar from "./component/BigCalendar";

const App = () => {
    return(
        <Router>
            <Route path="/" exact component={Header} />
            <Route path="/event" component={Event} />
            {/* <Route path="/calendar" component={Calendar} /> */}
        </Router>
    );
}

export default App;