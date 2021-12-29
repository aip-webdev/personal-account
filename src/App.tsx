import {hot} from 'react-hot-loader/root';
import {CssBaseline} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import theme from './styles/theme';
import React, {useEffect, useState} from 'react';
import {AppProvider} from "./context";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import useAuthData from "./hooks/useAuthData";
import useUsersData from "./hooks/useUsersData";
import {RequiredAuth} from "./shared/Components/RequiredAuth";
import {NoMatchPage} from "./shared/Pages/NoMatchPage";
import {Profile} from "./shared/Pages/Contacts";
import {SignInPage} from "./shared/Pages/SignInPage";
import {SignUpPage} from "./shared/Pages/SignUpPage";
import {Header} from "./shared/Components/Header";
import {Content} from "./shared/Components/Content";

const AppComponent = () => {
    return (
        <>
            <Header />
            <Content>
                <Outlet/>
            </Content>
        </>
    )
}

const AppRouter = () => {
    const isAuth = useAuthData()
    const {users, error, loading} = useUsersData()
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        setRedirect(true)
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<RequiredAuth><AppComponent /></RequiredAuth>}>
                    <Route index element={<Navigate to="/profile" />} />
                    <Route path='/profile' element={<Profile/>}/>
                </Route>
                <Route path='/signin' element={<SignInPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path="*" element={<NoMatchPage/>}/>
            </Routes>
        </ThemeProvider>
    )
}

export const App = hot(() =>
    <AppProvider>
        <AppRouter/>
    </AppProvider>
)
