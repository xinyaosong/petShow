import dropify from './dropify.min.js'

export default class UploadComponent extends React.Component{
	constructor(){
		super();
	}
	componentDidMount(){
		$('.dropify').dropify();
	}
	render(){
		return(
			<div className="row">
				<div className="col-md-8">
					<div className="row">
						<div className="col-md-6 imgContainer">
				    		<input type="file" className="dropify" data-height="200" />
				    	</div>
				    	<div className="col-md-6 imgContainer">
				    		<input type="file" className="dropify" data-height="200" />
				    	</div>
			    	</div>
			    	<div className="row">
						<div className="col-md-6 imgContainer">
				    		<input type="file" className="dropify" data-height="200" />
				    	</div>
				    	<div className="col-md-6 imgContainer">
				    		<input type="file" className="dropify" data-height="200" />
				    	</div>
			    	</div>
			    </div>
		    	<div className="col-md-4 imgContainer">
		    		<input type="file" className="dropify" data-height="420" />
		    	</div>
		    </div>
		)
	}
}

