import useFirebaseAuth from "@/hooks/useFirebaseAuth"
import { signInUser, signOutUser } from "@/lib/firebaseComms"
import { currentUserAtom } from "@/store/store"
import {
	Avatar,
	Menu,
	MenuButton,
	MenuGroup,
	MenuItem,
	MenuList,
} from "@chakra-ui/react"
import { useAtom } from "jotai"

export default function AccountItem() {
	const [currentUser] = useAtom(currentUserAtom)

	useFirebaseAuth()

	const handleSignIn = () => signInUser()

	const handleSignOut = () => signOutUser()

	if (!currentUser)
		return (
			<Menu>
				<MenuButton>
					<Avatar />
				</MenuButton>
				<MenuList>
					<MenuGroup title="Manage">
						<MenuItem>Home</MenuItem>
					</MenuGroup>
					<MenuGroup title="Settings">
						<MenuItem onClick={handleSignIn}>Sign In</MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>
		)

	return (
		<Menu>
			<MenuButton>
				<Avatar
					src={
						currentUser.photoURL ? currentUser.photoURL : undefined
					}
					name={
						currentUser.displayName ? currentUser.displayName : ""
					}
				/>
			</MenuButton>
			<MenuList>
				<MenuGroup title="Manage">
					<MenuItem>Home</MenuItem>
				</MenuGroup>
				<MenuGroup title="Settings">
					<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
				</MenuGroup>
			</MenuList>
		</Menu>
	)
}
