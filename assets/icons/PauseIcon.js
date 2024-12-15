import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PauseIcon = (props) => (
  	<Svg width={props.size} height={props.size} viewBox="0 0 24 24" {...props}>
      	<Path d="M0 0h24v24H0z" fill="none" />
      	<Path fill={props.color} d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  	</Svg>
);

export default PauseIcon;
