import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

const LoadingSkeleton = () => {
  const classes = useStyles();
  return (
    <Grid item={true} md={12}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Skeleton animation="wave" height={20} width="30%" />
            <Skeleton animation="wave" height={10} width="30%" />
            <Skeleton animation="wave" variant="rect" width={600} height={100} />
            <Skeleton animation="wave" height={20} width="10%" />
          </CardContent>
        </div>
        <Hidden xsDown={true}>
          <Skeleton animation="wave" variant="rect" width={160} height={216} />
        </Hidden>
      </Card>
    </Grid>
  );
};

export default LoadingSkeleton;
