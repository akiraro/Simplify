import React, { memo, useState } from 'react';
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup
} from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";

/**
 * Interfaces
 */
interface MapChartProps {
	geolocations: Record<string, any>
}

/**
 * Local initial value
 */
const initialTooltipContent = {
	country: '',
	visit: 0
}

const geoUrl =
	"https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

const MapChart: React.FC<MapChartProps> = ({ geolocations }) => {
	const [content, setContent] = useState(initialTooltipContent);
	return (
		<>
			<ComposableMap data-tooltip-id='map-tooltip'>
				<ZoomableGroup>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									onMouseEnter={() => {
										var data = geolocations.find((geolocation: Record<string,any>) => {
											return geo.properties.name === geolocation._id.country
										})

										setContent({
											country: geo.properties.name || '',
											visit: data?.count || 0
										});
									}}
									onMouseLeave={() => {
										setContent({
											country: '',
											visit: 0
										});
									}}
									style={{
										default: {
											fill: "#D6D6DA",
											outline: "none"
										},
										hover: {
											fill: "#F53",
											outline: "none"
										},
										pressed: {
											fill: "#E42",
											outline: "none"
										}
									}}
								/>
							))
						}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
			<ReactTooltip id='map-tooltip' className="flex flex-col" float>
				{content?.country && (
					<>
						<span className="text-[#3b82f6] text-xl font-bold">{content?.country}</span>
						<span className="text-[#2dd4bf] text-center">Visit: {content?.visit}</span>
					</>
				)}
			</ReactTooltip>
		</>
	)
}

export default memo(MapChart)