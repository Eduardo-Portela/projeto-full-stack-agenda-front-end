import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { ContainerDash, DivUserInfos, HeaderDash, MainDash } from './style'

interface IContacts {
  id: string,
  fullName: string,
  email: string,
  phone: string,
  createdAt: Date,
  user_Id: string
}

interface IUser {
  id: string,
  fullName: string,
  email: string,
  phone: string,
  contacts: IContacts[]
}


export const Dashboard = () => {
  const [user, setUser] = useState<IUser>()
  const [contacts, setContacts] = useState<IContacts[]>([])

  const token = localStorage.getItem("@agenda:token")
  const decodedToken = JSON.parse(atob(token!.split('.')[1]))
  const userId = decodedToken.sub

  useEffect(() => {
    (async() => {
        const response = await api.get(`users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(response.data)
        setContacts(response.data.contacts)
      })()
  }, [])

  return (
<ContainerDash>
    <HeaderDash className='container'>
      <h1>Agenda</h1>
      <button>Logout</button>
    </HeaderDash>

    <MainDash>

      <DivUserInfos>
      <h2>
        {`Bem vindo ${user?.fullName} Fique a vontade para utilizar nossos serviços!`}
      </h2>
      <div>
        <button>Editar perfil</button>
        <button className='delete'>Excluir conta</button>
      </div>

      </DivUserInfos>
      <ul>
        {
        contacts.map((contact) =>{
        return (
            <li key={contact.id}> {contact.fullName}</li>
        )
        })
        }
      </ul>
    </MainDash>
</ContainerDash>
  )
}
