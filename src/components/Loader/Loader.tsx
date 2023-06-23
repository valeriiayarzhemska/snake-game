import { RotatingSquare } from  'react-loader-spinner'
import { mintColor } from '../../constants';

export const Loader = () => (
  <RotatingSquare
    height="40"
    width="40"
    color={mintColor}
    ariaLabel="rotating-square-loading"
    strokeWidth="4"
  />
);
