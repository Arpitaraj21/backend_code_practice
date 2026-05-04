import { Paper, TextField, Box, Button, Typography } from "@mui/material";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { endpoints } from "../utils/axios";
import PositionedSnackbar from "../utils/snackbar";

export interface User {
    identifier: string, // can be email or username
    password: string,
}


export default function Login() {

    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    })
    const [snackbar, setSnackbar] = useState({ open: false, message: '', success: false });
    const navigate = useNavigate();
   
    const LoginSchema = Yup.object({
        identifier: Yup.string()
            .required('Email or username is required')
            .test(
                'is-valid-identifier',
                'Enter a valid email or username',
                (value) => {
                    if (!value) return false;

                    // simple email regex check
                    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

                    // if email → must be valid email
                    if (value.includes('@')) {
                        return isEmail;
                    }

                    // otherwise treat as username → just check length
                    return value.length >= 3;
                }
            ),

        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const methods = useForm<User>({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            identifier: formData?.identifier || '',
            password: formData?.password || '',
        }
    })

    const { handleSubmit, register } = methods;

    const handleFormSubmit = async (data: User) => {
        try {
            console.log(data);

            const response = await axiosInstance.post(endpoints.login, data);

            console.log("Login successful");
            localStorage.setItem('accessToken', 'true');
            setSnackbar({ open: true, message: response.data.message, success: true });
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (error) {
            console.error("Login failed:", error);
            setSnackbar({ open: true, message: 'Login failed!', success: false });
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit, () => {
                console.log("form data", formData);
            })}>
                <FormProvider {...methods}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100%',
                        width: '100%',
                        marginTop: '10%'
                    }}>
                        <Paper sx={{
                            width: '30vw',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}>
                            <Typography sx={{
                                textAlign: 'center',
                                fontSize: '25px',
                                color: 'black',
                                fontWeight: 'bold', zIndex: 2
                            }}>Login</Typography>
                            
                            <TextField
                                label="Email"
                                {...register('identifier')}
                                error={!!methods.formState.errors.identifier}
                                helperText={methods.formState.errors.identifier?.message}
                            />
                           
                            <TextField
                                label="Password"
                                {...register('password')}
                                error={!!methods.formState.errors.password}
                                helperText={methods.formState.errors.password?.message}
                            />
                            <Button variant="contained" sx={{ mt: 2 }} type="submit">
                                Submit
                            </Button>

                            <Typography sx={{ textAlign: 'center', fontSize: '15px', fontWeight: '500', zIndex: 2}}>Don't have an account? <a href="/signup" style={{color: '#1464db'}}>Sign up</a></Typography>
                        </Paper>
                    </Box>
                </FormProvider>
            </form>

            <PositionedSnackbar
                open={snackbar.open}
                message={snackbar.message}
                success={snackbar.success}
                onClose={() => setSnackbar({ open: false, message: '', success: false })}
            />
        </>
    )
}
