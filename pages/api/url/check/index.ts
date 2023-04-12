import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
	try {
		if (req.method !== 'GET'){
			return res.status(405).end();
		}

		const { currentUser } = await serverAuth(req, res)
		const { slug } = req.query

		if (typeof slug !== 'string'){
			throw new Error('Invalid Slug')
		}

		const count = await prismadb.shortUrl.count({
			where: {
				slug: slug
			}
		})

		return res.status(200).json({
			used: count > 0
		})
	} catch (error) {
		console.error(error);
		return res.status(500).end()
	}
}