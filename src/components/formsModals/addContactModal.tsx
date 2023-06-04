import React, { ReactNode } from 'react'
import { FormEdit } from './style'
import { zodResolver } from '@hookform/resolvers/zod'
import { addContactData, addContactSchema, registerSchema } from '../../pages/register/validator'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { api } from '../../services/api'
import { NotifyError, NotifySucess } from '../toast/toastfy'
import { AxiosError } from 'axios'

interface IEditFormProps{
    children: ReactNode
}

export const AddContactModal = ({children}: IEditFormProps) => {
    const { register, handleSubmit } = useForm<addContactData>({
        resolver: zodResolver(addContactSchema)
    })

    const token = localStorage.getItem("@agenda:token")
    const decodedToken = JSON.parse(atob(token!.split('.')[1]))
    const userId = decodedToken.sub

    const handleSubmitUpdateUser = async(data: addContactData) => {
        console.log(data)
        try {
            const response = await api.post(`/contacts`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            
            if(response.status ==201){
                NotifySucess("Contato cadastrado com sucesso!")
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
            <label htmlFor="fullName">Nome completo</label>
            <input type="fullName" id="fullName" required={false} {...register("fullName")}/>
            <label htmlFor="email">email</label>
            <input type="email" id="email" required={false}{...register("email")}/>
            <label htmlFor="phone">phone</label>
            <input type="phone" id="phone" required={false}{...register("phone")}/>
            <button type="submit"> Salvar contato </button>
            {children}
    </FormEdit>
  )
}
