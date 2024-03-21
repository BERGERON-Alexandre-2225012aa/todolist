import React from "react";
import './App.css';
import {Box, Button, Modal, Typography} from "@mui/material";

class Footer extends React.Component {
    popUpStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#212121',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };
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
                <Button onClick={this.props.openModal}>Add a task</Button>
                <Modal
                    open={this.props.open}
                    onClose={this.props.closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={this.popUpStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add a task
                        </Typography>
                        <input className="inputAddTask" onChange={this.props.handleInputChange}></input>
                        <button className="buttonAddTask" onClick={this.props.addTask}></button>
                    </Box>
                </Modal>

            </footer>
        );
    }
}

export default Footer;