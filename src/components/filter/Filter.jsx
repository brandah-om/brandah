import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Tune';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import style from './filter.module.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Filter = ({ open, handleClickOpen, handleClose }) => {
    return (
        <React.Fragment>
            <Button onClick={handleClickOpen}>
                <SettingsIcon
                    sx={{ width: '50px', height: '50px', color: '#9F733C', ml: '10px' }}
                />
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="md"
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={theme => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent className="p-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className={style.filterTitle}>Filter by State:</h6>
                                <div className="px-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Muscat"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Dhofar"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Musandam"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Al Buraimi"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Al Dakhiliyah"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Al Batinah North"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Al Batinah South"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Al Sharqiyah N"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Al Sharqiyah S"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Al Dhahirah"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    {/* <div className="d-flex justify-content-between align-items-center">
                                    <FormControlLabel
                                        control={ <Checkbox
                                                defaultChecked
                                                sx={{
                                                    color: '#9F733C', 
                                                    '&.Mui-checked': {
                                                        color: '#65558F', 
                                                    },
                                                }}
                                            />}
                                        label="Al Wusta"
                                    />
                                    <span>(232)</span>
                                </div> */}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h6 className={style.filterTitle}>Filter by Rate:</h6>
                                <div className="px-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="5 Stars"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="4 Stars"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="3 Stars"
                                        />
                                        <span>(232)</span>
                                    </div>
                                </div>
                                <h6 className={`${style.filterTitle} mt-2`}>Filter by Rate:</h6>
                                <div className="px-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Apartments"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Hotels"
                                        />
                                        <span>(232)</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Homestays"
                                        />
                                        <span>(232)</span>
                                    </div>
                                    <button className={style.filterBtn}>Apply Filters</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
};

export default Filter;
