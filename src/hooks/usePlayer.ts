import useSWR from "swr"
import fetcher from "@/lib/fetcher"
import { playerType } from "@/types/playerType"

export default function usePlayer(id: number) {
	const { data, error, isLoading } = useSWR<playerType, Error>(
		`/api/players/${id}`,
		fetcher
	)

	return { data, error, isLoading }
}
