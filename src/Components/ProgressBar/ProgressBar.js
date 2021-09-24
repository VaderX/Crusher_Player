import './ProgressBar.css';
import React from 'react';
import { Input } from 'reactstrap';

const ProgressBar = (props) => {
	const slider = React.useRef(null);

	const changeTime = (e)=>{
		props.changeDuration(e.target.value);
	}

	return (
		<React.Fragment>
			<Input
			type="range" 
			min="0" 
			max={props.total} 
			className="ProgressContainer cursor" 
			value={props.current} 
			ref={slider} 
			onChange={(e)=>changeTime(e)} 
			/>
		</React.Fragment>
	)
}

export default ProgressBar;