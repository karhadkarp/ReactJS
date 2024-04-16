import { Box, Divider, Grid, InputAdornment } from '@material-ui/core';
import { ArticleOutlined, Person } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
// import MultipleSelect from '../components/MultiSelect';
import InputText from '../components/InputText';
import { useState } from 'react';
import SliderValue from '../components/SliderField';
import NumberField from '../components/NumberField';
import CardField from '../components/CardField';
import ResponsiveDialog from '../components/ResponsiveDialog';
import { getGeneralQueryResp, handleGeneralQuery } from '../apis.js';

const products = [
    {id: 'product1', value: 'Product 1'},
    {id: 'product2', value: 'Product 2'},
    {id: 'product3', value: 'Product 3'},
    {id: 'product4', value: 'Product 4'},
    {id: 'product5', value: 'Product 5'},
    {id: 'product6', value: 'Product 6'},
    {id: 'product7', value: 'Product 7'},
    {id: 'product8', value: 'Product 8'},
    {id: 'product9', value: 'Product 9'},
    {id: 'product10', value: 'Product 10'}
  ];
  
const SimpleApp = () => {
   
    const[creativity, setCreativity] = useState(50);
    const handleCharacterSize = val => {
        console.log(val);
    }
    
    const handleCreativityValue = val => {
        console.log(val);
        setCreativity(val);
    }

    const[query, setQuery] = useState('');
    const[show, setShow] = useState(false);
    const[queryData, setQueryData] = useState(null);

    const handleQueryInfo = (val) => {
        console.log(val);
        setQuery(val)
    }

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('')
    const handleClick = async () => {
        setQueryData(query);
        setLoading(true);
        const respText = await getGeneralQueryResp({data: query, creativity: creativity/100});
        debugger;
        setContent(respText);
        setShow(true);
        setLoading(false);
    }

    return (
        <Box sx={{ flexGrow: 1, margin:'1rem 2rem' }}>
            <Grid container spacing={2} direction="row" justifyContent='space-evenly'>
                <Grid item xs={12}>
                    {/* <InputText 
                        label={'Customer Information'} 
                        handleChange={val=> handleCustomerInfo(val)}
                        startAdornment={<InputAdornment position="start"><Person fontSize='large'/></InputAdornment>}
                    /> */}
                    <Grid container style={{marginTop:'.5rem'}}>
                        <Grid item md={6} xs={12}>
                            {/* <TextAreaField label='Query Details'/> */}
                            <InputText 
                                label={'Custom Query'} 
                                multiline={true}
                                width='80%'
                                handleChange={val=> handleQueryInfo(val)}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <CardField label="Query History" value={queryData}/>
                        </Grid>
                    </Grid>

                    <Grid container style={{marginTop:'3rem'}}>
                        <Grid item md={6} xs={12}>
                            <SliderValue 
                                label="Creativity" 
                                handleChange={val => handleCreativityValue(val)}
                                className="slider"
                                tooltip={<><strong>This the creativity slider.</strong><p>Please move the slider value to the creativity level you want. The higer value the more creative the model will be. For very formal communication you can select lower level of creativity.</p></>}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <NumberField 
                                label="Character Size" 
                                handleChange={val => handleCharacterSize(val)}
                                tooltip={<><strong>This the creativity slider.</strong><p>Please move the slider value to the creativity level you want. The higer value the more creative the model will be. For very formal communication you can select lower level of creativity.</p></>}
                            />
                        </Grid>
                    </Grid>                    

                    <Divider style={{marginTop:'2rem', marginBottom:'2rem'}} />

                    <LoadingButton
                            onClick={handleClick}
                            loading={loading}
                            loadingPosition="end"
                            endIcon={<ArticleOutlined />}
                            variant="contained"
                        >
                        <span>Generate Content</span>
                    </LoadingButton>
                    <ResponsiveDialog 
                        showDialog={show}
                        content={ <div dangerouslySetInnerHTML={{ __html:content }} />}
                        title='Generative AI Webinar'
                        closeDialog={() => setShow(false)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default SimpleApp;
