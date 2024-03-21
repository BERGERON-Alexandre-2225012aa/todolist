import React from "react";
import './App.css';
import Header from './Header';
import Footer from './Footer';




class TodoApp extends React.Component {
  openModal = () => this.setState({open: true});
  closeModal = () => this.setState({open: false});
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { text: "Learn JavaScript", done: false },
        { text: "Learn React", done: false },
        { text: "Play around in JSFiddle", done: true },
        { text: "Build something awesome", done: true }
      ],
      inputTask: "Une tâche",
      searchTerm: "",
      open: false
    }
    this.addTask = this.addTask.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);

  }

  componentDidMount() {
    const storedItems = localStorage.getItem("todoItems");
    if (storedItems) {
      this.setState({ items: JSON.parse(storedItems) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("todoItems", JSON.stringify(this.state.items));
  }

  render() {
    const filteredItems = this.state.items.filter(item =>
        item.text.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
    return (
        <div className="container">
          <Header tasksDone={this.state.items.filter(item => item.done === true).length} totalTasks={this.state.items.length} />


          <div className="taskList">



            {filteredItems.map((item, index) => (
                <li key={index}>


                  <input className="checkBox" type="checkbox" readOnly checked={item.done}
                         onChange={() => this.checkATask(index)}/>
                  <span className={item.done ? "done" : ""}>{item.text}</span>
                  <div className="orderDiv">

                    <button className="order up" onClick={() => this.moveItemUp(index)}></button>
                    <button className="order down" onClick={() => this.moveItemDown(index)}></button>
                    <button className="delete" onClick={() => this.deleteATask(index)}></button>
                  </div>

                </li>
            ))}
          </div>




          <Footer
              searchTerm={this.state.searchTerm}
              handleSearchChange={this.handleSearchChange}
              handleInputChange={this.handleInputChange}
              addTask={this.addTask}
              open={this.state.open}
              openModal={this.openModal}
              closeModal={this.closeModal}
          />


        </div>
    )
  }

  handleInputChange(event) {
    this.setState({inputTask: event.target.value});
  }

  checkATask(index) {
    const updatedItems = [...this.state.items];
    updatedItems[index].done = !updatedItems[index].done;
    this.setState({ items: updatedItems });
  }

  deleteATask(index) {
    if (window.confirm("Are you sure to delete this task ?")) {
      const updatedItems = [...this.state.items];
      updatedItems.splice(index, 1);
      this.setState({ items: updatedItems });
    }
  }

  addTask() {
    this.setState(previousState => ({
      items : [...previousState.items,{text : this.state.inputTask, done:false}]
    }));
  }

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  moveItemUp = (index) => {
    if (index > 0) {
      this.setState(prevState => {
        const newItems = [...prevState.items];
        const temp = newItems[index];
        newItems[index] = newItems[index - 1];
        newItems[index - 1] = temp;
        return { items: newItems };
      });
    }
  }

  moveItemDown = (index) => {
    if (index < this.state.items.length - 1) {
      this.setState(prevState => {
        const newItems = [...prevState.items];
        const temp = newItems[index];
        newItems[index] = newItems[index + 1];
        newItems[index + 1] = temp;
        return { items: newItems };
      });
    }
  }

}






function App() {
  return (
      <div className="App">
        <TodoApp />
      </div>
  );
}

export default App;
