import { Backdrop, Box, CircularProgress, Divider, Grid, InputAdornment, useMediaQuery, useTheme } from '@material-ui/core';
import { Article, ArticleOutlined } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import InputText from '../components/InputText';
import { useState } from 'react';
import SliderValue from '../components/SliderField';
import CardField from '../components/CardField';
import ResponsiveDialog from '../components/ResponsiveDialog';
import { getGeneralQueryResp } from '../apis.js';

const SimpleApp = () => {

    const theme = useTheme();
    const matcheSmall = useMediaQuery(theme.breakpoints.up('md'));
   
    const[creativity, setCreativity] = useState(50);
    const handleCreativityValue = val => {
        console.log(val);
        setCreativity(val);
    }

    const[query, setQuery] = useState('');
    const[show, setShow] = useState(false);
    const[queryData, setQueryData] = useState([]);

    const handleQueryInfo = (val) => {
        console.log(val);
        setQuery(val)
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
        let respText = await getGeneralQueryResp({data: query, creativity: creativity/100});
        respText = respText.replace('```html', '');
        respText = respText.replace('```', '')
        setContent(respText);
        setShow(true);
        setLoading(false);
        setPageLoading(false);
    }

    return (
        <Box sx={{ flexGrow: 1, margin:'0rem 2rem' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={2} direction="row" justifyContent='space-between'>
                <Grid item md={7} xs={12}>
                    <Grid container style={{marginTop:'.5rem'}}>
                        <Grid item xs={12}>
                            {/* <TextAreaField label='Query Details'/> */}
                            <InputText 
                                label={'Custom Query'} 
                                multiline={true}
                                // width={matcheSmall ? '90%': "100%"}
                                handleChange={val=> handleQueryInfo(val)}
                                startAdornment={<InputAdornment position="start"><Article fontSize='large' /></InputAdornment>}
                            />
                        </Grid>
                    </Grid>

                    <Grid container style={{marginTop:'3rem'}}>
                        <Grid item xs={12}>
                            <SliderValue 
                                label="Creativity" 
                                handleChange={val => handleCreativityValue(val)}
                                className="slider"
                                tooltip={<><strong>This the creativity slider.</strong><p>Please move the slider value to the creativity level you want. The higer value the more creative the model will be. For very formal communication you can select lower level of creativity.</p></>}
                            />
                        </Grid>
                    </Grid>                    
                </Grid>
                <Grid item md={5} xs={12}>
                    {!pageLoading &&<CardField width='90%' label="Query History" values={queryData}/> }
                </Grid>

                <Grid item xs={12}>
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
                        content = {content}
                        htmlContent={ <div dangerouslySetInnerHTML={{ __html:content }} />}
                        closeDialog={() => setShow(false)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default SimpleApp;
