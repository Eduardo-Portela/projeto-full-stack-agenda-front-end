import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { LoginData, loginSchema } from './validator'
import { useAuth } from '../../hooks/useAuth'
import { DivFormLogin, DivIntro, MainLogin } from './style'
import { Link } from "react-router-dom"

export const Login = () => {
    const { register, handleSubmit } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    })
    const {signIn} = useAuth()

  return (
    <MainLogin>
        <DivIntro>
            <h2>Armazene seus contatos sem se preocupar</h2>
            <h1>Use o Agenda</h1>
        </DivIntro>

        <DivFormLogin>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit(signIn)}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email")}/>

                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" {...register("password")}/>

                    <button type="submit"> Entrar </button>
                    <p>Ainda não tem cadastro? <Link to={"/register"}>Clique aqui</Link> para se cadastrar agora mesmo.</p>
                </form>
            </div>
        </DivFormLogin>
    </MainLogin>
  )
}
