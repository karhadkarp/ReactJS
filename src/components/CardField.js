import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, InputLabel, Paper } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";

const CardField = ({ label, values}) => {

    return (
       
                <Accordion style={{marginTop: '2rem'}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    {label}
                    </AccordionSummary>
                    <AccordionDetails>
                    {
                        values && values.length > 0 &&
                        <ul style={{textAlign:'left'}}>
                                { 
                                values.map((item, index) => (
                                    <li key={index}>{item}</li>
                            ))}
                        </ul>
                    }
                    </AccordionDetails>
                </Accordion>
    );
};

export default CardField;