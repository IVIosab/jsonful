import { Flex, HStack, Img, Spacer } from "@chakra-ui/react"
import NavItem from "./NavItem"
import Image from "next/image"
import lolIcon from "../../../public/lol.png"
import AccountItem from "./AccountItem"

const navItems = [
	{ pageTitle: "Home", pageRoute: "/" },
	{ pageTitle: "Community", pageRoute: "/community" },
	{ pageTitle: "About", pageRoute: "/about" },
]

export default function NavBar() {
	return (
		<Flex as="nav" backgroundColor="lightGray" h="full" px="20px">
			<HStack>
				<Image
					src={lolIcon}
					height="40"
					width="40"
					alt="League of Legends Icon"
				/>
			</HStack>
			<Spacer />
			<HStack gap="80px">
				{navItems.map((navItem) => (
					<NavItem key={navItem.pageTitle} {...navItem} />
				))}
			</HStack>
			<Spacer />
			<AccountItem />
		</Flex>
	)
}
