import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Protected from './components/Protected/Protected.jsx'
import SignUp from './pages/SignUp.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPosts from './pages/AddPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        element: <Home />,        
      },
      {
        path:'/login',
        element:(
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
        path:'/signup',
        element:(
          <Protected authentication={false}>
            <SignUp/>
          </Protected>
        )
      },
      {
        path:'/all-posts',
        element:(
          <Protected authentication={true}>
            <AllPosts/>
          </Protected>
        )
      },
      {
        path:'/add-post',
        element:(
          <Protected authentication={true}>
            <AddPosts/>
          </Protected>
        )
      },
      {
        path:'/edit-post/:slug',
        element:(
          <Protected authentication={true}>
            <EditPost/>
          </Protected>
        )
      },
      {
        path:'/post/:slug',
        element:<Post/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route}/>
    </Provider>
  </StrictMode>,
)
