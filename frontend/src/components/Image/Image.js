import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(theme => ({
    element: {
        listStyleType: 'none',
        textAlign: 'center',
        display: 'inline-block',
        width: '100%'
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    link: {
        color: '#3f51b5'
    }

}));

const Image = ({_id, name, category, description, image}) => {
    const classes = useStyles();
    return (
        
        <Card className={classes.card} key={_id}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`data:${image}`}
                    title={name}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <span class={classes.bold}>Name: </span>{name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <span class={classes.bold}>Category: </span>{category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <span class={classes.bold}>Description: </span>{description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link className={classes.link} to={`/image/${_id}`}>
                    <VisibilityIcon />
                </Link>
                
            </CardActions>
        </Card>
        
    );
};

export default Image;