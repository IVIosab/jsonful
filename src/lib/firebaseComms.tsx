import { app } from "./firebaseConfig"
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	setDoc,
	addDoc,
	deleteDoc,
} from "firebase/firestore"
import { compType } from "@/types/compType"
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth"

export async function getItemData(id: string) {
	const db = getFirestore(app)
	const docRef = doc(db, "comps", id)
	const docSnap = await getDoc(docRef)
	let docData = docSnap.data() as Omit<compType, "comp_id">
	if (!docData) return undefined

	return {
		comp_id: id,
		...docData,
	}
}

export async function updateItem(newValues: compType) {
	const db = getFirestore(app)
	const docId = newValues.comp_id

	const docValues = Object.fromEntries(
		Object.entries(newValues).filter(([key]) => key != "comp_id")
	)

	const updateTx = await setDoc(doc(db, "comps", docId), docValues)

	return updateTx
}

export async function addItem(newValues: Omit<compType, "comp_id">) {
	const db = getFirestore(app)

	// const docValues = Object.fromEntries(
	// 	Object.entries(newValues).filter(([key]) => key != "id")
	// )

	return addDoc(collection(db, "comps"), newValues).then(() => {
		return
	})
}

export async function deleteItem(docId: string) {
	const db = getFirestore(app)

	const deleteTx = await deleteDoc(doc(db, "comps", docId))

	return deleteTx
}

export async function signInUser() {
	const provider = new GoogleAuthProvider()
	const auth = getAuth(app)
	auth.languageCode = "en"

	return signInWithPopup(auth, provider)
}

export async function signOutUser() {
	const auth = getAuth()

	return signOut(auth)
}
