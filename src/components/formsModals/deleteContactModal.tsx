import { ReactNode } from 'react'
import { FormEdit } from './style'


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