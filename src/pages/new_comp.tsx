import CompForm from "@/components/Comp/CompForm"
import { addItem } from "@/lib/firebaseComms"
import { coachesAtom, currentUserAtom, playersAtom } from "@/store/store"
import { coachType } from "@/types/coachType"
import { playerType } from "@/types/playerType"
import { Flex } from "@chakra-ui/react"
import { useAtom } from "jotai"
import Head from "next/head"

type Inputs = {
	top: string
	mid: string
	jg: string
	adc: string
	supp: string
	coach: string
}

export function nameToId(
	people: Array<playerType | coachType>,
	name: string
): number {
	const person = people.find((member) => member.name == name)

	if (person) return person.id

	return 0
}

export default function NewComp() {
	const [currentUser] = useAtom(currentUserAtom)
	const [players] = useAtom(playersAtom)
	const [coaches] = useAtom(coachesAtom)

	const handleSubmit = (data: Inputs) => {
		if (
			players &&
			players != "loading" &&
			!(players instanceof Error) &&
			coaches &&
			coaches != "loading" &&
			!(coaches instanceof Error)
		)
			return addItem({
				top_id: nameToId(players, data.top),
				mid_id: nameToId(players, data.mid),
				adc_id: nameToId(players, data.adc),
				supp_id: nameToId(players, data.supp),
				jg_id: nameToId(players, data.jg),
				coach_id: nameToId(coaches, data.coach),
				owner_id: currentUser ? currentUser.uid : "none",
				owner_name: currentUser
					? currentUser.displayName
						? currentUser.displayName
						: "no one"
					: "no one",
			})
		else {
			return Promise.reject(new Error("Failed to submit"))
		}
	}

	if (!currentUser)
		return (
			<Flex textColor="whiteAlpha.600" pt="100px" justifyContent="center">
				Please sign in to view this page.
			</Flex>
		)

	return (
		<>
			<Head>
				<title>New Composition</title>
				<meta
					name="description"
					content="Create a new team composition"
				/>
				<meta property="og:title" content="New Composition" />
				<meta
					property="og:description"
					content="Create a new team composition"
				/>
				<meta
					property="og:image"
					content="https://jsonful.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flol.3567c0fc.png&w=48&q=75"
				/>
			</Head>
			<CompForm onSubmit={handleSubmit} />
		</>
	)
}
