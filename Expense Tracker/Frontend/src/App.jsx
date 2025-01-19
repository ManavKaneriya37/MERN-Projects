import {BrowserRouter} from 'react-router-dom'
import MainRoutes from './routes/MainRoutes'
import UserContext from './contexts/UserContext'

function App() {
  
  return (
    <>
    <UserContext>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </UserContext>
    </>
  )
}

export default App
