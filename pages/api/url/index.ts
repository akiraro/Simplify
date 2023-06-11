import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { currentUser } = await serverAuth(req, res)

		if (req.method === "POST"){
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
		}
		else if (req.method === "GET"){
			const query = req.query
			const page: number = parseInt(query?.page as string, 10) || 1
			const pageSize: number = parseInt(query?.page_size as string) || 20
			const search: string = query?.search as string || ''

			const urls = await prismadb.shortUrl.findMany({
				where: {
					userId: {
						in: currentUser.id
					},
					slug: {
						contains: search
					}
				},
				skip: (page - 1) * pageSize,
				take: pageSize,
			})

			return res.status(200).json(urls)

		}else{
			return res.status(405).end();
		}


	} catch (error) {
		console.error(error);
		return res.status(500).end();
	}
}
