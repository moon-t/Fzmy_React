import React from 'react';
import ReactDOM from 'react-dom';
import  {List} from 'amazeui-react';
import Process  from '../api/process.js';
class LxlslbCPT extends React.Component{
	constructor(props){
	  super(props);
	  this.state={
	  laws:[],
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
        console.log(that.state.laws);
      }
  });
  console.log(1);
  process.push();
  }

  render(){
    let _this = this;
    let law = _this.state.laws.map(function(data,index){
      return (
        <div>
          <div className="gap"></div>
          <span className="lxname">{data.vname}</span>
          <span className="onlientime">在线时间:{data.dstarttime}</span>
         
        </div>
      );
    });
    return (
        <List static className="lxlists">
        <div>
          <p className="titlezx">专家咨询预告</p>
        </div> 
          {law}
        </List>
      );
  }
}
export default LxlslbCPT;