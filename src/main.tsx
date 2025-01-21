import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/Layout/style.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes.tsx'
import { store } from './app/folder/store.ts'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')!).render(

<Provider store={store}>
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>
</Provider>
 

)
