import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardSkeleton from './CardSkeleton';

const LoadingSkeleton = () => (
  <Grid container={true} spacing={4}>
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </Grid>
);

export default LoadingSkeleton;
