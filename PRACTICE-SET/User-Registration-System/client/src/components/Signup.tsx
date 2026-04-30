import { Paper, TextField, Box, Button, Typography } from "@mui/material";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from "react";
import axiosInstance, { endpoints } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export interface User {
    name: string,
    username: string,
    email: string,
    password: string,
}

interface UserProps {
    initialData?: User;
    onSubmit: (data: User) => Promise<void>
}

export default function Signup() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    })
    const UserValidationSchema: Yup.ObjectSchema<User> = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    })

    const methods = useForm<User>({
        resolver: yupResolver(UserValidationSchema),
        defaultValues: {
            name: formData?.name || '',
            email: formData?.email || '',
            username: formData?.username || '',
            password: formData?.password || '',
        }
    })

    const { handleSubmit, control, register, watch, setValue, setError, clearErrors, formState } = methods;

    const handleFormSubmit = async (data: User) => {
        try {
            console.log(data);

            await axiosInstance.post(endpoints.signup, data);

            console.log("signup successful");
            navigate('/login');

        } catch (error) {
            console.error("Signup failed:", error);
        }
    }
    return (
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
                    marginTop: '5%'
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
                        }}>Signup</Typography>
                        <TextField
                            label="Name"
                            {...register('name')}
                            error={!!methods.formState.errors.name}
                            helperText={methods.formState.errors.name?.message}
                        />
                        <TextField
                            label="Email"
                            {...register('email')}
                            error={!!methods.formState.errors.email}
                            helperText={methods.formState.errors.email?.message}
                        />
                        <TextField
                            label="Username"
                            {...register('username')}
                            error={!!methods.formState.errors.username}
                            helperText={methods.formState.errors.username?.message}
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

                        <Typography sx={{ textAlign: 'center', fontSize: '15px', fontWeight: '500', zIndex: 2 }}>Already have an account? <a href="/login" style={{ color: '#1464db' }}>Login</a></Typography>

                    </Paper>
                </Box>
            </FormProvider>
        </form>

    )
}