import { Link } from "@chakra-ui/react"
import Link_ from "next/link"
import { useRouter } from "next/router"

export default function NavItem(props: {
	pageTitle: string
	pageRoute: string
}) {
	const router = useRouter()

	return (
		<Link
			as={Link_}
			href={props.pageRoute}
			key={props.pageTitle}
			textColor={
				router.pathname == props.pageRoute ? "red.600" : "fontGray"
			}
			fontSize="xl"
			_hover={{}}
			h="full"
			display="flex"
			alignItems="center"
			borderBottomWidth="3px"
			borderBottomColor={
				router.pathname == props.pageRoute ? "red.600" : "fontGray"
			}
		>
			{props.pageTitle}
		</Link>
	)
}
