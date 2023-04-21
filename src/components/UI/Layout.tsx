import { Flex, Grid, GridItem } from "@chakra-ui/react"
import NavBar from "../NavBar/NavBar"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Grid
			templateAreas={`"nav"
                                "main"`}
			gridAutoColumns="auto"
			gridTemplateRows="60px 1fr"
			h="100vh"
		>
			<GridItem area="nav">
				<NavBar />
			</GridItem>
			<GridItem
				area="main"
				backgroundColor="blackAlpha.900"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Flex
					backgroundColor="lightGray"
					w="95%"
					h="95%"
					borderRadius="2xl"
					direction="column"
				>
					{children}
				</Flex>
			</GridItem>
		</Grid>
	)
}
