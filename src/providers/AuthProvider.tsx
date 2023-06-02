import { ReactNode, createContext, useEffect, useState } from "react"
import { LoginData } from "../pages/login/validator"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"
import { NotifyError, NotifySucess } from "../components/toast/toastfy"

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextValues {
    signIn: (data: LoginData) => void
    loading: boolean
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export const AuthProvider = ({children}: AuthProviderProps) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
       const token = localStorage.getItem("@agenda:token")

       if(!token!){
        setLoading(false)
        return
       }

       api.defaults.headers.common.Authorization = `Bearer ${token}`
       setLoading(false)
    },[])

    const signIn = async (data: LoginData) => {
        try {
            const response = await api.post("/login", data)

            if(response.status ==201){
                NotifySucess("Login realizado com sucesso!")
            }

            const {token} = response.data

            api.defaults.headers.common.authorization = `Bearer ${token}`
            localStorage.setItem("@agenda:token", token)

            setTimeout(() => {
                navigate("dashboard")

            },3000)
        } catch (error) {
            NotifyError("Erro ao fazer login, Verifique se o email ou a senha estão corretos.")
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, loading }}>
            {children}
        </AuthContext.Provider>

    )
}