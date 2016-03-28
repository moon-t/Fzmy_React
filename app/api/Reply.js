import React from 'react';
import ReactDOM from 'react-dom';
import  {Input,ModalTrigger,Modal,Icon} from 'amazeui-react';
import Process  from '../api/process.js';
class Reply extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value : "",
      isActive:false,
      modalStr:"",
      imid:"",
      uname:""
    }
  }
  
  /*获取回复框的内容*/
  changevalue(e){
    let that = this;
    that.setState({
      value:e.target.value
    });
  }

  /*提交回复*/
  handleSubmit(e){
    e.preventDefault();
    let imid = window.location.href.split('=')[1].split('&_')[0];
    console.log(imid);
    let that = this;
    let process = new Process({
      "url":"http://1.fzmy1.applinzi.com/index.php/Home/reply/addReply",
      options:{
        "imid":imid,
        "tcontent":this.state.value,
        "iuid":"2",
        "callback":"lists",
        "uname":"张亚勤"
      },
      headers:{},
      callback:function(data){
        data = JSON.parse(data.slice(0,-1).slice("lists".length+1));
        console.log(data.success);
        if(data.success == true){
          that.setState({
            imid:imid,
            modalStr:"回复成功",
            isActive:true
          })
        }else{
           that.setState({
            modalStr:"回复失败，请重试",
            isActive:true
          })
        }
      }
    });
    console.log(1);
    process.push();
   } 

  /*提交回复后的弹出框的点击事件*/
  handleClick(e){
    e.preventDefault();
    window.location.reload();
  }

  render(){
    let _this = this;
    console.log(this.state.value);
    var modal =  (function(){
      return  <Modal type="alert" 
                title="提示" 
                onClick={_this.handleClick.bind(_this)}>
                  {_this.state.modalStr}
              </Modal>
    }());

    return (
      <div id="replydiv">
        <input 
          id="replyinput"
          placeholder="添加回复"
          value={this.state.value}
          onChange={_this.changevalue.bind(_this)} /> 
        <ModalTrigger 
          modal={modal} 
          open={this.state.isActive}>
          <Icon id="replyplane" 
            icon="paper-plane" 
            onClick={this.handleSubmit.bind(this)}/>
        </ModalTrigger>    
      </div>    
    )
  }
}

export default Reply;