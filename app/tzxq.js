import React from 'react';
import { Slider , Icon,Container ,Button,Input,Sticky, Main,Panel,ListItem,List,Pagination,Table,Divider} from 'amazeui-react';
import Process  from './api/process.js';
import Reply from './api/Reply.js';
class Tzxq extends React.Component{
 	constructor(props){
		super(props);
		this.state={
		lists : [],
		imid:"",
		title:"",
		mgcontent:"",
		time:""
		}
	}
	
	componentWillMount(){
		let that = this;
		let imid = window.location.href.split('=')[1].split('&_')[0];
		let process = new Process({
			"url":"http://1.fzmy1.applinzi.com/index.php/Home/Message/queryReply?",
			options:{
				"name":"lists",
				"id":imid,
				"callback":"lists"
			},
			headers:{},
			callback:function(data){
				console.log(data.rows);
				data = JSON.parse(data.slice(0,-1).slice("lists".length+1));
				that.setState({
				title:data.rows[0].vtitle,
				mgcontent:data.rows[0].mgcontent,
				time:data.rows[0].dtime,
				lists: data.rows,
				imid:imid
				});
			}
		});
		process.push();
	}

	handleSubmit(){

	}

	render(){
		let lists = this.state.lists;
		lists = lists.shift();
		console.log(this.state.lists);
		let lis = this.state.lists.map(function(data,index){
			return (
					<div>
					<p className="hfname">{data.uname}</p>
       					<p className="hfcontent">{data.tcontent}</p>
       					 <Divider />       					
		      		</div>
			);
		});

		return (
			<div className="total">
				<div className="vtitle">
				 <h2 id="hftitle">{this.state.title}</h2>
				 <p id="mscontent">{this.state.mgcontent}</p>
				 <p className="time">{this.state.time}</p>
				 <div className="gap"></div>
				 </div>
				 <List >
				 {lis}
				 </List>
				 <Reply ref="reply" value={this.state.imid}/>
			</div>

		)
	}

}
export default Tzxq;