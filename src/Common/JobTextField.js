import { TextField, InputAdornment } from '@mui/material';
import React from 'react';

const JobTextField = ({
    label,
    value,
    name,
    onChange,
    type = "text",
    placeholder = "",
    required = false,
    fullWidth = true,
    variant = 'outlined',
    size = 'medium',
    error,
    helperText,
    onBlur,
    multiline = false,
    rows = 1,
    maxRows,
    minRows,
    startIcon,
    endIcon,
    startAdornment,
    endAdornment,
    disabled = false,
    readOnly = false,
    autoFocus = false,
    autoComplete,
    inputProps,
    InputProps,
    sx = {},
    // Style variants
    styleVariant = 'default', // 'default', 'modern', 'gradient'
    borderRadius = 12,
    focusColor = '#6366f1',
    hoverEffect = true,
    ...otherProps
}) => {

    // Base styles that apply to all variants
    const baseStyles = {
        my: 1,
        ...sx
    };

    // Different style variants
    const getStyleVariant = () => {
        switch (styleVariant) {
            case 'modern':
                return {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: `${borderRadius}px`,
                        transition: 'all 0.3s ease',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        ...(hoverEffect && {
                            '&:hover fieldset': {
                                borderColor: focusColor,
                                borderWidth: '2px',
                                boxShadow: `0 0 0 1px ${focusColor}20`
                            }
                        }),
                        '&.Mui-focused fieldset': {
                            borderColor: focusColor,
                            borderWidth: '2px',
                            boxShadow: `0 0 0 3px ${focusColor}20`
                        },
                        '&.Mui-error fieldset': {
                            borderColor: '#ef4444',
                        },
                        '&.Mui-error:hover fieldset': {
                            borderColor: '#ef4444',
                        },
                        '&.Mui-error.Mui-focused fieldset': {
                            borderColor: '#ef4444',
                            boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
                        }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: focusColor
                    },
                    '& .MuiInputLabel-root.Mui-error': {
                        color: '#ef4444'
                    }
                };

            case 'gradient':
                return {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: `${borderRadius}px`,
                        transition: 'all 0.3s ease',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        '& fieldset': {
                            border: '2px solid transparent',
                            background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1) border-box',
                        },
                        ...(hoverEffect && {
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                '& fieldset': {
                                    background: `linear-gradient(135deg, ${focusColor}30, ${focusColor}20) border-box`,
                                }
                            }
                        }),
                        '&.Mui-focused': {
                            transform: 'translateY(-1px)',
                            boxShadow: `0 4px 20px ${focusColor}30`,
                            '& fieldset': {
                                background: `linear-gradient(135deg, ${focusColor}, ${focusColor}dd) border-box`,
                            }
                        }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: focusColor,
                        fontWeight: 600
                    }
                };

            default:
                return {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: `${borderRadius}px`,
                        transition: 'all 0.2s ease',
                        ...(hoverEffect && {
                            '&:hover fieldset': {
                                borderColor: focusColor,
                            }
                        }),
                        '&.Mui-focused fieldset': {
                            borderColor: focusColor,
                        }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: focusColor
                    }
                };
        }
    };

    // Combine InputProps
    const combinedInputProps = {
        ...(startIcon && {
            startAdornment: (
                <InputAdornment position="start">
                    {React.cloneElement(startIcon, {
                        sx: { color: error ? '#ef4444' : focusColor, ...startIcon.props?.sx }
                    })}
                </InputAdornment>
            )
        }),
        ...(endIcon && {
            endAdornment: (
                <InputAdornment position="end">
                    {React.cloneElement(endIcon, {
                        sx: { color: error ? '#ef4444' : focusColor, ...endIcon.props?.sx }
                    })}
                </InputAdornment>
            )
        }),
        ...(startAdornment && { startAdornment }),
        ...(endAdornment && { endAdornment }),
        readOnly,
        ...InputProps
    };

    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            placeholder={placeholder}
            required={required}
            fullWidth={fullWidth}
            variant={variant}
            size={size}
            error={error}
            helperText={helperText}
            multiline={multiline}
            rows={multiline ? rows : undefined}
            maxRows={maxRows}
            minRows={minRows}
            disabled={disabled}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            inputProps={inputProps}
            InputProps={combinedInputProps}
            sx={{
                ...baseStyles,
                ...getStyleVariant()
            }}
            {...otherProps}
        />
    );
};

export default JobTextField;