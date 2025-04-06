'use client';

import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';

const JobDropDown = ({
    label,
    name,
    value,
    onChange,
    onBlur,
    options = [],
    placeholder = 'Select an option',
    fullWidth = true,
    size = 'small',
    variant = 'outlined',
    error,
    helperText,
}) => {
    const labelId = `${name}-label`;
    const selectId = `${name}-select`;

    return (
        <FormControl
            fullWidth={fullWidth}
            size={size}
            variant={variant}
            error={error}
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
                displayEmpty
            >
                <MenuItem disabled value="">
                    <em>{placeholder}</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default JobDropDown;
