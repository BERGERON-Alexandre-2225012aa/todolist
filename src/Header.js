// Header.js

import React from "react";
import './App.css';

class Header extends React.Component {
    render() {
        return (
            <header>
                <h2>To Do App</h2>
                <label className="taskNumber">{this.props.tasksDone} task done on {this.props.totalTasks}</label>
            </header>
        );
    }
}

export default Header;
