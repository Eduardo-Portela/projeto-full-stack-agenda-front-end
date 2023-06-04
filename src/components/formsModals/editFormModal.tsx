import React, { ReactNode } from 'react'
import { FormEdit } from './style'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserData, registerSchema } from '../../pages/register/validator'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { api } from '../../services/api'
import { NotifyError, NotifySucess } from '../toast/toastfy'
import { AxiosError } from 'axios'

interface IEditFormProps{
    children: ReactNode
}

export const EditFormModal = ({children}: IEditFormProps) => {
    const { register, handleSubmit } = useForm<UpdateUserData>({
        resolver: zodResolver(registerSchema)
    })

    const token = localStorage.getItem("@agenda:token")
    const decodedToken = JSON.parse(atob(token!.split('.')[1]))
    const userId = decodedToken.sub

    const handleSubmitUpdateUser = async(data: UpdateUserData) => {
        console.log(data)
        try {
            const response = await api.patch(`/users/${userId}`, data, {
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
    <FormEdit onSubmit={handleSubmit(handleSubmitUpdateUser)}>
            <label htmlFor="fullName">Nome completo</label>
            <input type="fullName" id="fullName" required={false} {...register("fullName" as keyof UpdateUserData)}/>
            <label htmlFor="email">email</label>
            <input type="email" id="email" required={false}{...register("email" as keyof UpdateUserData)}/>
            <label htmlFor="phone">phone</label>
            <input type="phone" id="phone" required={false}{...register("phone" as keyof UpdateUserData)}/>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" required={false}{...register("password" as keyof UpdateUserData)}/>
            <button type="submit"> Atualizar usuário </button>
            {children}
    </FormEdit>
  )
}
