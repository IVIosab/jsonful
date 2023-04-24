import { playerType } from "@/types/playerType"
import { coachType } from "@/types/coachType"
import { compType } from "@/types/compType"
import { atom } from "jotai"
import { User } from "firebase/auth"

export const playersAtom = atom<playerType[] | "loading" | Error>("loading")

export const coachesAtom = atom<coachType[] | "loading" | Error>("loading")

export const compsAtom = atom<compType[] | undefined>(undefined)

export const currentUserAtom = atom<User | false | undefined>(undefined)
