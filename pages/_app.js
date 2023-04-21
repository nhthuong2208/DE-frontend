import '@/styles/globals.css'
import { Provider, useDispatch } from 'react-redux'
import store from '@/redux/store'
import { login } from '@/redux/authSlice'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
