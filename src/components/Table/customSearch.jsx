import React from 'react';
import { Grid,TextField } from '@mui/material';


const SearchField = ({ value, onChange, onSearch }) => {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Grid>
      <TextField
        sx={{backgroundColor:'white'}}
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
