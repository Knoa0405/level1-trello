import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Home from '.'

function MyApp({ pageProps }: AppProps) {
  return (
  <ChakraProvider>
    <Home {...pageProps}/>
  </ChakraProvider>
  )
}

export default MyApp
