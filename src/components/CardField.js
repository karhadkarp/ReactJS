import { Card, CardContent, InputLabel } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { useEffect, useState } from "react";

const CardField = ({ label, value}) => {
    const [data, setData] = useState([]);


    useEffect(() => {
        let newData;
        if(value){
            newData = [...data, value];
        } else{
            newData = [...data];
        }
        setData(newData);
    }, [value]);

    return (
        <div style={{display:'flex', flexDirection:'column',minWidth: '300px', maxWidth: '400px', maxHeight: '200px'}}>
            <InputLabel 
                style={{
                    textAlign: 'left', 
                    marginBottom:'.5rem', 
                    fontSize:'.7rem',
                    color: grey[500]
                }}
            >
                {label}
            </InputLabel>
            <Card
                sx={{ minWidth: '300px', maxHeight: '1rem', overflow: 'scoll'}}>
                <CardContent>
                {
                    data && data.length > 0 &&
                    <ul style={{textAlign:'left'}}>
                            { 
                            data.map((item, index) => (
                                <li key={index}>{item}</li>
                           ))}
                    </ul>
                }
                </CardContent>
            </Card>
        </div>
    );
};

export default CardField;