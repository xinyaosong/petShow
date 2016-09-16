import {carousel} from './Carousel.js';


export default class ShowImgComponent extends React.Component{
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			carousel: carousel
		}
	}
	componentDidMount(){	
		this.state.carousel.start();
	}
	handleClick(event){
		const target = event.target;
		const parent = target.parentNode;
		if (parent && parent.id == 'imgMark'){
			const cur_index  = target.innerHTML - 1;
			this.state.carousel.markClick(cur_index);
		}
	}
	render(){
		return(
			<section id="showImgSection">
				<div className='imgListWrapper' onClick={this.handleClick}>
					<GetImgList />
					<GetImgMark />
				</div>  
			</section>
		)
	}
}

class GetImgList extends React.Component{
	render(){
		let imgList = [];
		const preImgList = $('.dropify-render').find('img');
		const jq_imgList = preImgList.map((index, img)=>{
			const src = img.src;	
			return <li key={index}><img src={src} alt="favorite picture" /></li>
		})
		for(let i=0; i<jq_imgList.length; i++){
			imgList.push(jq_imgList.get(i));
		}
		return (
			<ul id="imgList">
				{imgList}
			</ul>
		)
	}
}

class GetImgMark extends React.Component{
	render(){
		let list = [];
		const preImgList = $('.dropify-render').find('img');
		const jq_list = preImgList.map((index)=>{
			if (index ==0 ){
				return <li key={index} className="on">{index+1}</li>
			}	
			return <li key={index}>{index+1}</li>
		})
		for (let i=0; i<jq_list.length; i++){
			list.push(jq_list.get(i));
		}
		return (
			<ul id="imgMark">
				{list}
			</ul>
		)
	}
}
