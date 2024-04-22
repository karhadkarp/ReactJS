import { Backdrop, Box, CircularProgress, Divider, Grid, InputAdornment, useMediaQuery, useTheme } from '@material-ui/core';
import { Article, ArticleOutlined, Person } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import MultipleSelect from '../components/MultiSelect';
import InputText from '../components/InputText';
import { useState } from 'react';
import SliderValue from '../components/SliderField';
import CardField from '../components/CardField';
import ResponsiveDialog from '../components/ResponsiveDialog';
import { getCustomers, getCutomerQueryResp } from '../apis.js';
import Flag from 'react-world-flags'

const Application = () => {

    const theme = useTheme();
    const matcheSmall = useMediaQuery(theme.breakpoints.up('md'));

    const [query, setQuery] = useState('');
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [queryData, setQueryData] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    const [selectedProducts, setSelectedProducts] = useState([]);
    const handleProductsChange = (val) => {
        console.log(val);
        setSelectedProducts(val);
    }

    const handleQueryInfo = (val) => {
        setQuery(val)
    }

    const [country, setCountry] = useState('');

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
                setCountry(cust.cust_country ? cust.cust_country : 'IN');
            }
        })
        console.log(val);
    }

    const [creativity, setCreativity] = useState(0.5);
    const handleCreativityValue = val => {
        console.log(val);
        setCreativity(val / 100);
    }

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('')
    const [pageLoading, setPageLoading] = useState(false);

    const handleClick = async () => {
        setPageLoading(true);
        if(query){
            setQueryData([...queryData, query]);
        }
        setLoading(true);
        let respText = await getCutomerQueryResp({
             prompt: query, 
             creativity: creativity, 
             productId: selectedProducts[0], 
             customerId: selectedCustomerId,
             customerCountry: country
        });
        respText = respText.replace('```html', '');
        respText = respText.replace('```', '')
        setContent(respText);
        setShow(true);
        setLoading(false);
        setPageLoading(false);
    }

    const [customerLoading, setCustomerLoading] = useState(false);
    
    const getCustomerData = async (cust) => {
        setCustomerLoading(true);
        if (cust && cust.length > 0) {
            const customers = await getCustomers(cust);
            setProducts([]);
            setCustomers(customers);
        }
        setCustomerLoading(false);
    }

    return (
        <Box sx={{ flexGrow: 1, margin: '1rem 2rem' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={2} direction="row" justifyContent='space-between'>
                <Grid item md={6} xs={12}>
                    <InputText
                        label={'Customer Information'}
                        handleChange={val => handleCustomerInfo(val)}
                        enableTypeAhead={true}
                        getData={getCustomerData}
                        suggestionsData={customers}
                        showFlag={true}
                        startAdornment={customerLoading? <CircularProgress /> :<InputAdornment position="start"><Person fontSize='large' /></InputAdornment>}
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
                                tooltip={<><strong>This the creativity slider.</strong><p>Please move the slider value to the creativity level you want. The higer value the more creative the model will be. For very formal communication you can select lower level of creativity.</p></>}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Grid container >
                        <Grid item xs={12}>
                            {/* <TextAreaField label='Query Details'/> */}
                            <InputText
                                label={'Custom Query'}
                                multiline={true}
                                width='100%'
                                handleChange={val => handleQueryInfo(val)}
                                startAdornment={<InputAdornment position="start"><Article fontSize='large' /></InputAdornment>}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {!pageLoading && <CardField label="Query History" values={queryData} />}
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
                    >
                        <span>Generate Content</span>
                    </LoadingButton>
                    <ResponsiveDialog
                        showDialog={show}
                        content={content}
                        htmlContent={<div dangerouslySetInnerHTML={{ __html: content }} />}
                        closeDialog={() => setShow(false)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Application;
