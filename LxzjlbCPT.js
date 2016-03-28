import React from 'react';
import ReactDOM from 'react-dom';
import  {List,ListItem,Badge,FormGroup,Input,Button} from 'amazeui-react';
import Process  from '../api/process.js';
class LxzjlbCPT extends React.Component{
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
        "estatus":"'离线'",
        "callback":"laws"
    	},
      headers:{},
      callback:function(data){
        console.log(data);
    	  data = JSON.parse(data.slice(0,-1).slice("laws".length+1));
      	that.setState({
      	laws: data.rows
    	  });
      }
    });
    process.push();
  }

  handleClick(e){
    let ilid = e.target.value;
    let add="/pfwh?ilid="+ilid+"?estatus='专家咨询'";
    var router = this._reactInternalInstance._context.router;
    router.replace(add);
  }

  render(){
    let _this = this;
    let law = _this.state.laws.map(function(data,index){
      return (
        <div>
          <p className="vname">{data.vname}</p>
          <span className="trequirement">{data.trequirement}</span>
          <Button 
            amStyle="secondary" 
            ref="lawid" 
            value={data.id} 
            onClick={_this.handleClick.bind(_this)}>
          咨询
          </Button>
        </div>
      );
    });
    
    return (
      <List static>
        {law}
      </List>
    );
  }
}
export default LxzjlbCPT;