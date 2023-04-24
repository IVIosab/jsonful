import { AddIcon } from "@chakra-ui/icons"
import { Link } from "@chakra-ui/react"
import Link_ from "next/link"

export default function NewCompItem() {
	return (
		<Link
			as={Link_}
			href="/new_comp"
			display="flex"
			h="150px"
			w="full"
			textColor="whiteAlpha.600"
			borderWidth="1px"
			borderRadius="2xl"
			borderColor="whiteAlpha.400"
			p="10px"
			_hover={{}}
			alignItems="center"
			justifyContent="center"
		>
			<AddIcon />
		</Link>
	)
}
