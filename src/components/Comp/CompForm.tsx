import useCoaches from "@/hooks/useCoaches"
import usePlayers from "@/hooks/usePlayers"
import { playersAtom } from "@/store/store"
import { coachesAtom } from "@/store/store"
import { type compType } from "@/types/compType"
import { playerType } from "@/types/playerType"
import {
	Box,
	FormControl,
	FormErrorMessage,
	Button,
	Select,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	useDisclosure,
	FormLabel,
} from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useEffect, useMemo, useRef } from "react"
import { Controller, useForm } from "react-hook-form"

type Inputs = {
	top: string
	mid: string
	jg: string
	adc: string
	supp: string
	coach: string
}

export function nameToTeam(people: Array<playerType>, name: string): string {
	const person = people.find((member) => member.name == name)

	if (person) return person.team

	return ""
}

const validateLessThan2Array = (teams: string[]) => {
	const counts: Record<string, number> = {}

	for (const team of teams) {
		if (team == "") continue
		if (counts[team]) {
			counts[team]++
		} else {
			counts[team] = 1
		}
	}

	const invalid = Object.values(counts).some((count) => count > 2)

	if (invalid) {
		return "You cannot pick more than 2 members from the same team"
	}

	return true
}

export default function CompForm(props: {
	comp?: compType
	buttonName?: string
	onSubmit: (data: Inputs) => Promise<void>
	onDelete?: () => Promise<void>
}) {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [players] = useAtom(playersAtom)
	const [coaches] = useAtom(coachesAtom)

	let defaultValues: Inputs = useMemo(() => {
		if (props.comp && Array.isArray(players) && Array.isArray(coaches))
			return {
				top: players.filter(
					(player) => player.id == props.comp?.top_id
				)[0].name,
				mid: players.filter(
					(player) => player.id == props.comp?.mid_id
				)[0].name,
				jg: players.filter(
					(player) => player.id == props.comp?.jg_id
				)[0].name,
				adc: players.filter(
					(player) => player.id == props.comp?.adc_id
				)[0].name,
				supp: players.filter(
					(player) => player.id == props.comp?.supp_id
				)[0].name,
				coach: coaches.filter(
					(coach) => coach.id == props.comp?.coach_id
				)[0].name,
			}
		else return { top: "", mid: "", jg: "", adc: "", supp: "", coach: "" }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coaches, players])

	// fetch player/coach data and load it into global state
	usePlayers()
	useCoaches()

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		reset,
		watch,
	} = useForm<Inputs>({
		defaultValues: defaultValues,
	})

	useEffect(() => {
		reset(defaultValues)
	}, [defaultValues, reset])

	const router = useRouter()
	const cancelRef = useRef() as React.RefObject<HTMLButtonElement>

	const topPlayer = watch("top", "")
	const midPlayer = watch("mid", "")
	const jgPlayer = watch("jg", "")
	const adcPlayer = watch("adc", "")
	const suppPlayer = watch("supp", "")

	const validateLessThan2 = (_: string) =>
		validateLessThan2Array(
			[topPlayer, midPlayer, jgPlayer, adcPlayer, suppPlayer].map(
				(player) =>
					Array.isArray(players)
						? nameToTeam(players, player)
						: nameToTeam([], player)
			)
		)

	const onSubmit = async (data: Inputs) => {
		props
			.onSubmit(data)
			.then(() => {
				alert("submitted successfully")
				router.push("/community")
			})
			.catch((e) => alert("operation failed, please try again later"))
	}

	const handleDelete = () => {
		props.onDelete &&
			props
				.onDelete()
				.then(() => {
					alert("deleted successfully")
					router.push("/community")
				})
				.catch((e) => alert("operation failed, please try again later"))
	}

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			display="flex"
			flexDirection="column"
			w={{ base: "90%", lg: "40%" }}
			gap="15px"
			fontSize="lg"
			alignSelf="center"
			paddingY="20px"
			textColor="whiteAlpha.600"
		>
			<FormControl isInvalid={errors.top && true}>
				<FormLabel htmlFor="top">Top</FormLabel>
				<Controller
					control={control}
					name="top"
					key="top"
					defaultValue=""
					rules={{
						required: "This is required.",
						validate: {
							isTopPlayer: (value) => {
								const selectedPlayer =
									Array.isArray(players) &&
									players.find(
										(player) => player.name === value
									)
								if (
									selectedPlayer &&
									selectedPlayer.role === "Top"
								) {
									return true
								} else {
									return "Please select a top player."
								}
							},
							lessThanTwo: validateLessThan2,
						},
					}}
					render={({ field: { onChange, value, ref } }) => (
						<Select
							onChange={onChange}
							ref={ref}
							value={value}
							placeholder="Choose a top player"
							variant="flushed"
						>
							{Array.isArray(players) &&
								players?.map((player) => (
									<option
										key={player.id}
										value={player.name}
										style={{ color: "black" }}
									>
										{player.team} {player.name} (
										{player.role})
									</option>
								))}
						</Select>
					)}
				/>

				<FormErrorMessage>
					{errors.top && errors.top.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.mid && true}>
				<FormLabel htmlFor="mid">Mid</FormLabel>
				<Controller
					control={control}
					name="mid"
					key="mid"
					defaultValue=""
					rules={{
						required: "This is required.",
						validate: {
							isMidPlayer: (value) => {
								const selectedPlayer =
									Array.isArray(players) &&
									players.find(
										(player) => player.name === value
									)
								if (
									selectedPlayer &&
									selectedPlayer.role === "Mid"
								) {
									return true
								} else {
									return "Please select a mid player."
								}
							},
							lessThanTwo: validateLessThan2,
						},
					}}
					render={({ field: { onChange, value, ref } }) => (
						<Select
							onChange={onChange}
							ref={ref}
							value={value}
							placeholder="Choose a mid player"
							variant="flushed"
						>
							{Array.isArray(players) &&
								players?.map((player) => (
									<option
										key={player.id}
										value={player.name}
										style={{ color: "black" }}
									>
										{player.team} {player.name} (
										{player.role})
									</option>
								))}
						</Select>
					)}
				/>

				<FormErrorMessage>
					{errors.mid && errors.mid.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.jg && true}>
				<FormLabel htmlFor="jg">Jungle</FormLabel>
				<Controller
					control={control}
					name="jg"
					key="jg"
					defaultValue=""
					rules={{
						required: "This is required.",
						validate: {
							isJgPlayer: (value) => {
								const selectedPlayer =
									Array.isArray(players) &&
									players.find(
										(player) => player.name === value
									)
								if (
									selectedPlayer &&
									selectedPlayer.role === "Jungle"
								) {
									return true
								} else {
									return "Please select a jungle player."
								}
							},
							lessThanTwo: validateLessThan2,
						},
					}}
					render={({ field: { onChange, value, ref } }) => (
						<Select
							onChange={onChange}
							ref={ref}
							value={value}
							placeholder="Choose a jungle player"
							variant="flushed"
						>
							{Array.isArray(players) &&
								players?.map((player) => (
									<option
										key={player.id}
										value={player.name}
										style={{ color: "black" }}
									>
										{player.team} {player.name} (
										{player.role})
									</option>
								))}
						</Select>
					)}
				/>

				<FormErrorMessage>
					{errors.jg && errors.jg.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.adc && true}>
				<FormLabel htmlFor="adc">ADC</FormLabel>
				<Controller
					control={control}
					name="adc"
					key="adc"
					defaultValue=""
					rules={{
						required: "This is required.",
						validate: {
							isADCPlayer: (value) => {
								const selectedPlayer =
									Array.isArray(players) &&
									players.find(
										(player) => player.name === value
									)
								if (
									selectedPlayer &&
									selectedPlayer.role === "ADC"
								) {
									return true
								} else {
									return "Please select an ADC player."
								}
							},
							lessThanTwo: validateLessThan2,
						},
					}}
					render={({ field: { onChange, value, ref } }) => (
						<Select
							onChange={onChange}
							ref={ref}
							value={value}
							placeholder="Choose an ADC player"
							variant="flushed"
						>
							{Array.isArray(players) &&
								players?.map((player) => (
									<option
										key={player.id}
										value={player.name}
										style={{ color: "black" }}
									>
										{player.team} {player.name} (
										{player.role})
									</option>
								))}
						</Select>
					)}
				/>

				<FormErrorMessage>
					{errors.adc && errors.adc.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.supp && true}>
				<FormLabel htmlFor="supp">Support</FormLabel>
				<Controller
					control={control}
					name="supp"
					key="supp"
					defaultValue=""
					rules={{
						required: "This is required.",
						validate: {
							isSuppPlayer: (value) => {
								const selectedPlayer =
									Array.isArray(players) &&
									players.find(
										(player) => player.name === value
									)
								if (
									selectedPlayer &&
									selectedPlayer.role === "Support"
								) {
									return true
								} else {
									return "Please select a support player."
								}
							},
							lessThanTwo: validateLessThan2,
						},
					}}
					render={({ field: { onChange, value, ref } }) => (
						<Select
							onChange={onChange}
							ref={ref}
							value={value}
							placeholder="Choose a support player"
							variant="flushed"
						>
							{Array.isArray(players) &&
								players?.map((player) => (
									<option
										key={player.id}
										value={player.name}
										style={{ color: "black" }}
									>
										{player.team} {player.name} (
										{player.role})
									</option>
								))}
						</Select>
					)}
				/>

				<FormErrorMessage>
					{errors.supp && errors.supp.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.coach && true}>
				<FormLabel htmlFor="top">Coach</FormLabel>
				<Controller
					control={control}
					name="coach"
					key="coach"
					defaultValue=""
					rules={{ required: "This is required." }}
					render={({ field: { onChange, value, ref } }) => (
						<Select
							onChange={onChange}
							ref={ref}
							value={value}
							placeholder="Choose a coach"
							variant="flushed"
						>
							{Array.isArray(coaches) &&
								coaches?.map((coach) => (
									<option
										key={coach.id}
										value={coach.name}
										style={{ color: "black" }}
									>
										{coach.team} {coach.name}
									</option>
								))}
						</Select>
					)}
				/>

				<FormErrorMessage>
					{errors.coach && errors.coach.message}
				</FormErrorMessage>
			</FormControl>

			<Button
				isLoading={isSubmitting}
				type="submit"
				textColor="blackAlpha.900"
			>
				{props.buttonName ? props.buttonName : "Add Comp"}
			</Button>

			<Button
				display={props.comp ? "block" : "none"}
				colorScheme="red"
				onClick={onOpen}
			>
				Remove Comp
			</Button>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Comp
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure you want to delete this comp? It will
							be lost permanently.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={handleDelete}
								ml={3}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Box>
	)
}
