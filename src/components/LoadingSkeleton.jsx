import React from 'react';
import CardSkeleton from './CardSkeleton';

const LoadingSkeleton = () => (
  <React.Fragment>
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </React.Fragment>
);

export default LoadingSkeleton;
