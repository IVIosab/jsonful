import useCoach from "@/hooks/useCoach"
import { GridItem, Image, Spinner, VStack } from "@chakra-ui/react"

export default function CoachItem(props: {
	coach_id: number
	image_dimensions: number
	col_start: number
	grid_row: number
}) {
	const { data: coachData, error, isLoading } = useCoach(props.coach_id)

	let content = <></>

	if (isLoading) content = <Spinner />

	if (error) content = <>:/</>

	if (coachData)
		content = (
			<GridItem colStart={props.col_start} gridRow={props.grid_row}>
				<VStack>
					<Image
						height={`${props.image_dimensions}px`}
						width={`${props.image_dimensions}px`}
						alt={`A picture of ${coachData.name}`}
						src={coachData.img}
					/>
					<div>{coachData.name}</div>
					<div>{coachData.team}</div>
				</VStack>
			</GridItem>
		)

	return <>{content}</>
}
