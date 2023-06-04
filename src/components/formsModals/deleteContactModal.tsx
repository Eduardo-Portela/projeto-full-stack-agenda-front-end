import React, { ReactNode } from 'react'
import { FormEdit } from './style'
import { NotifyError, NotifySucess } from '../toast/toastfy'
import { AxiosError } from 'axios'
import { api } from '../../services/api'
import { useForm } from "react-hook-form"

interface IDeleteUserProps {
    children: ReactNode
    callback: any
}

export const DeleteContatctModal = ({children, callback}: IDeleteUserProps) => {
        callback(true)
      return (
        <FormEdit>
            <h2>adadwaeawd</h2>
            {children}
        </FormEdit>
      )
}