import React from 'react';
import ReactDOM from 'react-dom';
import  {Input,Form,Grid,Col,ModalTrigger,Modal,Button} from 'amazeui-react';
import SelectCPT from '../api/SelectCPT.js';
import Process  from '../api/process.js';
class MfzxCPT extends React.Component{
	constructor(props){
    	super(props);
	    this.state={
	    	vtitle:"",
	        vphonenum:"",
	        lawtype:"",
	        tcontent:"",
	        ilid:"",
	        message:[],
	        isActive:false,
	        modalStr:"",
	        estatus:"'专家咨询'"
	    }
  }

    componentWillMount(){
	  	let that = this;
	  	console.log(window.location.href.split('&_')[0].split('=')[2].split("'")[1]);
	  	let ilidnew = window.location.href.split('=')[1].split('?')[0];
	  	let estatusnew = window.location.href.split('&_')[0].split('=')[2].split("'")[1];
		that.setState({
			ilid:ilidnew,
			estatus:estatusnew
		}); 
  }

 	getvalue(newvalue){
	 	let that = this;
	 	that.setState({
	 		lawtype:newvalue
	 	});
 	}

  	changValue(e){
  		console.log(this.refs.content.getValue());
  		console.log(this.refs.title.getValue());
  		console.log(this.refs.phonenum.getValue());
  		let that = this;
  		that.setState({
	  		vtitle:this.refs.title.getValue(),
	 		vphonenum:this.refs.phonenum.getValue(),
	 		tcontent:this.refs.content.getValue()
	 		
  		});
  	}


  	handleSubmit(e){
 	let that = this;
  	console.log(this.state.vtitle);
  	console.log(this.state.vphonenum);
  	console.log(this.state.tcontent);
  	console.log(this.state.estatus);
  	console.log(this.state.vphoto);
		let process = new Process({
			"url":"http://1.fzmy1.applinzi.com/index.php/Home/Message/addMessage",
			options:{
				"vtitle":this.state.vtitle,
				"estatus":this.state.estatus,
				"vphonenum":this.state.vphonenum,
				"vlawtype":this.state.lawtype,
				"tcontent":this.state.tcontent,
				"ilid":this.state.ilid,
				"callback":"message"
		},
		headers:{},
		callback:function(data){
			console.log(data);
			data = JSON.parse(data.slice(0,-1).slice("message".length+1));
			console.log(data.success);
		    if(data.success == true){
		        that.setState({
			        modalStr:"发表成功",
			        isActive:true
		        })
		    }else{
		         that.setState({
		          modalStr:"发表失败，请重试",
		          isActive:true
		        })
		    }
		}
	});
	process.push();
  }
  
  	updatephoto(e){
  		e.preventDefault();
  		console.log("aa");
  		this.setState({
  			vphoto:this.refs.photo.getValue()
  		});
  		
  	}

  	handleClick(e){
  		e.preventDefault();
  	    window.location.reload();
 	}

 	unSubmit(e){
 		e.preventDefault();
 		window.location.reload();
 	}

	render (){
		let _this=this;
		console.log(this.state.ilid);
		console.log(this.state.estatus);
		  	var modal =  (function(){
                return <Modal 
                		  type="alert" 
                		  title="提示" 
                		  onClick={_this.handleClick.bind(_this)}>
                		{_this.state.modalStr}
                		</Modal>
            }());

		return(
			<Form horizontal className="form1">
				<Grid>
		   				<Input 
		   					placeholder="咨询标题"
		   					ref="title" 
		   					value={this.state.title} 
		   					id="zxtitle" 
		   					icon="pencil"
		   					onChange={_this.changValue.bind(_this)} />
		   			
		   				<div>
		   				<Input 
		   					placeholder="手机号码"
		   					ref="phonenum" 
		   					value={this.state.phonenum} 
		   					id="zxphone" 
		   					icon="phone"
		   					onChange={_this.changValue.bind(_this)} />
		   				</div>
		   				<Input 
		   					type="textarea" 
		   					ref="content" 
		   					value={this.state.content} 
		   					id="zxcontent" 
		   					icon="book"
		   					placeholder="请详细面试事件发生的时间、地点、经过及想获得的帮助"
		   					onChange={_this.changValue.bind(_this)} />
		   			
		    			<SelectCPT callbackGetvalue={_this.getvalue.bind(_this)}/>
		    		
		      		<ModalTrigger modal={modal} open={this.state.isActive}>
		      
		      			<Button  
		      				amStyle="primary" 
		      				className="btnsubmit"
		      				onClick={_this.handleSubmit.bind(_this)}>
		      				提交
		      			</Button>
		      	
    				</ModalTrigger> 
    			</Grid>
    		</Form>
		);
	}
}
export default MfzxCPT;