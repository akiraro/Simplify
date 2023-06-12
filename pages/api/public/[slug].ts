import { NextApiResponse, NextApiRequest } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}

	try {
		const { slug } = req.query;

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

		// Record visits
		const ipAddress = req.headers["x-forwarded-for"];

		if (typeof ipAddress !== "string") {
			throw new Error("Invalid IP Address");
		}

		const lastHourDate = new Date(new Date().getTime() - 1000 * 60 * 60);

		const visits = await prismadb.visit.findMany({
			where: {
				ipAddress,
				createdAt: { gte: lastHourDate },
				shortUrlId: shortUrl.id,
			},
		});

		if (visits.length === 0) { // Create new visit
			const ipData = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEO_APIKEY}&ip=${ipAddress}`).then((response) => response.json())
			const visit = await prismadb.visit.create({
				data: {
					ipAddress,
					shortUrlId: shortUrl.id,
					count: 1,
					ipGeo: {
						create: {
							ipAddress,
							continentCode: ipData.continent_code,
							continentName: ipData.continent_name,
							countryCode2: ipData.country_code2,
							countryCode3: ipData.country_code3,
							countryName: ipData.country_name,
							countryCapital: ipData.country_capital,
							latitude: parseFloat(ipData.latitude),
							longitude: parseFloat(ipData.longitude),
							countryFlag: ipData.country_flag
						}
					}
				},
			});
		} else if (visits.length === 1) { // Update count
			await prismadb.visit.update({
				where: {
					id: visits[0].id,
				},
				data: {
					count: { increment: 1 },
				},
			});
		}

		return res.status(200).json(shortUrl);
	} catch (error) {
		console.error(error);
		return res.status(400).end();
	}
}
