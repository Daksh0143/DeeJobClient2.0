"use client"
import {
    Typography,
    Box,
    Card,
    CardMedia,
    IconButton
} from '@mui/material'
import { useState } from 'react'
import ImageUploading from "react-images-uploading"
import { AddPhotoAlternate, Delete } from '@mui/icons-material'

// JobImageUpload Component for Company Logo
const JobImageUpload = ({ onImageUpload, error, helperText }) => {
    const [images, setImages] = useState([])
    const [isConverting, setIsConverting] = useState(false)
    const maxNumber = 1 // Only one logo allowed

    const onChange = async (imageList) => {
        setImages(imageList)
        setIsConverting(true)

        try {
            if (imageList.length > 0) {
                // Convert file to binary format
                const binaryData = await convertToBinary(imageList[0].file)
                onImageUpload(binaryData)
            } else {
                onImageUpload(null)
            }
        } catch (error) {
            console.error('Error converting image to binary:', error)
            onImageUpload(null)
        } finally {
            setIsConverting(false)
        }
    }


    const convertToBinary = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                const arrayBuffer = reader.result
                const uint8Array = new Uint8Array(arrayBuffer)
                resolve({
                    binary: uint8Array,
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size
                })
            }
            reader.onerror = () => reject(reader.error)
            reader.readAsArrayBuffer(file)
        })
    }


    return (
        <ImageUploading
            multiple={false}
            value={images}
            onChange={onChange}
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
                                    image={imageList[0]["data_url"]}
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
                                onClick={() => onImageRemove(0)}
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

export default JobImageUpload;