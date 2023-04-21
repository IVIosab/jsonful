import {
	Avatar,
	Menu,
	MenuButton,
	MenuGroup,
	MenuItem,
	MenuList,
} from "@chakra-ui/react"

export default function AccountItem() {
	return (
		<Menu>
			<MenuButton>
				<Avatar name="Mosab Mohamed" src="Some Image" />
			</MenuButton>
			<MenuList>
				<MenuGroup title="Manage">
					<MenuItem>Home</MenuItem>
				</MenuGroup>
				<MenuGroup title="Settings">
					<MenuItem>Sign Out</MenuItem>
				</MenuGroup>
			</MenuList>
		</Menu>
	)
}
