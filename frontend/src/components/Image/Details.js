import React from 'react';
import { Query } from 'react-apollo';
import { GET_IMAGE } from '../../queries';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../Loading';
import LikeImage from './LikeImage';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(18),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    card: {
        maxWidth: 500,
    },
    media: {
        height: 300,
        backgroundSize: 'auto 100%'
    },
}));

const Details = ({match}) => {
    const classes = useStyles();
    const { _id } = match.params;
    return (
        <Query query={GET_IMAGE} variables={{ _id }}>
            {({data, loading, error}) => {
                if (loading || error) {
                    return (
                        <Loading loading={loading} />
                    )
                }
                
                return (
                    <div className={classes.paper}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={`data:${data.getImage.image}`}
                                    title={data.getImage.name}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <span class={classes.bold}>Name: </span>{data.getImage.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <span class={classes.bold}>Category: </span>{data.getImage.category}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <span class={classes.bold}>Description: </span>{data.getImage.description}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <span class={classes.bold}>Created At: </span>{data.getImage.createdAt}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <span class={classes.bold}>Likes: </span>{data.getImage.likes}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <span class={classes.bold}>Created By: </span>{data.getImage.username}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <p><LikeImage _id={_id}/></p>  
                            </CardActions>
                            
                        </Card>
                    </div>
                    
                )
            }}
        </Query>
    )
}

export default withRouter(Details);