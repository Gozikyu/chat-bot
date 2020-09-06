import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { color } from '@material-ui/system';

const useStyles = makeStyles(() => 
    createStyles({
        "button": {
            borderColor: "#FF7260",
            color: "#FF7260",
            fontWeight: 600,
            marginBottom: "8px",
            "&:hover": {
                backgroundColor: "#FF7260",
                color: "#fff"
            }

        }
    })
);

const Answer = (props) =>{
    const classes = useStyles();

    return(
        <Button 
            className={classes.button}
            variant="outlined"  onClick={() => {props.select(props.content, props.nextId)}}
        >
            {props.content}
        </Button>

    )
}

export default Answer;
