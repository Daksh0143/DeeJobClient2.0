"use client"
import {
    Typography,
    Box,
    Card,
    CardMedia,
    IconButton
} from '@mui/material'
import { useEffect, useState } from 'react'
import ImageUploading from "react-images-uploading"
import { AddPhotoAlternate, Delete } from '@mui/icons-material'

const JobImageUpload = ({ value, onImageUpload, error, helperText }) => {
    const [images, setImages] = useState([])
    const maxNumber = 1

    // 🔹 Sync local images[] whenever parent `value` (Formik) changes
    useEffect(() => {
        if (value) {
            const objectUrl = URL.createObjectURL(value)
            setImages([{ data_url: objectUrl, file: value }])
        } else {
            setImages([])
        }
    }, [value])

    const handleChange = (imageList) => {
        setImages(imageList)
        if (imageList.length > 0) {
            onImageUpload(imageList[0].file) // send File to Formik
        } else {
            onImageUpload(null)
        }
    }

    return (
        <ImageUploading
            multiple={false}
            value={images}
            onChange={handleChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={['jpg', 'gif', 'png', 'jpeg']}
        >
            {({ imageList, onImageUpload: uploadImage, onImageRemove, dragProps }) => (
                <Box sx={{ width: '100%' }}>
                    {imageList.length === 0 ? (
                        <Box
                            sx={{
                                border: 2,
                                borderColor: error ? 'error.main' : 'divider',
                                borderStyle: 'dashed',
                                borderRadius: 2,
                                p: 3,
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    backgroundColor: 'action.hover'
                                },
                                minHeight: 120,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onClick={uploadImage}
                            {...dragProps}
                        >
                            <AddPhotoAlternate
                                sx={{
                                    fontSize: 40,
                                    color: error ? 'error.main' : 'text.secondary',
                                    mb: 1
                                }}
                            />
                            <Typography
                                variant="body2"
                                color={error ? 'error.main' : 'text.secondary'}
                                sx={{ mb: 1 }}
                            >
                                Click to upload company logo
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.disabled"
                            >
                                Supports: JPG, PNG, GIF (Max 5MB)
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ position: 'relative' }}>
                            <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                <CardMedia
                                    component="img"
                                    height="120"
                                    image={imageList[0].data_url}
                                    alt="Company Logo Preview"
                                    sx={{ objectFit: 'contain', backgroundColor: 'grey.50' }}
                                />
                            </Card>
                            <IconButton
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                    color: "#fff",
                                    "&:hover": {
                                        backgroundColor: "rgba(0,0,0,0.9)"
                                    },
                                }}
                                onClick={() => handleChange([])} // clear both preview + Formik
                            >
                                <Delete fontSize="small" />
                            </IconButton>
                        </Box>
                    )}

                    {helperText && (
                        <Typography
                            variant="caption"
                            color={error ? 'error.main' : 'text.secondary'}
                            sx={{ mt: 1, display: 'block' }}
                        >
                            {helperText}
                        </Typography>
                    )}
                </Box>
            )}
        </ImageUploading>
    )
}

export default JobImageUpload
