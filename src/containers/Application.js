import { Box, Divider, Grid, InputAdornment } from '@material-ui/core';
import { ArticleOutlined, Person } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import MultipleSelect from '../components/MultiSelect';
import InputText from '../components/InputText';
import { useState } from 'react';
import SliderValue from '../components/SliderField';
import NumberField from '../components/NumberField';
import CardField from '../components/CardField';
import ResponsiveDialog from '../components/ResponsiveDialog';

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
  
const Application = () => {
    const handleCustomerInfo = (val) => {
        console.log(val);
    }

    const handleProductsChange = (val) => {
        console.log(val);
    } 

    const handleCharacterSize = val => {
        console.log(val);
    }

    const handleCreativityValue = val => {
        console.log(val);
    }

    const[query, setQuery] = useState('');
    const[show, setShow] = useState(false);
    const[queryData, setQueryData] = useState(null);

    const handleQueryInfo = (val) => {
        console.log(val);
        setQuery(val)
    }

    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setQueryData(query);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
        setShow(true);
    }

    return (
        <Box sx={{ flexGrow: 1, margin:'1rem 2rem' }}>
            <Grid container spacing={2} direction="row" justifyContent='space-evenly'>
                <Grid item xs={12}>
                    <InputText 
                        label={'Customer Information'} 
                        handleChange={val=> handleCustomerInfo(val)}
                        startAdornment={<InputAdornment position="start"><Person fontSize='large'/></InputAdornment>}
                    />
                    <MultipleSelect 
                        label="Products to Market" 
                        options={products}
                        handleChange={val => handleProductsChange(val)}/>

                    <Grid container style={{marginTop:'2.2rem'}}>
                        <Grid item md={6} xs={12}>
                            <SliderValue 
                                label="Creativity" 
                                handleChange={val => handleCreativityValue(val)}
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

                    <Grid container style={{marginTop:'2.2rem'}}>
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
                        content={<><h1>Generative AI Webinar</h1><p>Join us on <strong>Sunday, April 10th at 9 am</strong> for a free webinar on Generative AI.</p>
                        <p>Generative AI is a type of artificial intelligence that can create new data from scratch. This technology has the potential to revolutionize many i ndustries, including healthcare, manufacturing, and entertainment.</p>
                        <p>In this webinar, you will learn about the basics of Generative AI, including:</p>
                        <ul>
                        <li>How Generative AI works</li>
                        <li>The different types of Generative AI</li>
                        <li>The potential applications of Generative AI</li>
                        </ul>
                        <p>You will also have the opportunity to ask questions to our expert panel.</p>
                        <p>This webinar is perfect for anyone who is interested in learning more about Generative AI. Whether you are a business professional, a student, or s imply curious about this new technology, we encourage you to join us.</p>
                        <p>To register for the webinar, please click on the following link:</p>
                        <a href="https://www.example.com/webinar-registration">https://www.example.com/webinar-registration</a> <p>We hope to see you there!</p>
                        <img src="generative-ai.jpg" alt="Generative AI"></img></>}
                        title='Generative AI Webinar'
                        closeDialog={() => setShow(false)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Application;
