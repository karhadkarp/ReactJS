import { InputLabel, Slider } from "@material-ui/core";
import { useState } from "react";
import { grey } from "@material-ui/core/colors";
import BasicTooltip from "./BasicTooltip";

const SliderField = ({ label,  minValue=0, maxValue=100, handleChange=null, tooltip}) => {

    const marks = [
        {
          value: 0,
          label: 'Calm',
        },
        {
            value: 60,
            label: 'Balanced',
          },
        {
          value: 100,
          label: 'Adventurous',
        },
      ];

    const handleValueChange = (event, newValue) => {
        handleChange && handleChange(newValue);
    };
    
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    }
    const handleBlur = () => {
        setFocused(false);
    }

    return (
        <div style={{display:'flex', flexDirection:'row'}}>
            <InputLabel 
                style={{
                    fontSize:'.875rem',
                    color: focused ? '#1976d2' : grey[500]
                }}
            >
                {label}
            </InputLabel>
            <Slider  
                min={minValue}
                max={maxValue}
                marks={marks}
                defaultValue={50} 
                aria-label={label} 
                valueLabelDisplay="auto"
                style={{margin:'-.5rem 1rem 1rem 1rem', maxWidth:'300px'}}
                onChange={handleValueChange}
                onFocus={()=> handleFocus()}
                onBlur={() => handleBlur()}
            />
            {tooltip && <BasicTooltip
                value={tooltip}
            />}
        </div>
    );
};

export default SliderField;