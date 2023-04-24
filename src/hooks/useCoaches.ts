import useSWR from "swr"
import fetcher from "@/lib/fetcher"
import { useAtom } from "jotai"
import { coachesAtom } from "@/store/store"
import { coachType } from "@/types/coachType"
import { useEffect } from "react"

export default function useCoaches() {
	const { data, error, isLoading } = useSWR<coachType[], Error>(
		"/api/coaches",
		fetcher
	)

	const [, setCoaches] = useAtom(coachesAtom)
	useEffect(() => {
		if (error) setCoaches(error)
		else if (isLoading) setCoaches("loading")
		else data && setCoaches(data)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, data, error])
}
