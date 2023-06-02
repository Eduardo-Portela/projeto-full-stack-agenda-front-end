import { Routes, Route } from "react-router-dom"
import { Login } from "../pages/login/login"
import { Register } from "../pages/register/register"
import { Dashboard } from "../pages/dashboard/dashboard"
import { ProtectedRoutes } from "./protectedRoutes"

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route element={<ProtectedRoutes/>}>
                <Route path="/dashboard"element={<Dashboard/>} />
            </Route>
            <Route path="/register" element={<Register/>} />
        </Routes>
    )
}