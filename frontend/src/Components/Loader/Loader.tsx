import { ReactElement } from 'react';
import loaderImage from './loader.gif';

type LoaderProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
};

const Loader = ({ width, height, className }: LoaderProps): ReactElement => 
  <img className={className} style={{ width, height }} src={loaderImage} />
;
Loader.defaultProps = {
  width: '',
  height: '',
  className: '',
};

export default Loader;