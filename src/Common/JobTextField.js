import { TextField } from '@mui/material'
import React from 'react'

const JobTextField = ({ label, value, name, onChange, type = "text",
    placeholder = "",
    required = false,
    fullWidth = true, variant = 'outlined',
    size = 'medium',
    sx = {},
}) => {
    return (
        <TextField label={label}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            required={required}
            fullWidth={fullWidth}
            variant={variant}
            size={size}
            sx={{ my: 1.5, ...sx }} />

    )
}

export default JobTextField