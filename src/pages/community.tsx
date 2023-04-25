import CompItem from "@/components/Comp/CompItem"
import NewCompItem from "@/components/Comp/NewComp"
import useFirebaseSnapshot from "@/hooks/useFirebaseSnapshot"
import { compsAtom, currentUserAtom } from "@/store/store"
import { Flex, Spinner } from "@chakra-ui/react"
import { useAtom } from "jotai"
import Head from "next/head"

export default function Community() {
	const [comps] = useAtom(compsAtom)
	return (
		<>
			<Head>
				<title>Community</title>
				<meta name="description" content="JSONful Community Page" />
				<meta property="og:title" content="Community" />
				<meta
					property="og:description"
					content="JSONful Community Page"
				/>
				<meta
					property="og:image"
					content="https://jsonful.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flol.3567c0fc.png&w=48&q=75"
				/>
			</Head>
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
		</>
	)
}
