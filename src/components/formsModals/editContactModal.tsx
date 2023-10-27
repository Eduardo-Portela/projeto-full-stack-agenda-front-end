import  { ReactNode } from 'react'
import { FormEdit } from './style'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateContactData,  updateSchemaContact } from '../../pages/register/validator'
import { useForm } from "react-hook-form"
import { api } from '../../services/api'
import { NotifyError, NotifySucess } from '../toast/toastfy'
import { AxiosError } from 'axios'

interface IEditFormProps{
    children: ReactNode
    contactId: string
}

export const EditFormModalContact = ({children, contactId}: IEditFormProps) => {
    const { register, handleSubmit } = useForm<updateContactData>({
        resolver: zodResolver(updateSchemaContact)
    })
    const token = localStorage.getItem("@agenda:token")

    const handleSubmitUpdatContact = async(data: updateContactData) => {
        console.log(data)
        try {
            const response = await api.patch(`/contacts/${contactId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            
            if(response.status ==200){
                NotifySucess("Atualização realizada com sucesso!")
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
        <FormEdit onSubmit={handleSubmit(handleSubmitUpdatContact)}>
                <label htmlFor="fullName">Nome completo</label>
                <input type="fullName" id="fullName" required={false} {...register("fullName" as keyof updateContactData)}/>
                <label htmlFor="email">email</label>
                <input type="email" id="email" required={false}{...register("email" as keyof updateContactData)}/>
                <label htmlFor="phone">phone</label>
                <input type="phone" id="phone" required={false}{...register("phone" as keyof updateContactData)}/>
                <button type="submit"> Atualizar usuário </button>
                {children}
        </FormEdit>
  )
}