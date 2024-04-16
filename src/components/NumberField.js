import { Input, InputLabel } from "@material-ui/core";
import { getUniqueId } from "../utils";
import { grey } from "@material-ui/core/colors";
import { useState } from "react";
import BasicTooltip from "./BasicTooltip";

const NumberField = ({label, defaultValue=300, handleChange=null, tooltip}) => {
    const idVal = getUniqueId();
    const handleInputChange = (event) => {
        handleChange && handleChange(event.target.value === '' ? 0 : Number(event.target.value));
    };

    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    }
    const handleBlur = () => {
        setFocused(false);
    }
    
    return (
        <div style={{ display:'flex', flexDirection:'row'}}>
            <InputLabel 
                htmlFor={idVal}
                style={{
                    fontSize:'.7rem',
                    color: focused ? '#1976d2' : grey[500]
                  }}
            >
                {label}
            </InputLabel>
            <Input
                defaultValue={defaultValue}
                id={idVal}
                onChange={handleInputChange}
                onFocus={()=> handleFocus()}
                onBlur={() => handleBlur()}
                style={{marginLeft:'1rem', marginTop:'-0.5rem'}}
                inputProps={{
                step: 10,
                min: 0,
                max: 2800,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
          />
          {tooltip && <BasicTooltip
                value={tooltip}
            />}
        </div>
    );
};

export default NumberField;