import  { ReactNode } from 'react'
import { FormEdit } from './style'
import { NotifyError, NotifySucess } from '../toast/toastfy'
import { AxiosError } from 'axios'
import { api } from '../../services/api'
import { useForm } from "react-hook-form"

interface IDeleteUserProps {
    children: ReactNode
}

export const DeleteUserModalForm = ({children}: IDeleteUserProps) => {
        const {register, handleSubmit } = useForm({})
    
        const token = localStorage.getItem("@agenda:token")
        const decodedToken = JSON.parse(atob(token!.split('.')[1]))
        const userId = decodedToken.sub
        console.log(register)
    
        const handleSubmitUpdateUser = async() => {
            try {
                const response = await api.delete(`/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response)
                
                if(response.status ==204){
                    NotifySucess("Usuário deletado com sucesso!")
                }
            } catch (error) {
                if(error instanceof AxiosError){
                    NotifyError(error.response?.data.message[0])
                }
                console.log(error)
                // NotifyError("Erro ao fazer cadastro, verifique se todos os campos foram preenchidos corretamente!")
            }
        }
    
    
      return (
        <FormEdit onSubmit={handleSubmit(handleSubmitUpdateUser)}>
            {children}
        </FormEdit>
      )
}
