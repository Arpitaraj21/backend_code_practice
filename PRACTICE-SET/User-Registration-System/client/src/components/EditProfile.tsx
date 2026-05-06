import { Paper, TextField, Box, Button, Typography } from "@mui/material";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from "react";
import axiosInstance, { endpoints } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PositionedSnackbar from "../utils/snackbar";

export interface User {
    name: string,
    username: string,
    email: string,
    password: string,
}

export default function EditUserProfile() {
    const location = useLocation();
    const navigate = useNavigate();

    const isEdit = location.pathname == '/edit-profile';
    const [snackbar, setSnackbar] = useState({ open: false, message: '', success: false })

    const UserValidationSchema: Yup.ObjectSchema<User> = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    })
    const methods = useForm<User>({
        resolver: yupResolver(UserValidationSchema),
    })

    const { handleSubmit, register, reset } = methods;

    const getProfileDetails = async () => {
        try {
            const resp = await axiosInstance.get('/profile-details');
            const user = resp.data.user;
            reset({
                name: user.name,
                email: user.email,
                username: user.username,
                password: '',
            });
        } catch (error) {
            console.log("error in fetching ui", error);
        }
    }

    useEffect(() => {
        getProfileDetails();
    }, [])



    const handleFormSubmit = async (data: User) => {
        try {
            console.log(data);

            const resp = await axiosInstance.patch(endpoints.editProfile, data);
            console.log(resp);
            console.log("updated user data successful");
            setSnackbar({ open: true, message: "Profile updated", success: true });
            setTimeout(() => navigate('/dashboard'), 1500);

        } catch (error) {
            console.error("Signup failed:", error);
        }
    }

  
    return (
        <>
        <form onSubmit={handleSubmit(handleFormSubmit, () => {
            // console.log("form data", formData);
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
                        }}>Edit User</Typography>
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
                        <Button variant="contained" sx={{ mt: 2, gap: 2 }} type="submit">
                            Edit Profile
                        </Button>

                       
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