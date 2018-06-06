import React, { Component } from 'react';
import './App.css';
import HoApp from './HoApp';
import update from 'react-addons-update';


class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        selectedKey:-1,
        info:[
        { name: "Yohan", date:"Mauris eget lacus fringilla, congue justo eu, suscipit ligula." },
        { name: "Hanna", date:"Vestibulum vestibulum nisi non mauris malesuada" },
        { name: "Stephanie", date:"Aliquam at tincidunt dui. Suspendisse dapibus euismod sem" },
        { name: "Eugene", date:"Sed vehicula sed metus maximus semper." },
        { name: "Carmen", date:"Fusce maximus porta ipsum ut facilisis" },                               
        { name: "Sophia", date:"In non lorem sed arcu elementum scelerisque vel a odio" }             
      ]
      };    

      this.handleCreate = this.handleCreate.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
  }


  componentDidUpdate(){
    console.log("Componenet Did Update");
  }

  handleRemove(index){

    var array = [...this.state.info]; // make a separate copy of the array
    array.splice(index, 1);
    this.setState({info: array});
  }

  handleCreate(contact) {
      this.setState({
          info: [...this.state.info, contact]
      });
  }

  handleSubmit(){
    const userdata = {
      name: this.state.name,
      date: this.state.date
    }    
  }  

  handleEdit(name,date){
    console.log(this.state.selectedKey, name, date);
    this.setState({
        info: update(this.state.info,
            {
                [this.state.selectedKey]: {
                    name: { $set: name },
                    phone: { $set: date }
                }
            }
        )
    });
  }

  handleClick(index){
    this.setState({
      selectedKey: index
    });
    console.log(index);
  }

  render() { // Point: Send the CREATE Function as a parameter. To keep main state.
    return (
      <div className="App well">
        { this.state.info.map((user, index) => {
            return <HoApp name={user.name} date={user.date} key={index} ikey={index}
              removeWork={()=>this.handleRemove(index)}
              onClick={()=>this.handleClick(index)}
             />
          }) 
        }

        <p className="space"></p>
        <div className="comp">
          <CreatePart handleCreate={this.handleCreate} /> 
        </div>
        <div className="comp">        
          <DetailPart isSelected={this.state.selectedKey != -1} 
            userd = {this.state.info[this.state.selectedKey]}
            onEdit = {this.handleEdit}
          />
        </div>          
      </div>
    );
  }
}


class DetailPart extends Component{
  constructor(props){
    super(props);
    this.state = {
      isEdit: false,
      name: '',
      date: ''
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);    
  }

  handleEdit(){
    this.props.onEdit(this.state.name, this.state.date);
  }

  handleToggle(){
    if(!this.state.isEdit){
      this.setState({
        name: this.props.userd.name,
        date: this.props.userd.date
      });
    }else{
      this.handleEdit();
    }

    this.setState({
      isEdit: !this.state.isEdit // if idEdit is false then set to True
    });
  }

  handleChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
      console.log(this.state);
  }  

  render(){
    const blank = (
      <div>
        Nothing selected
      </div>      
    );

    if(this.props.isSelected){      
      const details = (
        <div>
          <p>{this.props.userd.name}</p>
          <p>{this.props.userd.date}</p>
        </div>
      );
      const edit = (
        <div>
          <p><input
            type="text" name="name" placeholder="name" value={this.state.name}
            onChange = {this.handleChange} /></p>
          <p><input
            type="text" name="date" placeholder="date" value={this.state.date}
            onChange = {this.handleChange} />    </p>        
        </div>
      );

      const view = this.state.isEdit ? edit : details;      


      return(
        <div>
          {view}
          <p><button onClick={this.handleToggle}>{this.state.isEdit ? 'OK' : 'Edit'}</button></p>
        </div>
      );
    }else{
      console.log("NO");
      return(
        blank
      );      
    }
  }
}


class CreatePart extends Component{
  constructor(props){
    super(props);
    this.state = {
      name:'',
      date:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
      console.log(this.state);
  }  

  handleSubmit(){
    const userdata = {
      name: this.state.name,
      date: this.state.date
    }
    this.props.handleCreate(userdata);
  }

  render(){
    return(
      <div>
        <p>Create content</p>
        <input type="text" name="name" placeholder="Author" value={this.state.name} onChange={this.handleChange}></input>
        <input type="text" name="date" placeholder="Content" value={this.state.date} onChange={this.handleChange}></input>

        <button onClick={this.handleSubmit}>ADD</button>      
      </div>
      );
  }


}


export default App;
