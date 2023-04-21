import { Box, Link, Spacer } from "@chakra-ui/react"
import Link_ from "next/link"
import { compType } from "@/types/compType"
import PlayerItem from "./PlayerItem"

export default function CompItem(props: { compData: compType }) {
	// TODO: Fetch with SWR then pass the data to PlayerItem
	const compPlayers = [
		props.compData.coach_id,
		props.compData.top_id,
		props.compData.mid_id,
		props.compData.jg_id,
		props.compData.adc_id,
		props.compData.supp_id,
	]

	return (
		<Link
			as={Link_}
			href={`/comp/${props.compData.comp_id}`}
			display="flex"
			h="100px"
			w="full"
			textColor="whiteAlpha.600"
			borderWidth="1px"
			borderRadius="2xl"
			borderColor="whiteAlpha.400"
			p="10px"
			_hover={{}}
		>
			<Box>Comp by {props.compData.owner_name}</Box>
			<Spacer />
			<Box>render a list of PlayerItem</Box>
		</Link>
	)
}
