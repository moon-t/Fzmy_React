import React from 'react';
import { Slider , Container , Main,Panel,ListItem,List,Pagination,Table,Divider} from 'amazeui-react';
import Process  from '../api/process.js';
import ZxlslbCPT from '../api/ZxlslbCPT.js';
import LxlslbCPT from '../api/LxlslbCPT.js';
class ZjlbCPT extends React.Component{
	render (){
		return (
				<div>
				<ZxlslbCPT />
				<LxlslbCPT />
				</div>
			)
	}
}
export default ZjlbCPT;