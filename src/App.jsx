import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice/authSlice"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        }else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  
  if (!loading) {
    return (
      <>
      <header>
        <Header/>
      </header>
        <main>
          <h1>hello World</h1>
        </main>
      <footer>
        <Footer/>
      </footer>
      </>
    )
  }
}

export default App
