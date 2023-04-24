import useSWR from "swr"
import fetcher from "@/lib/fetcher"
import { playerType } from "@/types/playerType"
import { useAtom } from "jotai"
import { playersAtom } from "@/store/store"
import { useEffect } from "react"

export default function usePlayers() {
	const { data, error, isLoading } = useSWR<playerType[], Error>(
		"/api/players",
		fetcher
	)

	const [, setPlayers] = useAtom(playersAtom)
	useEffect(() => {
		if (error) setPlayers(error)
		else if (isLoading) setPlayers("loading")
		else data && setPlayers(data)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, error, isLoading])
}
