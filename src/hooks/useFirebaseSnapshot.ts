import { compsAtom } from "@/store/store"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { getFirestore, onSnapshot, query, collection } from "firebase/firestore"
import { app } from "@/lib/firebaseConfig"
import { compType } from "@/types/compType"

const useFirebaseSnapshot = () => {
	const [, setComps] = useAtom(compsAtom)

	const db = getFirestore(app)
	const q = query(collection(db, "comps"))

	useEffect(() => {
		const unsubscribe = onSnapshot(q, async (querySnapshot) => {
			const items: compType[] = []

			querySnapshot.forEach((doc) => {
				items.push({ ...doc.data(), comp_id: doc.id } as compType)
			})

			setComps(items)
		})

		return () => unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}

export default useFirebaseSnapshot
