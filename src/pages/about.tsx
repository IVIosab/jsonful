import { Box, Flex } from "@chakra-ui/react"
export default function About() {
	return (
		<Box
			h="full"
			w="full"
			textColor="whiteAlpha.600"
			fontSize="xl"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Flex direction="column" gap="20px">
				<h1>Welcome to JSONful</h1>
				<p>
					A user-friendly website designed to help fans of the LEC
					SuperFantasy visualize data and make informed decisions
					about their fantasy teams. Our platform is designed to
					provide easy-to-understand information about the best
					players, items, and events based on previous matches data,
					helping you to create a winning team and stay ahead of the
					competition.
				</p>
				<p>
					Our team has worked hard to ensure that the information on
					our platform is up-to-date and accurate, so you can trust
					that the data you are seeing is reliable. We know that
					keeping up with the latest trends and strategies in LEC
					SuperFantasy can be overwhelming, which is why we have
					created an intuitive interface that makes it easy to
					navigate and find the information you need.
				</p>
				<p>
					In addition to our data visualization tools, we also have a
					thriving community page where users can share their team
					compositions for the week, along with a brief description of
					their strategy. This is a great way to learn from other
					players and get inspiration for your own fantasy team.
				</p>
				<p>
					Thank you for choosing JSONful for your LEC SuperFantasy
					needs. We hope that our platform will help you to create the
					ultimate team and dominate the competition. If you have any
					questions or feedback, please do not hesitate to get in
					touch with us via our Contact page.
				</p>
			</Flex>
		</Box>
	)
}
