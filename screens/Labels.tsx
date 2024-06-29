// import React from 'react';
// import { Text as SVGText } from 'react-native-svg';

// interface LabelsProps {
//   x: (value: number) => number;
//   y: (index: number) => number;
//   bandwidth: number;
//   data: { value: number; label: string }[];
// }

// const Labels: React.FC<LabelsProps> = ({ x, y, bandwidth, data }) => (
//   <>
//     {data.map((item, index) => (
//       <SVGText
//         key={index}
//         x={x(item.value)}
//         y={y(index) + (bandwidth / 2)}
//         fontSize={14}
//         fill="black"
//         alignmentBaseline="middle"
//       >
//         {item.value}
//       </SVGText>
//     ))}
//   </>
// );

// export default Labels;
