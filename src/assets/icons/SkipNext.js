import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SkipNext = (props) => (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 24" {...props}>
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path fill={props.color} d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </Svg>
);

export default SkipNext;