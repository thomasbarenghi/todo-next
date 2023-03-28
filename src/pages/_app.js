import '@/styles/globals.scss'
import Header from '@/componentes/masters/header/header'
import { Outfit } from "next/font/google";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '../redux/store/store'
import Footer from '@/componentes/masters/footer/footer';


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function App({ Component, pageProps }) {

  return (
    <>
    <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      <style jsx global>{`
          :root {
            /* ... */
            --outfit-font: ${outfit.style.fontFamily};
          }
        `}</style>
      <Header />
      <Component {...pageProps} />
      <Footer />
      </PersistGate>
      </ Provider>
    </>
  )
}
