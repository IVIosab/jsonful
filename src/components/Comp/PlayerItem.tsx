import usePlayer from "@/hooks/usePlayer"
import { GridItem, Image, Spinner, VStack } from "@chakra-ui/react"

export default function PlayerItem(props: {
	player_id: number
	image_dimensions: number
}) {
	const { data: playerData, error, isLoading } = usePlayer(props.player_id)

	let content = <></>

	if (isLoading) content = <Spinner />

	if (error) content = <>:/</>

	if (playerData)
		content = (
			<GridItem>
				<VStack>
					<Image
						height={`${props.image_dimensions}px`}
						width={`${props.image_dimensions}px`}
						alt={`A picture of ${playerData.name}`}
						src={playerData.img}
					/>
					<div>{playerData.name}</div>
					<div>{playerData.team}</div>
				</VStack>
			</GridItem>
		)

	return <>{content}</>
}
