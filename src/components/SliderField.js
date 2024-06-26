import { InputLabel, Slider, useMediaQuery } from "@material-ui/core";
import { useState } from "react";
import { grey } from "@material-ui/core/colors";
import BasicTooltip from "./BasicTooltip";
import "./Slider.css";

const SliderField = ({ label, className, minValue=0, maxValue=100, handleChange=null, tooltip}) => {

    const matches = useMediaQuery('(min-width:600px)');
    let marks;
    if(matches){
        marks = [
            {
              value: 0,
              label: '0: Calm',
            },
            {
                value: 60,
                label: '60: Balanced',
              },
            {
              value: 100,
              label: '100: Adventurous',
            },
          ];
    } else {
        marks = [
            {
              value: 0,
              label: '0',
            },
            {
                value: 60,
                label: '60',
              },
            {
              value: 100,
              label: '100',
            },
          ];
    }

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
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}} className={className}>
            <InputLabel 
                style={{
                    fontSize:'1rem',
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
                valueLabelDisplay="auto"
                style={{margin:'-.6rem .5rem 1rem 1rem', maxWidth:'100%'}}
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