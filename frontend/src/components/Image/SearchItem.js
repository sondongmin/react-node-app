import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

    element: {
      listStyleType: 'none',
      textAlign: 'center',
      display: 'inline-block',
      width: '100%'
    },

}));

const SearchItem = ({_id, name, likes}) => {
    const classes = useStyles();

    return (
        <li className={classes.element} key={_id}>
          <Link to={`/images/${_id}`}> <h4>{name}</h4></Link>
          <p>Likes: {likes}</p>
        </li>
    );

};

export default SearchItem;
