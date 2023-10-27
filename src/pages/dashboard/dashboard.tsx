import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { ContainerDash, DivCardInfos, DivCards, DivSettings, DivUserInfos, HeaderDash, MainDash } from './style'
import { Modal } from '../../components/modal/modal'
import '../../App.css'
import { EditFormModal } from '../../components/formsModals/editFormModal'
import { DeleteUserModalForm } from '../../components/formsModals/deleteUserModalForm'
import { useNavigate } from 'react-router-dom'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BiPencil } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { AddContactModal } from '../../components/formsModals/addContactModal'
import { NotifyError, NotifySucess } from '../../components/toast/toastfy'
import { AxiosError } from 'axios'
import { EditFormModalContact } from '../../components/formsModals/editContactModal'

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

interface IDecodedToken {
  email: string,
  iat: number,
  exp: number,
  sub: string
}

export const Dashboard = () => {
  
  const [user, setUser] = useState<IUser>()
  const [contacts, setContacts] = useState<IContacts[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)
  const [openModalEditContatct, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDeleteContact, setOpenModalDeleteContact] = useState<boolean>(false)
  const navigate = useNavigate()

  const token  = localStorage.getItem("@agenda:token")
  let  decodedToken: IDecodedToken = {
    email: "",
    iat: 0,
    exp: 0,
    sub: ""
  }
  if(token == null){
    useEffect(()=> {
      navigate("/")

    },[token])
  }
  if(token){
    decodedToken = JSON.parse(atob(token!.split('.')[1]))
  }

  const userId: string = decodedToken.sub


  const logout = () => {
    localStorage.removeItem("@agenda:token")
    navigate("/")
  }

  const handleSubmitDeletContact = async(contactId:string) => {
    console.log(contactId)

    setOpenModalDeleteContact(true)
    try {
        const response = await api.delete(`/contacts/${contactId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)
        
        if(response.status ==200){
            NotifySucess("Contato deletado com sucesso!")
        }
    } catch (error) {
        if(error instanceof AxiosError){
            NotifyError(error.response?.data.message[0])
        }
        console.log(error)    }
}

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
  }, [contacts])

  return (
    <>
<ContainerDash>
    <HeaderDash className='container'>
      <h1>Agenda</h1>
      <button onClick={() => logout()}>Logout</button>
    </HeaderDash>

    <MainDash>

      <DivUserInfos>
      <h2>
        {`Bem vindo, ${user?.fullName}! Fique a vontade para utilizar nossos serviços!`}
      </h2>
      <div>
        <button onClick={() => setOpenModal(true)}>Editar perfil</button>
        <button onClick={()=> setOpenModalDelete(true)} className='delete'>Excluir conta</button>
      </div>

      </DivUserInfos>
    </MainDash>
        <DivCards>
            <h2>CONTATOS DE {user?.fullName.toUpperCase()}</h2>
            <ul>
            {
            contacts.map((contact) =>{
            return (
                <li key={contact.id} id={contact.id}>
                   <DivCardInfos>
                     <h3>Nome: {contact.fullName}</h3>
                     <p>Email: {contact.email}</p>
                     <p>Telefone: {contact.phone}</p>
                   </DivCardInfos>

                   <DivSettings>
                      <button type='button' onClick={() => setOpenModalEdit(true)}>
                        <BiPencil size={30} color="white"/>
                      </button>

                      {openModalEditContatct ? 
                      <Modal className='modalContent'>
                            <EditFormModalContact contactId={contact.id}>
                            <button onClick={() => setOpenModalEdit(false)}>Fechar</button>
                          </EditFormModalContact>
                      </Modal>
                          
                          :null}

                      <button onClick={() => {
                          handleSubmitDeletContact(contact.id)
                      }}>
                        <BsTrash size={30} color="white"/>
                      </button>
                   </DivSettings>
                </li>
            )
            })
            }
              <button onClick={() =>setOpenModalAdd(true)} className='add-contact'>
                  <IoMdAddCircleOutline size={40} color="white"/>
              </button>

          </ul>
        </DivCards>
    <MainDash>

    </MainDash>
</ContainerDash>
 {openModal ? 
  <Modal
  className="modalContent">
    <EditFormModal>
      <button onClick={() => setOpenModal(false)}>Fechar</button>
    </EditFormModal>
  </Modal>
  : null}
 
 {openModalDelete ? 
  <Modal
  className="modalContent">
    <DeleteUserModalForm>
      <h2>Tem certeza que deseja deletar sua conta?</h2>
      <p>Tenha certeza que você não tem nenhum contato cadastrado para poder deletar sua conta.</p>
      <button type="submit" className='confirm'>Confirmar</button>
      <button onClick={() => setOpenModalDelete(false)}>Fechar</button>
    </DeleteUserModalForm>
  </Modal>
  : null}

{openModalAdd ? 
  <Modal
  className="modalContent">
    <AddContactModal>
      <button onClick={() => setOpenModalAdd(false)}>Fechar</button>
    </AddContactModal>
  </Modal>
  : null}

    {/* {openModalDeleteContact ? 
      <Modal
      className="modalContent">
        <DeleteContatctModal callback={setOpenModalDeleteContact}>
          <h2>Tem certeza que deseja deletar este contato?</h2>
          <button className='confirm'  type='submit'> Confirmar </button>
          <button onClick={() => setOpenModalDeleteContact(false)}>Fechar</button>
        </DeleteContatctModal>
      </Modal>
    : null} */}
</>
  )
}


/* {openModalDeleteContact ? 
      <Modal
      className="modalContent">
        <DeleteContatctModal contactId={contact.id} setOpenModalDeleteContact={setOpenModalDeleteContact}>
        <h2>Tem certeza que deseja deletar sua conta?</h2>
        <p>Tenha certeza que você não tem nenhum contato cadastrado para poder deletar sua conta.</p>
          <button className='confirm'  type='submit'> Confirmar </button>
          <button onClick={() => setOpenModalDeleteContact(false)}>Fechar</button>
        </DeleteContatctModal>
      </Modal>
    : null}*/ 