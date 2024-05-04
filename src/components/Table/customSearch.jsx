import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    marginRight: theme.spacing(2),
    backgroundColor:'white'
  },
}));

const SearchField = ({ value, onChange, onSearch }) => {
  const classes = useStyles();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Grid className={classes.root} >
      <TextField
        
        className={classes.textField}
        placeholder="Search"
        variant="outlined"
        size='small'
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        onClick={onSearch} 
      />
      {/* <IconButton aria-label="search">
        <SearchIcon />
      </IconButton> */}
    </Grid>
  );
};

export default SearchField;
