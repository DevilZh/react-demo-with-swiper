import React from 'react';
import style from './style.less';
import classnames from 'classnames';
import API from '../../utils/api';
import {DOMAIN, GET_IMG_URL} from '../../constant/api';

export default class Brand extends React.Component {
	state = {
		brands: null,
		activeTabs: 0
	};
	componentDidMount() {
		API.getBrands().then((res) => {
			this.setState({
				brands: res.data.brands
			})
		})
	}
	redirect(id) {
		location.href = `${location.origin}#/brand?id=${id}`;
	}
	//important: reduce unnecessary render,ensuer High performance
	shouldComponentUpdate(nextProps, nextState) {
		return null == this.state.brands;
	}
	render() {
		let {brands} = this.state;
		return (
			<div className={style.brand}>
				<ul>
					{brands && brands.map((one, key) => {
						return (
							<li className={style.item} key={key} onClick={this.redirect.bind(this,one.id)}>
								<img src={GET_IMG_URL(one.logo)} alt="icon"/>
								<p>{one.name}</p>
							</li>
						)
					})}
				</ul>
			</div>
		);
	}
}