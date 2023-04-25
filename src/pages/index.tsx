import { Box } from "@chakra-ui/react"
import Head from "next/head"

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
				<meta name="description" content="JSONful Home Page" />
				<meta property="og:title" content="Home" />
				<meta property="og:description" content="JSONful Home Page" />
				<meta
					property="og:image"
					content="https://jsonful.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flol.3567c0fc.png&w=48&q=75"
				/>
			</Head>
			<Box
				h="full"
				w="full"
				textColor="whiteAlpha.600"
				fontSize="7xl"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<h1>JSONful</h1>
			</Box>
		</>
	)
}
