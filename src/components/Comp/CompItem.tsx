import { Box, Link, SimpleGrid, Spacer } from "@chakra-ui/react"
import Link_ from "next/link"
import { compType } from "@/types/compType"
import PlayerItem from "./PlayerItem"
import CoachItem from "./CoachItem"

export default function CompItem(props: { compData: compType }) {
	const compPlayerIds = [
		props.compData.top_id,
		props.compData.mid_id,
		props.compData.jg_id,
		props.compData.adc_id,
		props.compData.supp_id,
	]

	const compCoach = props.compData.coach_id

	return (
		<Link
			as={Link_}
			href={`/comp/${props.compData.comp_id}`}
			display="flex"
			h="150px"
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
			<SimpleGrid w="50%" columns={7} alignContent="center">
				{compPlayerIds.map((player_id) => (
					<PlayerItem
						player_id={player_id}
						key={player_id}
						image_dimensions={50}
					/>
				))}
				<CoachItem
					coach_id={compCoach}
					image_dimensions={50}
					col_start={7}
					grid_row={1}
				/>
			</SimpleGrid>
		</Link>
	)
}
