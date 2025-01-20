import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import style from './dynamicBreadcrumbs.module.css';

const DynamicBreadcrumbs = ({ items }) => {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                {items.map((item, index) =>
                    item.href ? (
                        <Link
                            key={index}
                            className={style.links}
                            underline="hover"
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <Typography
                            key={index}
                            className={style.subLink}
                            sx={{ color: 'text.primary' }}
                        >
                            {item.label}
                        </Typography>
                    )
                )}
            </Breadcrumbs>
        </div>
    );
};

export default DynamicBreadcrumbs;
