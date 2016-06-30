import React from 'react';
import style from './style.less';
import classnames from 'classnames';
import API from '../../utils/api';
import {DOMAIN, GET_IMG_URL} from '../../constant/api';


export default class Category extends React.Component {
	state = {
		category: null,
		activeTabs: 0,
		tabs: [
			{img: "japan_red.png", label: "日本站"},
			{img: "korea_red.png", label: "韩国站"},
			{img: "bondedarea_red.png", label: "保税区商品"},
			{img: "all_red.png", label: "全部商品"},
		]
	};

	componentDidMount() {
		API.getCategories().then((res) => {
			this.setState({
				category: res.data.top_categories
			})
		})
	}

	//important: reduce unnecessary render,ensuer High performance
	shouldComponentUpdate(nextProps, nextState) {
		return null == this.state.category || nextState.activeTabs != this.state.activeTabs;
	}

	handleTabs(target) {
		this.setState({
			activeTabs: target
		})
	}

	render() {
		let {tabs, category, activeTabs} = this.state;
		return (
			<div className={style.category}>
				<div className={style.leftPart}>
					{tabs.map((one, key) => {
						return (
							<div className={classnames(style.item, key == activeTabs?style.active:'')}
									 onClick={this.handleTabs.bind(this,key)} key={key}>
								<img src={DOMAIN+one.img} alt="logo"/>
								<p>{one.label}</p>
							</div>
						)
					})}
				</div>
				<div className={style.rightPart}>
					{category && activeTabs < 2 && category[activeTabs].categories.map((v, k) => {
						let {sub_categories, category} = v;
						return (
							<ul key={k}>
								<h2>{category.name}</h2>
								{sub_categories.map((item, i) => {
									return (
										<li key={i}>
											<img src={GET_IMG_URL(item.icon)} alt="icon"/>
											<p>{item.name}</p>
										</li>
									)
								})}
							</ul>
						)
					})
					}
				</div>
			</div>
		);
	}
}