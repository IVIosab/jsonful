import path from "path"
import { promises as fs } from "fs"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	//Find the absolute path of the json directory
	const jsonDirectory: string = path.join(process.cwd(), "json")
	//Read the json data file data.json
	const fileContents: string = await fs.readFile(
		jsonDirectory + "/data.json",
		"utf8"
	)
	const jsonFileContents: {
		players: [
			{
				id: number
				name: string
				team: string
				score: number
				role: string
				img: string
			}
		]
		coaches: [
			{
				id: number
				name: string
				team: string
				score: number
				img: string
			}
		]
	} = JSON.parse(fileContents)
	//Return the content of the data file in json format
	res.status(200).json(jsonFileContents.players)
}
