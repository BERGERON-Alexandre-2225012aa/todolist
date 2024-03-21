import React from "react";
import './App.css';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="searchBarDiv">
                    <input className="searchBar"
                           placeholder="Search a task..."
                           value={this.props.searchTerm}
                           onChange={this.props.handleSearchChange}
                    />
                    <button className="searchButton"></button>
                </div>
                <input onChange={this.props.handleInputChange}></input>
                <button onClick={this.props.addTask}>+</button>
            </footer>
        );
    }
}

export default Footer;