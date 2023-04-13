import { NextApiResponse, NextApiRequest } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}

	try {
		const { slug } = req.query;
		console.log(slug);

		if (typeof slug !== "string") {
			throw new Error("Invalid Slug");
		}

		if (!slug) {
			throw new Error("Invalid Slug");
		}

		const shortUrl = await prismadb.shortUrl.findFirst({
			where: {
				slug,
			},
		});

		if (!shortUrl) {
			throw new Error("Invalid Slug");
		}

		return res.status(200).json(shortUrl)
	} catch (error) {
		console.error(error);
		return res.status(400).end();
	}
}
