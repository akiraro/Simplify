import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { REPORT_TYPE_DAY, REPORT_TYPE_MONTH } from "@/lib/constants";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { currentUser } = await serverAuth(req, res);
		const urlId: string = (req.query.urlId as string) || "";
		const type = (req.query?.type as string) || REPORT_TYPE_DAY;

		const visits = await prismadb.visit.aggregateRaw({
			pipeline: [
				{ $match: { shortUrlId: { $oid: urlId } } },
				{
					$group: {
						_id: {
							$dateToString: {
								format: type == REPORT_TYPE_DAY ? "%Y-%m-%d" : "%Y-%m",
								date: "$createdAt",
							},
						},
						count: { $sum: "$count" },
					},
				},
			],
		});

		return res.status(200).json(visits);
	} catch (error) {
		console.error(error);
		return res.status(500).end();
	}
}
