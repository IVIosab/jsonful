import useSWR from "swr"
import fetcher from "@/lib/fetcher"
import { coachType } from "@/types/coachType"

export default function useCoach(id: number) {
	const { data, error, isLoading } = useSWR<coachType, Error>(
		`/api/coaches/${id}`,
		fetcher
	)

	return { data, error, isLoading }
}
