import CompForm from "@/components/Comp/CompForm"
import { deleteItem, getItemData, updateItem } from "@/lib/firebaseComms"
import { coachesAtom, currentUserAtom, playersAtom } from "@/store/store"
import { compType } from "@/types/compType"
import { Box, Flex } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { GetServerSidePropsContext } from "next"
import { nameToId } from "@/pages/new_comp"

type Inputs = {
	top: string
	mid: string
	jg: string
	adc: string
	supp: string
	coach: string
}

export default function Comp(compData: compType) {
	const [currentUser] = useAtom(currentUserAtom)
	const [players] = useAtom(playersAtom)
	const [coaches] = useAtom(coachesAtom)

	let compOwner = compData.owner_name

	if (currentUser)
		if (currentUser.uid == compData.owner_id) {
			compOwner = "You"
		} else {
			return (
				<Flex
					textColor="whiteAlpha.600"
					pt="100px"
					justifyContent="center"
				>
					You do not have permission to view this page.
				</Flex>
			)
		}
	else {
		return (
			<Flex textColor="whiteAlpha.600" pt="100px" justifyContent="center">
				Please sign in to continue.
			</Flex>
		)
	}

	const handleSubmit = (data: Inputs) => {
		if (
			players &&
			players != "loading" &&
			!(players instanceof Error) &&
			coaches &&
			coaches != "loading" &&
			!(coaches instanceof Error)
		) {
			const updateQuery = {
				top_id: nameToId(players, data.top),
				mid_id: nameToId(players, data.mid),
				adc_id: nameToId(players, data.adc),
				supp_id: nameToId(players, data.supp),
				jg_id: nameToId(players, data.jg),
				coach_id: nameToId(coaches, data.coach),
				comp_id: compData.comp_id,
				owner_id: currentUser ? currentUser.uid : "none",
				owner_name: currentUser
					? currentUser.displayName
						? currentUser.displayName
						: "no one"
					: "no one",
			}
			return updateItem(updateQuery)
		} else {
			return Promise.reject(new Error("Failed to submit"))
		}
	}

	const handleDelete = () => {
		return deleteItem(compData.comp_id)
	}

	return (
		<CompForm
			onSubmit={handleSubmit}
			buttonName="Update Comp"
			onDelete={handleDelete}
			comp={compData}
		/>
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
