import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocale, useTranslations } from 'next-intl';
import style from './tabs.module.css';
import Aos from 'aos';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { useGetAllSitesQuery } from '../../../../store/States/AllSitesSlice';
import { useGetSiteQuery } from '../../../../store/States/SitesCategorySlice';

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
    const category_id = data?.data?.id;
    console.log('category_id', category_id);

    const {
        data: siteData,
        isLoading,
        error,
    } = useGetAllSitesQuery({
        state_id: id,
        category_id: category_id,
        lang: locale,
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    const [isShaking, setIsShaking] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        Aos.init({ duration: 800, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-12 text-center mb-lg-4 mb-2">
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
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Tabs
                            data-aos="fade-up"
                            value={value}
                            onChange={handleChange}
                            aria-label="category tabs"
                            TabIndicatorProps={{ style: { display: 'none' } }}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {data?.data?.map((category, index) => (
                                <Tab
                                    key={category.id}
                                    label={category.name}
                                    {...a11yProps(index)}
                                    sx={{
                                        fontSize: isMobile ? '12px' : '16px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        color: '#333',
                                        '&.Mui-selected': {
                                            color: '#FFFFFF',
                                            backgroundColor: '#9F733C',
                                        },
                                        minWidth: isMobile ? '80px' : '120px',
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Box>
                </div>

                <div className="col-md-12">
                    {siteData?.data?.map((site, index) => (
                        <CustomTabPanel key={site.id} value={value} index={index}>
                            <motion.div
                                key={site.id}
                                className="col-md-4 mb-3"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                            >
                                <div className={`${style.cardSectionAlsoLink} card`}>
                                    <div className={style.imageWrapper}>
                                        <img
                                            className={style.cardSectionImg}
                                            src={site.banner || '/homepage/top-trip/2.jpeg'}
                                            alt={site.name}
                                            data-aos="fade-up"
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h5 data-aos="fade-up" className={style.cardTitleAlsoLink}>
                                            {site.name}
                                        </h5>
                                        <p
                                            data-aos="fade-up"
                                            className={style.catDesc}
                                            dangerouslySetInnerHTML={{
                                                __html: site.description,
                                            }}
                                        ></p>
                                        <motion.div
                                            className="d-flex justify-content-center align-items-center gap-2"
                                            animate={isShaking ? { x: [-2, 2, -2, 2, 0] } : {}}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Link
                                                className="text-main d-flex justify-content-center align-items-center gap-2"
                                                href={`/${locale}/destinations/${id}/Sites/${site.id}`}
                                            >
                                                {t('Read More')}
                                                <ArrowForwardIcon
                                                    fontSize="small"
                                                    className="pt-1"
                                                    sx={{ fontSize: '27px' }}
                                                />
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </CustomTabPanel>
                    ))}
                </div>
            </div>
        </div>
    );
}
