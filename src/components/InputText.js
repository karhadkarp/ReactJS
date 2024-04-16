import { FormControl, Input, InputLabel } from '@material-ui/core';
import { getUniqueId } from '../utils';
import { grey } from '@material-ui/core/colors';
import { useState } from 'react';

function InputText({id=getUniqueId(), label, startAdornment = null, endAdorment = null, handleChange, multiline=false, width}) {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    }
    const handleBlur = () => {
        setFocused(false);
    }
    return (
        <div style={{marginTop:'1.2rem', maxWidth: width ? width : '100%'}}>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel 
                htmlFor={id}
                style={{
                    fontSize:'1.2rem',
                    color: focused ? '#1976d2' : grey[500]
                  }}
            >
                {label}
            </InputLabel>
            <Input
                id={id}
                multiline={multiline}
                endAdornment={endAdorment}
                startAdornment={startAdornment}
                onChange={val => {
                    handleChange && handleChange(val.target.value)
                }}
                onFocus={()=> handleFocus()}
                onBlur={() => handleBlur()}
            />
        </FormControl>
        </div>
    );
}

export default InputText;
