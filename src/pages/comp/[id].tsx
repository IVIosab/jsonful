import CoachItem from "@/components/Comp/CoachItem"
import PlayerItem from "@/components/Comp/PlayerItem"
import { getItemData } from "@/lib/firebaseComms"
import { currentUserAtom } from "@/store/store"
import { compType } from "@/types/compType"
import { EditIcon } from "@chakra-ui/icons"
import {
	Grid,
	HStack,
	Heading,
	IconButton,
	Spacer,
	VStack,
} from "@chakra-ui/react"
import { useAtom } from "jotai"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import Head from "next/head"

export default function Comp(compData: compType) {
	const [currentUser] = useAtom(currentUserAtom)
	const router = useRouter()

	let compOwner = compData.owner_name

	if (currentUser)
		if (currentUser.uid == compData.owner_id) {
			compOwner = "You"
		}

	const handleClick = () => {
		router.push(`/comp/edit/${compData.comp_id}`)
	}

	return (
		<>
			<Head>
				<title>{compOwner} Composition</title>
				<meta name="description" content={compOwner + "Composition"} />
				<meta property="og:title" content={compOwner + "Composition"} />
				<meta
					property="og:description"
					content={
						compOwner +
						"Composition, with compId:" +
						compData.comp_id
					}
				/>
				<meta
					property="og:image"
					content="https://jsonful.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flol.3567c0fc.png&w=48&q=75"
				/>
			</Head>
			<VStack textColor="whiteAlpha.600" gap="20px" padding="20px">
				<HStack alignSelf="start" w="full">
					<Heading>
						Comp #{compData.comp_id} by {compOwner}
					</Heading>
					<Spacer />
					<IconButton
						bg="none"
						_hover={{}}
						_active={{ color: "red.600" }}
						aria-label="edit"
						icon={<EditIcon w="40px" h="40px" />}
						display={compOwner == "You" ? "block" : "none"}
						onClick={handleClick}
					/>
				</HStack>

				<Spacer />
				<Grid
					columnGap="10px"
					rowGap="30px"
					templateColumns="repeat(5, 1fr)"
					templateRows="1fr auto"
					w="full"
				>
					<PlayerItem
						image_dimensions={200}
						player_id={compData.top_id}
					/>
					<PlayerItem
						image_dimensions={200}
						player_id={compData.mid_id}
					/>
					<PlayerItem
						image_dimensions={200}
						player_id={compData.jg_id}
					/>
					<PlayerItem
						image_dimensions={200}
						player_id={compData.adc_id}
					/>
					<PlayerItem
						image_dimensions={200}
						player_id={compData.supp_id}
					/>
					<CoachItem
						image_dimensions={200}
						col_start={3}
						grid_row={2}
						coach_id={compData.coach_id}
					/>
				</Grid>
			</VStack>
		</>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const compData: compType | undefined = await getItemData(
		context.query.id as string
	)

	if (!compData)
		return {
			notFound: true,
		}

	return {
		props: { ...compData },
	}
}
