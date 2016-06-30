import React from 'react';
import style from './style.less';
import classnames from 'classnames';
import Motion from 'react-motion/lib/Motion';
import spring from 'react-motion/lib/spring';

import Category from './category';
import Brand from './brand';

const springConfig = {stiffness: 300, damping: 50};
const clientW = document.body.clientWidth;
export default class App extends React.Component {
	state = {
		isPressed: false,
		mouse: null,
		delta: 0,
		active: 0,
	};
	handleTouchMove = (e) => {
		this.handleMouseMove(e.touches[0]);
	}
	handleTouchStart = (e) => {
		this.handleMouseDown(e.touches[0]);
	};
	handleMouseDown = (e) => {
		this.setState({isPressed: true, mouse: {x: e.pageX, y: e.pageY}});
	};
	handleMouseUp = (e) => {
		let {delta, active} = this.state;
		let newActive = active;
		if (delta / clientW > 0.2) {
			newActive = 0;
		}
		if (delta / clientW < -0.2) {
			newActive = -clientW;
		}
		this.setState({isPressed: false, mouse: {x: e.pageX, y: e.pageY}, active: newActive, delta: 0});
	};
	handleMouseMove = (e) => {
		let {mouse, isPressed, active} = this.state;
		let deltaX = e.pageX - mouse.x;
		if ((active == 0 && deltaX > 0) || (active != 0 && deltaX < 0)) {
			deltaX = 0;
		}
		if (Math.abs(e.pageY - mouse.y) > Math.abs(deltaX) / 4) return;
		if (isPressed) this.setState({delta: deltaX});
	};

	onNavChange(nav) {
		this.setState({nav: nav, active: nav == 0 ? 0 : -clientW})
	}

	render() {
		let {delta, isPressed, active, nav} = this.state;
		let x = active == 0 ? delta : (delta - clientW);
		let _style = isPressed ? {x: x} : {x: spring(active, springConfig)};
		return (
			<div>
				<header>
					<div className={classnames(style.tabs,'clearfix')}>
						<div onClick={this.onNavChange.bind(this,0)} className={active == 0 ? style.active:''}>分类</div>
						<div onClick={this.onNavChange.bind(this,1)} className={active !=0 ?style.active:''}>品牌</div>
						<Motion style={_style}>
							{({x}) =>
						<div className={style.bar}
								 style={{
								 transform: `translate3d(${-x/2}px,0,0)`,
								 WebkitTransform: `translate3d(${-x/2}px,0,0)`
							 }}></div>
							}
						</Motion>
					</div>
				</header>
				<Motion style={_style}>
					{({x}) =>
						<div className={style.container}
								 onMouseDown={this.handleMouseDown}
								 onMouseMove={this.handleMouseMove}
								 onMouseUp={this.handleMouseUp}
								 onTouchStart={this.handleTouchStart}
								 onTouchMove={this.handleTouchMove}
								 onTouchEnd={this.handleMouseUp}
								 style={{
								 	transform: `translate3d(${x}px,0,0)`,
								 	WebkitTransform: `translate3d(${x}px,0,0)`
								 }}>
							<Category />
							<Brand />
						</div>
					}
				</Motion>
			</div>
		);
	}
}