import React from 'react';
import NavBarCPT from './api/NavBarCPT.js';
import { Header } from 'amazeui-react';
import HeaderPfwh from './storage/HeaderPfwh.js';
import ZjlbCPT from './api/ZjlbCPT.js';
class Pfwh extends React.Component{
	render(){
		return (
			<div>
				<Header {...HeaderPfwh} />
				<NavBarCPT index="普法文化" />
				<ZjlbCPT />
			</div>
		);
	}
	
}
export default Pfwh;