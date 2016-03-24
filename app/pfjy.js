import React from 'react';
import NavBarCPT from './api/NavBarCPT.js';
import { Header } from 'amazeui-react';
import HeaderPfjy from './storage/HeaderPfjy.js';
import ZjzxCPT from './api/ZjzxCPT.js';
class Pfjy extends React.Component{
	render(){
		return (
			<div>
				<Header {...HeaderPfjy} />
				<NavBarCPT index="普法教育" />
				<ZjzxCPT />
			</div>
		);
	}
	
}
export default Pfjy;