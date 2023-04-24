import { currentUserAtom } from "@/store/store"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useAtom } from "jotai"
import { useEffect } from "react"

const useFirebaseAuth = () => {
	const auth = getAuth()
	const [, setCurrentUser] = useAtom(currentUserAtom)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUser(user)
			} else {
				setCurrentUser(false)
			}
		})

		return () => unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}

export default useFirebaseAuth
