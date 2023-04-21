import CompItem from "@/components/Comp/CompItem"
import { Flex } from "@chakra-ui/react"

const mockData = [
	{
		top_id: 1,
		mid_id: 2,
		jg_id: 3,
		adc_id: 4,
		supp_id: 5,
		coach_id: 1,
		comp_id: "5555",
		owner_id: "someone",
		owner_name: "Mosab Mohamed",
	},
	{
		top_id: 6,
		mid_id: 7,
		jg_id: 8,
		adc_id: 9,
		supp_id: 10,
		coach_id: 2,
		comp_id: "00000000",
		owner_id: "someone",
		owner_name: "Mosab Fathy",
	},
]

export default function Community() {
	return (
		<Flex direction="column" gap="20px">
			{mockData.map((comp) => (
				<CompItem compData={comp} key={comp.comp_id} />
			))}
		</Flex>
	)
}
