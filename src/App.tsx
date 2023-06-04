import './App.css'
import { RoutesMain } from './routes'
import GlobalStyles from './styles/GlobalStyles'
import { AuthProvider } from './providers/AuthProvider'
import { ToastContainer } from 'react-toastify'
import { ModalComp } from './components/modal/modal'

function App() {
  return (
    <>
      <GlobalStyles/>
      <AuthProvider>
        <RoutesMain/>
      </AuthProvider>
      <ToastContainer/>
    </>
  )
}

export default App
