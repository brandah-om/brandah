import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocale, useTranslations } from 'next-intl';
import { useGetSiteQuery } from '@/store/States/SitesCategorySlice';
import style from './tabs.module.css';
import Aos from 'aos';
import Musuems from './Musuems';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function CategryTabs({ id }) {
    const [value, setValue] = React.useState(0);
    const t = useTranslations('HomePage');
    const locale = useLocale();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { data } = useGetSiteQuery(locale);

    React.useEffect(() => {
        Aos.init({ duration: 800, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-12 text-center mb-lg-4 mb-2">
                    <h2 data-aos="fade-up">{t('You may also like')}</h2>
                    <p data-aos="fade-up" className={style.bestCaption}>
                        {t('unique experiences and stunning')}{' '}
                    </p>
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                    <Box
                        className="bg-light"
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Tabs
                            data-aos="fade-up"
                            value={value}
                            onChange={handleChange}
                            aria-label="category tabs"
                            TabIndicatorProps={{ style: { display: 'none' } }}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            {data?.data?.map((category, index) => (
                                <Tab
                                    key={category.id}
                                    label={category.name}
                                    {...a11yProps(index)}
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        borderBottom: 'none',
                                        color: '#333',
                                        '&.Mui-selected': {
                                            color: '#FFFFFF',
                                            backgroundColor: '#9F733C',
                                            borderBottom: 'none',
                                        },
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Box>
                </div>

                <div className="col-md-12">
                    <CustomTabPanel value={value} index={0}>
                        <Musuems id={id} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        Item four
                    </CustomTabPanel>
                </div>
            </div>
        </div>
    );
}
