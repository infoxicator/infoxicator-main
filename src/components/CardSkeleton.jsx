import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingSkeleton = () => (
  <React.Fragment>
    <Skeleton animation="wave" height={20} width="30%" />
    <Skeleton animation="wave" height={10} width="30%" />
    <Skeleton animation="wave" variant="rect" width={600} height={100} />
    <Skeleton animation="wave" height={20} width="10%" />
    <Skeleton animation="wave" variant="rect" width={160} height={216} />
  </React.Fragment>
);

export default LoadingSkeleton;
