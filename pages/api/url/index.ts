import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { currentUser } = await serverAuth(req, res)

		if (req.method !== "POST") {
			return res.status(405).end();
		}

		const { slug, originalUrl } = req.body;

		const existingUrl = await prismadb.shortUrl.findFirst({
			where: {
				slug,
			},
		});

		if (existingUrl) {
			return res
				.status(422)
				.json({ error: "Url with the slug is already exists" });
		}

		const shortUrl = await prismadb.shortUrl.create({
			data: {
				userId: currentUser.id,
				originalUrl,
				slug
			}
		})

		return res.status(200).json(shortUrl)


	} catch (error) {
		console.error(error);
		return res.status(500).end();
	}
}
