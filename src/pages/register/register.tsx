import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { registerData, registerSchema } from './validator'
import { api } from '../../services/api'
import { useNavigate, Link } from 'react-router-dom';
import { DivFormLogin, DivIntro, MainLogin } from '../login/style'
import { NotifyError, NotifySucess } from '../../components/toast/toastfy'
import { AxiosError } from 'axios'
export const Register = () => {
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm<registerData>({
        resolver: zodResolver(registerSchema)
    })
    
    const handleSubmitRegister = async(data: registerData) => {
        try {
            const response = await api.post("/users", data)
            console.log(response.status)
            
            if(response.status ==201){
                NotifySucess("cadastro realizado com sucesso!")
            }
          
            
            setTimeout(() => {
                navigate("/")
            }, 3000)
        } catch (error) {
            if(error instanceof AxiosError){
                NotifyError("Email já existe, faça login!")
            }
            console.log(error)
            // NotifyError("Erro ao fazer cadastro, verifique se todos os campos foram preenchidos corretamente!")
        }
    }

  return (
    <MainLogin>
        <DivIntro>
        <h2>Cadastre-se agora e começe a armazenar seus contatos na melhor plataforma online.</h2>
            <h1>Use o Agenda</h1>
        </DivIntro>
        <DivFormLogin>
        <div>
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit(handleSubmitRegister)}>
                <label htmlFor="fullName">Nome completo</label>
                <input type="fullName" id="fullName" {...register("fullName")}/>
                <label htmlFor="email">email</label>
                <input type="email" id="email" {...register("email")}/>
                <label htmlFor="phone">phone</label>
                <input type="phone" id="phone" {...register("phone")}/>
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" {...register("password")}/>
                <button type="submit"> Cadastrar </button>
                <button type="button"><Link to={"/"}> Voltar para login</Link></button>
            </form>
        </div>
        </DivFormLogin>
    </MainLogin>
  )
}
