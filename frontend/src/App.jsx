import React from 'react'
import {RouterProvider} from 'react-router'
import {router} from './app.routes.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { getMe } from './store/features/auth/auth.thunk';
import { Toaster } from 'react-hot-toast';

// Dispatch current user fetch on app startup so reloads restore auth state
store.dispatch(getMe());

const App = () => {
  return (
   <>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
   </>
  )
}

export default App