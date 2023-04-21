import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Layout from "@/components/UI/Layout"

const theme = extendTheme({
	colors: {
		drakGray: "#161616",
		lightGray: "#1e1e1e",
		fontGray: "#4b4a4d",
	},
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	)
}
