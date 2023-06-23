import { REPORT_TYPE_MONTHLY, REPORT_TYPE_WEEKLY } from "@/lib/constants";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { currentUser } = await serverAuth(req, res);
		const urlId: string = (req.query.urlId as string) || "";
		const reportType = (req.query?.reportType as string) || REPORT_TYPE_WEEKLY;
		const date = req.query?.date
			? moment(req.query?.date as string, "DD-MM-YYYY")
			: moment();
		let visits = {};
		let geolocations = {};

		if (reportType !== REPORT_TYPE_MONTHLY && reportType !== REPORT_TYPE_WEEKLY)
			return res.status(400).json({ error: "Invalid type" });

		let endDate;

		if (reportType === REPORT_TYPE_WEEKLY) {
			endDate = moment(date.toDate()).subtract("7", "days");
		} else {
			endDate = moment(date.toDate()).subtract("1", "months");
		}
		
		visits = await prismadb.visit.aggregateRaw({
			pipeline: [
				{
					$match: {
						shortUrlId: { $oid: urlId },
						$expr: {
							$and: [
								{
									$lte: [
										"$createdAt",
										{
											$dateFromString: {
												dateString: date.toISOString(),
											},
										},
									],
								},
								{
									$gte: [
										"$createdAt",
										{
											$dateFromString: {
												dateString: endDate.toISOString(),
											},
										},
									],
								},
							],
						},
					},
				},
				{
					$group: {
						_id: {
							$dateToString: {
								format: reportType == REPORT_TYPE_WEEKLY ? "%m-%d-%Y" : "%m-%Y",
								date: "$createdAt",
							},
						},
						count: { $sum: "$count" },
					},
				},
			],
		});

		geolocations = await prismadb.visit.aggregateRaw({
			pipeline: [
				{
					$match: {
						shortUrlId: { $oid: urlId },
						$expr: {
							$and: [
								{
									$lte: [
										"$createdAt",
										{
											$dateFromString: {
												dateString: date.toISOString(),
											},
										},
									],
								},
								{
									$gte: [
										"$createdAt",
										{
											$dateFromString: {
												dateString: endDate.toISOString(),
											},
										},
									],
								},
							],
						},
					},
				},
				{
					$lookup: {
						from: "IPGeo",
						localField: "_id",
						foreignField: "visitId",
						as: "IPGeo",
					},
				},
				{
					$unwind: "$IPGeo",
				},
				{
					$set: {
						country: "$IPGeo.countryName",
						longitude: "$IPGeo.longitude",
						latitude: "$IPGeo.latitude",
						count: "$count",
					},
				},
				{ $unset: "IPGeo" },
				{
					$group: {
						_id: {
							country: "$country",
							longitude: "$longitude",
							latitude: "$latitude",
						},
						count: { $sum: "$count" },
					},
				},
			],
		});

		return res.status(200).json({
			visits,
			geolocations,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).end();
	}
}
