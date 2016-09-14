import React from 'react';
import ReactDOM from 'react-dom';
import UploadComponent from './static/js/upload.js';
import ShowImgComponent from './static/js/show.js';
import './static/css/home.less'

class HomeComponent extends React.Component{
	constructor(){
		super();
		this.state = {addNew: false, index: 0, showImg: false,};
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		$('[id$=Icon]').tooltip();
	}
	handleAddClick(){
		this.setState({addNew: true, 
			index: this.state.index + 1, 
		})
	}
	handleSubmit(){
		this.setState({
			showImg: true,
		});
	}
	render(){

		if(this.state.showImg == true){
			return ( 
				<div className="container" id="mainContent">
					<ShowImgComponent />
				</div>
			)
		}
	
		let addNew = null;
		if (this.state.addNew == true){
			let arr = [];
			for(let i=0; i<this.state.index; i++){
				arr.push( <li key={i+1}> <UploadComponent /> </li> );
			}
			addNew = arr;
		}
		return (
			<div className="container" id="mainContent">
				<section id="uploadSection">
					<header>
						<div id="rectangle">Upload your favorite pictures</div>
						<div id="triangle"></div>
					</header>
					
					<div className="imgContent">
					<ul id="uploadList">
						<li key={0}><UploadComponent /></li>
						{addNew}
					</ul>
					</div>
				</section>
				<aside className="homeIcon">
					<div id="addIcon"  data-toggle="tooltip" data-placement="top" title="Add more" onClick={this.handleAddClick}>
						<h4>+</h4>
					</div>			
					<div id="submitIcon" data-toggle="tooltip" data-placement="bottom" title="Show it" onClick={this.handleSubmit}>
						<h1><span className="glyphicon glyphicon-play-circle"></span>
						</h1>
					</div>
				</aside>
			</div>
		)
	}
}

ReactDOM.render(
	<HomeComponent />,
	document.getElementById('wrapper')
);
