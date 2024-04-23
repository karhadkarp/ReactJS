import { Backdrop, Box, CircularProgress, Divider, Grid, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { Article, ArticleOutlined, Person } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import MultipleSelect from '../components/MultiSelect';
import InputText from '../components/InputText';
import { useState } from 'react';
import SliderValue from '../components/SliderField';
import CardField from '../components/CardField';
import ResponsiveDialog from '../components/ResponsiveDialog';
import { getCustomers, getCutomerQueryResp, getGeneralQueryResp } from '../apis.js';
import Flag from 'react-world-flags'
import {countries} from "./countries.js"

const Application = () => {

    const [query, setQuery] = useState('');
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [queryData, setQueryData] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('')
    const [pageLoading, setPageLoading] = useState(false);
    const [origialText, setOriginalText] = useState('');
    const [creativity, setCreativity] = useState(0.5);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [convertedText, setConvertedText] = useState('');
    const [showLocal, setShowLocal] = useState(false);
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('');
    const [customerLoading, setCustomerLoading] = useState(false);
    const [customerError, setCustomerError] = useState('');
    const [pageError, setPageError] = useState('');
    
    const getCustomerData = async (cust) => {
        setContent('');
        setConvertedText('');
        setOriginalText('');
        setShowLocal(false);
        setLanguage('');
        setCountry('');
        setCustomerLoading(true);
        setProducts([]);
        setCustomers([]);
        setCustomerError('');
        if (cust && cust.length > 0) {
            const customers = await getCustomers(cust);
            if(customers.length > 0){
                customers.forEach(cust => {
                    if(cust.cust_geography){
                        cust.cust_country = countries[cust.cust_geography]['country'];
                        const len = countries[cust.cust_geography]['language'].length;
                        let index = 0;
                        if(len > 1) {
                            index = Math.floor(Math.random() * len);
                        }
                        cust.cust_language = countries[cust.cust_geography]['language'][index];
                    };
                })
                setCustomers(customers);
            } else {
                setCustomerError('No results found. Please try a different search.')
            }
        }
        setCustomerLoading(false);
    }

    const clearData = () => {
        setContent('');
        setConvertedText('');
        setOriginalText('');
        setShowLocal(false);
        setLanguage('');
        setCountry('');
        setCustomerLoading(false);
        setProducts([]);
        setCustomers([]);
    }

    const handleProductsChange = (val) => {
        setContent('');
        setConvertedText('');
        setOriginalText('');
        setShowLocal(false);
        setSelectedProducts(val);
    }

    const handleQueryInfo = (val) => {
        setQuery(val)
        setContent('');
        setConvertedText('');
        setOriginalText('');
        setShowLocal(false);
    }

    const handleCustomerInfo = (val) => {
        setSelectedCustomerId(val);
        customers.forEach(cust => {
            if (cust.customer_id === val) {
                setProducts(cust.sug_products.map(prd => {
                    return {
                        id: prd.SugProdID,
                        value: prd.SugProdName
                    }
                }));
                setCountry(cust.cust_country);
                setLanguage(cust.cust_language);
            }
        })
    }

    const handleCreativityValue = val => {
        setCreativity(val / 100);
        setContent('');
        setConvertedText('');
        setOriginalText('');
        setShowLocal(false);
    }

    const handleClick = async () => {
        setPageError('');
        if(content.length > 0){
            setShow(true);
            return;
        }       
        setPageLoading(true);
        if(query){
            setQueryData([...queryData, query]);
        }
        setLoading(true);
        try {
            let respText = await getCutomerQueryResp({
                 prompt: query, 
                 creativity: creativity, 
                 productId: selectedProducts, 
                 customerId: selectedCustomerId,
                 customerCountry: country
            });
            setOriginalText(respText);
            let sanitizedText = respText.replace('```html', '');
            sanitizedText = sanitizedText.replace('```', '')
            setContent(sanitizedText);
            setShow(true);
        } catch (error){
            setPageError('An error occured. Please try again.')        
        }
        setLoading(false);
        setPageLoading(false);
    }
       
    const handleConversion = async () => {
        if(convertedText.length > 0){
            setShowLocal(!showLocal);
            return;
        }
        setShowLocal(!showLocal);
        setShow(false);
        setPageLoading(true);
        setLoading(true);
        let respText = await getGeneralQueryResp({data: `Convert the following text in ${language} language ${origialText}`, creativity: .5});
        respText = respText.replace('```html', '');
        respText = respText.replace('```', '')
        setConvertedText(respText);
        setShow(true);
        setLoading(false);
        setPageLoading(false);
    }

    return (
        <Box sx={{ flexGrow: 1, margin: '1rem 2rem' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
            >
                <CircularProgress color="primary" />
            </Backdrop>
            <Grid container spacing={2} direction="row" justifyContent='space-between'>
                <Grid item md={6} xs={12}>
                    <InputText
                        label={'Customer Name'}
                        handleChange={val => handleCustomerInfo(val)}
                        enableTypeAhead={true}
                        getData={getCustomerData}
                        clearData={clearData}
                        suggestionsData={customers}
                        showFlag={true}
                        message={customerError}
                        startAdornment={customerLoading? <CircularProgress color='primary' /> :<InputAdornment position="start"><Person fontSize='large' color='primary'/></InputAdornment>}
                        endAdorment={<Flag code={ country } height="16"/>}
                    />
                    <MultipleSelect
                        label="Products to Market"
                        options={products}
                        handleChange={val => handleProductsChange(val)} />

                    <Grid container style={{ marginTop: '3rem' }}>
                        <Grid item xs={12}>
                            <SliderValue
                                label="Creativity"
                                className="slider"
                                handleChange={val => handleCreativityValue(val)}
                                tooltip={<><strong>This the creativity slider.</strong><p>Please move the slider value to the creativity level you want. Higher value corresponds to more creative. For very formal communication you can select lower level of creativity.</p></>}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Grid container >
                        <Grid item xs={12}>
                            <InputText
                                label={'Additional Instructions'}
                                multiline={true}
                                width='100%'
                                handleChange={val => handleQueryInfo(val)}
                                startAdornment={<InputAdornment position="start"><Article fontSize='large' color='primary'/></InputAdornment>}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {!pageLoading && <CardField label="Instructions History" values={queryData} />}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>

                    <Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />

                    <LoadingButton
                        onClick={handleClick}
                        loading={loading}
                        loadingPosition="end"
                        endIcon={<ArticleOutlined />}
                        variant="contained"
                        color='primary'
                    >
                        <span>Generate Content</span>
                    </LoadingButton>
                    <InputLabel
                        style={{
                            fontSize:'.8rem',
                            color: '#d32f2f'
                        }}
                    >
                        {pageError}
                    </InputLabel>
                    <ResponsiveDialog
                        showDialog={show}
                        content={content}
                        converttoLocal={handleConversion}
                        customerLanguage={language}
                        customerCountry={country}
                        showLocal={showLocal}
                        htmlContent={
                            showLocal ? <div dangerouslySetInnerHTML={{ __html: convertedText }} /> :<div dangerouslySetInnerHTML={{ __html: content }} />}
                        closeDialog={() => setShow(false)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Application;
