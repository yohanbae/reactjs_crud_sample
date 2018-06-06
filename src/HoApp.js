import React, { Component } from 'react';


class HoApp extends Component {
	constructor(props){
		super(props);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}


	handleRemove(){
		console.log("Remove buttn clicked");
		var kk = this.props.ikey;
		this.props.removeWork(kk);
	}

	handleClick(){
		this.props.onClick();
	}


  render() {
    return (
    	<div>
    		<p><span onClick={this.handleClick}>[{this.props.name}] {this.props.date} </span><button onClick={this.handleRemove}>DEL</button></p>
    	</div>

    );
  }
}


export default HoApp;
