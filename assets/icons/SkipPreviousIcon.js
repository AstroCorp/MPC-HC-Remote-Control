import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SkipPreviousIcon = (props) => (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 24" {...props}>
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path fill={props.color} d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </Svg>
);

export default SkipPreviousIcon;