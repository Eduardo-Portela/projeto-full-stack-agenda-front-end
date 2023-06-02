import './App.css'
import { RoutesMain } from './routes'
import GlobalStyles from './styles/GlobalStyles'
import { AuthProvider } from './providers/AuthProvider'
import { ToastContainer } from 'react-toastify'

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
