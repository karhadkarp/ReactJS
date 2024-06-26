import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox, ListItemText } from '@material-ui/core';
import './MultiSelect.css';
import { useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelect = ({
    options=[], 
    label='', 
    handleChange=null
})  => {
  console.log(options);
  const [item, setItem] = React.useState([]);

  useEffect(() => {
    if(options.length=== 0) {
      setItem([]);
    }
  }, [options])

  const handleValueChange = (event) => {
    const {
      target: { value },
    } = event;
    setItem(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    handleChange && handleChange(options.filter(option => value.includes(option.value)).map(option => option.id));
  };

  return (
    <div style={{marginTop:'1.2rem'}}>
      <FormControl fullWidth variant='standard'>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={options.length > 0 ?item:''}  
          onChange={handleValueChange}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options.map(({id, value}) => (
            <MenuItem
              key={id}
              value={value}
            >
              <Checkbox checked={item.indexOf(value) > -1} color='primary' />
              <ListItemText primary={value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelect;