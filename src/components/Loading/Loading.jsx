import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const Loading = () => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 9999,
                }}
            >
                <CircularProgress size={'50px'} sx={{ color: '#B18D61' }} />
            </div>
        </div>
    );
};

export default Loading;
