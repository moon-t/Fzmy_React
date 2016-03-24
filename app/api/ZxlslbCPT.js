import React from 'react';
import ReactDOM from 'react-dom';
import  {List,ListItem,Badge,FormGroup,Input,Button} from 'amazeui-react';
import Process  from '../api/process.js';
class ZxlslbCPT extends React.Component{
	constructor(props){
	  super(props);
	  this.state={
	  laws : [],
    id:"",
	  estatus:""
	  }
  }

  componentWillMount(){
  	let that = this;
    let process = new Process({
    	"url":"http://1.fzmy1.applinzi.com/index.php/Home/law/queryLawByEstatus?",
     	options:{
       	"name":"laws",
        "estatus":"'在线'",
        "callback":"laws"
    	},
      headers:{},
      callback:function(data){
        console.log(data);
    	  data = JSON.parse(data.slice(0,-1).slice("laws".length+1));
      	that.setState({
      	laws: data.data
    	  });
      }
    });
    process.push();
  }

  handleClick(e){
    let ilid = e.target.value;
    let add="/pfjy?ilid="+ilid+"?estatus='专家咨询'";
    var router = this._reactInternalInstance._context.router;
    router.replace(add);
  }

  render(){
    let _this = this;
    let law = _this.state.laws.map(function(data,index){
      return (
        <div className="zxls">
          <div className="gap"></div>        
          <p className="vname">{data.vname}</p>
          <p className="trequirement">
          <span>{data.trequirement}</span>
          <Button 
            amStyle="secondary" 
            ref="lawid" 
            className="zxbtn"
            amSize="xs"
            value={data.id} 
            onClick={_this.handleClick.bind(_this)}>
          咨询
          </Button>
          </p>

        </div>
      );
    });
    
    return (
      <List static>
      <p className="titlezx">今日在线专家</p>
        {law}
      </List>
    );
  }
}

export default ZxlslbCPT;