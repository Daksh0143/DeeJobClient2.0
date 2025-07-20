import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

const JobTextField = ({ label, value, name, onChange, type = "text",
    placeholder = "",
    required = false,
    fullWidth = true, variant = 'outlined',
    size = 'medium',
    error,
    helperText,
    onBlur,
    sx = {},
}) => {

    return (
        <TextField label={label}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            placeholder={placeholder}
            required={required}
            fullWidth={fullWidth}
            variant={variant}
            size={size || "small"}
            error={error}
            helperText={helperText}
            sx={{ my: 1, ...sx }}

        />


    )
}

export default JobTextField