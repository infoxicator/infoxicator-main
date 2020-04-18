import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import dayjs from 'dayjs';
import { Link } from '@americanexpress/one-app-router';

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

const createMarkup = (markup) => ({ __html: markup });

const FeaturedPost = ({ post, hideImage }) => {
  const classes = useStyles();

  return (
    <Grid item={true} md={12}>
      <CardActionArea component={Link} to={post.slug}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title.rendered}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {dayjs(post.date).format('MMMM DD, YYYY')}
              </Typography>
              <Typography variant="subtitle1" paragraph={true}>
                <div dangerouslySetInnerHTML={createMarkup(post.excerpt.rendered)} />
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>

          {post.better_featured_image && post.better_featured_image.source_url && !hideImage
          && (
            <Hidden xsDown={true}>
              <CardMedia className={classes.cardMedia} image={post.better_featured_image.source_url} title="Image Title" />
            </Hidden>
          )}
        </Card>
      </CardActionArea>
    </Grid>
  );
};

FeaturedPost.propTypes = {
  post: PropTypes.shape({}),
};

export default FeaturedPost;
