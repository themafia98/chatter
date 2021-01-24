import { ReactElement } from 'react';

type DoneIconProps = {
  size?: string;
  color?: string;
};

const DoneIcon = ({ size, color }: DoneIconProps): ReactElement => 
  <svg
    style={{
      width: `${size}px`,
      height: `${size}px`,
    }}
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 495.787 495.787">
    <g>
      <g>
        <g>
          <rect
            fill={color}
            x="-9.583"
            y="294.975"
            transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.2081 592.7892)"
            width="168.499"
            height="42.69"
            />
          <polygon
            fill={color}
            points="375.147,134.987 344.96,104.8 209.707,240.16 239.893,270.347 			"
            />
          <polygon
            fill={color}
            points="465.707,104.8 239.787,330.613 150.827,241.653 120.64,271.84 239.787,390.987 495.787,134.987 			"
            />
        </g>
      </g>
    </g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </svg>
;
export default DoneIcon;