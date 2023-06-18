import React, { memo, useState, useMemo } from 'react';
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup
} from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { scaleLinear } from "d3-scale";

/**
 * Interfaces
 */
interface MapChartProps {
	geolocations: Record<string, any>[]
}

/**
 * Helper function to initialize color scale
 */
const initializeColorScale = (geolocations: Record<string,any>[]) => {
	if (geolocations.length == 0) {
		return () => '#D6D6DA'
	}

	const highestScale = geolocations.reduce((max: Record<string,any>, location: Record<string,any>) => 
		max.count > location.count ? max : location
	)

	return scaleLinear<string, number>()
		.domain([0, highestScale.count])
		// .range(["#ffedea", "#ff5233"]);
		.range(["#2dd4bf", "#3b82f6"]);
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
	const colorScale = useMemo(() => initializeColorScale(geolocations), [geolocations])

	return (
		<>
			<ComposableMap data-tooltip-id='map-tooltip'>
				<ZoomableGroup>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => {
								var data: Record<string,any> | undefined
								
								if (geolocations.length != 0) {
									data = geolocations.find((geolocation) => {
										return geo.properties.name === geolocation._id.country
									})
								} else {
									data = {}
								}

								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										onMouseEnter={() => {
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
												fill: data ? colorScale(data?.count) as string | undefined: '#D6D6DA',
												outline: "none"
											},
											hover: {
												fill: "#ff5233",
												outline: "none"
											},
											pressed: {
												fill: "#E42",
												outline: "none"
											}
										}}
									/>
								)
							})
						}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
			<ReactTooltip id='map-tooltip' className="flex flex-col" float>
				{content?.country && (
					<>
						<span className="text-[#3b82f6] text-xl font-bold">{content?.country}</span>
						<span className="text-[#2dd4bf] text-center">Visitor: {content?.visit}</span>
					</>
				)}
			</ReactTooltip>
		</>
	)
}

export default memo(MapChart)