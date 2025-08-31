'use client';

import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Box,
    Chip,
    InputAdornment, // ADD THIS IMPORT
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { KeyboardArrowDown, Check } from '@mui/icons-material';

// Styled components for enhanced appearance
const StyledFormControl = styled(FormControl)(({ theme, error }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#2a2a2a',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#333333',
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
                borderWidth: '2px',
            },
        },
        '&.Mui-focused': {
            backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2a2a2a',
            boxShadow: error 
                ? `0 0 0 3px ${theme.palette.error.main}20` 
                : `0 0 0 3px ${theme.palette.primary.main}20`,
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
                borderWidth: '2px',
            },
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? theme.palette.error.main : theme.palette.divider,
            transition: 'all 0.3s ease',
        },
    },
    '& .MuiInputLabel-root': {
        fontWeight: 600,
        color: error ? theme.palette.error.main : theme.palette.text.secondary,
        '&.Mui-focused': {
            color: error ? theme.palette.error.main : theme.palette.primary.main,
        },
    },
    '& .MuiSelect-select': {
        paddingY: '14px',
        paddingX: '16px',
        minHeight: 'unset',
        // MODIFY PADDING WHEN ICON IS PRESENT
        paddingLeft: (props) => props.hasIcon ? '12px' : '16px',
    },
    // ADD ICON STYLING
    '& .MuiInputAdornment-root': {
        marginLeft: '16px',
        marginRight: '8px',
        color: theme.palette.text.secondary,
        '& .MuiSvgIcon-root': {
            fontSize: '20px',
            transition: 'color 0.3s ease',
        },
        '.Mui-focused &': {
            color: theme.palette.primary.main,
        },
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    borderRadius: '8px',
    margin: '4px 8px',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' 
            ? theme.palette.primary.main + '10' 
            : theme.palette.primary.main + '20',
        transform: 'translateX(4px)',
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main + '15',
        color: theme.palette.primary.main,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: theme.palette.primary.main + '20',
        },
    },
    '&.Mui-disabled': {
        fontStyle: 'italic',
        color: theme.palette.text.disabled,
    },
}));

const StyledFormHelperText = styled(FormHelperText)(({ theme, error }) => ({
    marginLeft: '8px',
    marginTop: '8px',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: error ? theme.palette.error.main : theme.palette.text.secondary,
}));

const CustomDropdownIcon = styled(KeyboardArrowDown)(({ theme }) => ({
    transition: 'transform 0.3s ease',
    color: theme.palette.text.secondary,
    '.Mui-focused &': {
        transform: 'rotate(180deg)',
        color: theme.palette.primary.main,
    },
}));

const JobDropDown = ({
    label,
    name,
    value,
    onChange,
    onBlur,
    options = [],
    placeholder = 'Select an option',
    fullWidth = true,
    size = 'medium',
    variant = 'outlined',
    error,
    helperText,
    sx,
    showSelectedIcon = true,
    multiSelect = false,
    startIcon = null, // ADD THIS NEW PROP
}) => {
    const labelId = `${name}-label`;
    const selectId = `${name}-select`;

    const renderValue = (selected) => {
        if (!selected || (Array.isArray(selected) && selected.length === 0)) {
            return <em style={{ color: '#999' }}>{placeholder}</em>;
        }

        if (multiSelect && Array.isArray(selected)) {
            return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((val) => {
                        const option = options.find(opt => opt.value === val);
                        return (
                            <Chip
                                key={val}
                                label={option?.label || val}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{
                                    height: '24px',
                                    fontSize: '0.75rem',
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    '& .MuiChip-deleteIcon': {
                                        color: 'primary.contrastText',
                                    },
                                }}
                            />
                        );
                    })}
                </Box>
            );
        }

        const selectedOption = options.find(opt => opt.value === selected);
        return selectedOption?.label || selected;
    };

    return (
        <StyledFormControl
            fullWidth={fullWidth}
            size={size}
            variant={variant}
            error={error}
            sx={{ my: 1.5, ...sx }}
            hasIcon={!!startIcon} // ADD THIS PROP
        >
            <InputLabel id={labelId} shrink>
                {label}
            </InputLabel>
            <Select
                labelId={labelId}
                id={selectId}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                label={label}
                multiple={multiSelect}
                displayEmpty
                renderValue={renderValue}
                IconComponent={CustomDropdownIcon}
                // ADD START ADORNMENT FOR ICON
                startAdornment={
                    startIcon && (
                        <InputAdornment position="start">
                            {startIcon}
                        </InputAdornment>
                    )
                }
                MenuProps={{
                    PaperProps: {
                        sx: {
                            borderRadius: '12px',
                            marginTop: '8px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                            border: '1px solid',
                            borderColor: 'divider',
                            maxHeight: '300px',
                        },
                    },
                    MenuListProps: {
                        sx: {
                            paddingY: '8px',
                        },
                    },
                }}
            >
                <StyledMenuItem disabled value="">
                    <em>{placeholder}</em>
                </StyledMenuItem>
                {options.map((option) => {
                    const isSelected = multiSelect 
                        ? Array.isArray(value) && value.includes(option.value)
                        : value === option.value;
                    
                    return (
                        <StyledMenuItem key={option.value} value={option.value}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>
                                <span>{option.label}</span>
                                {showSelectedIcon && isSelected && (
                                    <Check sx={{ 
                                        fontSize: '16px', 
                                        color: 'primary.main',
                                        ml: 1
                                    }} />
                                )}
                            </Box>
                        </StyledMenuItem>
                    );
                })}
            </Select>
            {helperText && (
                <StyledFormHelperText error={error}>
                    {helperText}
                </StyledFormHelperText>
            )}
        </StyledFormControl>
    );
};

export default JobDropDown;