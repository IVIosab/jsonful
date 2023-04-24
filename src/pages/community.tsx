import CompItem from "@/components/Comp/CompItem"
import NewCompItem from "@/components/Comp/NewComp"
import useFirebaseSnapshot from "@/hooks/useFirebaseSnapshot"
import { compsAtom, currentUserAtom } from "@/store/store"
import { Flex, Spinner } from "@chakra-ui/react"
import { useAtom } from "jotai"

export default function Community() {
	const [comps] = useAtom(compsAtom)
	return (
		<Flex direction="column" gap="20px">
			{comps ? (
				comps.map((comp) => (
					<CompItem compData={comp} key={comp.comp_id} />
				))
			) : (
				<Spinner />
			)}
			<NewCompItem />
		</Flex>
	)
}
