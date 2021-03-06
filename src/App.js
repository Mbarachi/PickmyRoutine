import React from 'react';
import Header from './components/Header'
import Action from './components/Action'
import Options from './components/Options'
import AddOption from './components/AddOption'
import OptionModal from './components/OptionModal'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title : 'PICK MY ROUTINE',
      subtitle: 'Put your life in the hands of God',
      options : [],
      selectedOption: undefined
    }
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handePick = this.handePick.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleClearModal = this.handleClearModal.bind(this);
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json)

      if(options) {
        this.setState({options: options})
      }
    } catch (error) {
      
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options)
      // localStorage function only stores strings, hence the line above! 
      localStorage.setItem('options', json) 
    }
  }

  handleAddOption(option) {
    //validation purposes...
      if(!option) {
        return "Enter valid item to add"
      }else if (this.state.options.indexOf(option) > -1){
        return "This item already exist"
      } 

      this.setState((prevState) => {
        return{
          options: prevState.options.concat(option)
        }
      })
    }

  handleDelete() {
    this.setState({
      options: []
    })
  }

  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter( option => optionToRemove !== option )
  
    }))
    
  }


  handePick() {
    const randNum = Math.floor(Math.random() * this.state.options.length)
    const option = this.state.options[randNum];
    this.setState(() => ({
      selectedOption: option
    }))
  }

  handleClearModal() {
    this.setState(() => {
      return{
        selectedOption: undefined
      }
    })
  }

  render() {
    return(
      <div>
        <Header 
          title={this.state.title} 
          subtitle={this.state.subtitle}
        />

        <div className="container">
          <Action 
            handlePick = {this.handePick} 
            hasOptions = {this.state.options.length > 0}
          /> 
          <div className="widget">
            <Options 
              options={this.state.options} 
              handleDelete = {this.handleDelete}
              handleAddOption ={this.handleAddOption}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption = {this.handleAddOption}/>
        </div>
        </div>
        <OptionModal 
          selectedOption={this.state.selectedOption}
          handleClearModal ={this.handleClearModal}
        />
       
      </div>
    )
  }

}

export default App;
