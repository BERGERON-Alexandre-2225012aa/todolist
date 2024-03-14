class TodoApp extends React.Component {
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
      searchTerm: ""
    }
    this.addTask = this.addTask.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    
  }
  
  render() {
  	const filteredItems = this.state.items.filter(item =>
      item.text.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
    return (
      <div>
        <h2>Todos:</h2>
        <input 
          placeholder="Rechercher une tâche" 
          value={this.state.searchTerm} 
          onChange={this.handleSearchChange} 
        />
        <ol>
        {filteredItems.map((item, index) => (
    			<li key={index}>
        
            <button class="delete" onClick={() => this.deleteATask(index)}>-</button>
            <input type="checkbox" readOnly checked={item.done} onChange={() => this.checkATask(index)} /> 
            <span className={item.done ? "done" : ""}>{item.text}</span>
            <button class="order" onClick={() => this.moveItemUp(index)}>Up</button>
            <button class="order" onClick={() => this.moveItemDown(index)}>Down</button>
          </li>
				))}
        </ol>
        <label class="blue">{this.state.items.filter(item=> item.done === true).length} task done on {this.state.items.length}.</label> <br></br>
        <input onChange={this.handleInputChange}></input><button onClick={this.addTask}>+</button>
      </div>
    )
  }
  
  handleInputChange(event) {
    this.setState({ inputTask: event.target.value });
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

ReactDOM.render(<TodoApp />, document.querySelector("#app"))
