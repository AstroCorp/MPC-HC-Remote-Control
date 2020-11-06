import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlayArrow = (props) => (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 24" {...props}>
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path d="M8 5v14l11-7z" />
    </Svg>
);

export default PlayArrow;