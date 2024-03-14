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
        {this.state.items.map((item, index) => (
    			<li key={index}>
        
            <button class="delete" onClick={() => this.deleteATask(index)}>-</button>
            <input type="checkbox" readOnly checked={item.done} onChange={() => this.checkATask(index)} /> 
            <span className={item.done ? "done" : ""}>{item.text}</span>
        
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
  
}

ReactDOM.render(<TodoApp />, document.querySelector("#app"))
