import { FormControl, Input, InputLabel } from '@material-ui/core';
import { getUniqueId } from '../utils';
import { grey } from '@material-ui/core/colors';
import { useState, useEffect } from 'react';
import { Button, debounce } from '@mui/material';
import Flag from 'react-world-flags';

function InputText({ id = getUniqueId(), label, startAdornment = null, endAdorment = null, handleChange, multiline = false, width, enableTypeAhead = false, getData, suggestionsData, showFlag }) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleFocus = () => {
        setFocused(true);
    }
    const handleBlur = () => {
        setFocused(false);
    }

    useEffect(() => {
        setSuggestions(suggestionsData);
    }, [suggestionsData]);


    const debouncedFetch = debounce(value => {
        if (enableTypeAhead && value.length >= 1) {
            getData(value); 
        }
    }, 500);

    useEffect(() => {
        debouncedFetch(value);
    }, [value]);


    return (
        <div style={{ marginTop: '1.2rem', maxWidth: width ? width : '100%' }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel
                    htmlFor={id}
                    style={{
                        fontSize: '1.2rem',
                        color: focused ? '#1976d2' : grey[500]
                    }}
                >
                    {label}
                </InputLabel>
                <Input
                    id={id}
                    value={value}
                    multiline={multiline}
                    endAdornment={endAdorment}
                    startAdornment={startAdornment}
                    onChange={val => {
                        setValue(val.target.value);
                        !enableTypeAhead && handleChange && handleChange(val.target.value);
                    }}
                    onFocus={() => handleFocus()}
                    onBlur={() => handleBlur()}
                />
                {enableTypeAhead && suggestions.length > 0 && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {suggestions.map(suggestion => (
                            <Button key={suggestion.customer_id} width={'100%'}
                                onClick={() => {
                                    handleChange && handleChange(suggestion.customer_id);
                                    setValue(suggestion.cust_name);
                                    setSuggestions([]);
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'left'
                                }}>
                                <div style={{ marginRight: '1rem' }}>{suggestion.cust_name} </div>
                                {showFlag && <Flag style={{ marginTop: '.2rem' }} code={suggestion.cust_country ? suggestion.cust_country : 'IN'} height="16" />}
                            </Button>
                        ))}
                    </div>
                )}
            </FormControl>
        </div>
    );
}

export default InputText;

