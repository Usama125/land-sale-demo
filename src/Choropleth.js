import React, { useState, useEffect, useMemo } from 'react'
import { GEO_JSON_DATA } from './countries.geojson'
import GLOBE_IMG from './TV_Logo.gif'
import BACKGROUND_IMG from './earth-dark.jpeg'
import Globe from 'react-globe.gl'
import { scaleSequentialSqrt, interpolateYlOrRd } from 'd3'
import PureModal from 'react-pure-modal';
import "./index.css";

function Choropleth() {
	const [hoverD, setHoverD] = useState();
	const [modal, setModal] = useState(false);
	const [selectedPolygon, setSelectedPolygon] = useState(null);

	const colorScale = scaleSequentialSqrt(interpolateYlOrRd);
	const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

	const maxVal = useMemo(
		() => Math.max(...GEO_JSON_DATA.features.map(getVal)),
		[GEO_JSON_DATA]
	);
	colorScale.domain([0, maxVal]);

	const onPolygonClickHandler = (e) => {
		setSelectedPolygon(e);
		console.log("e => ", e);
		setModal(true);
	}

	const getColorScale = (status) => {
		switch (status) {
			case "AVAILABLE": return "white";
			case "BOOKED": return "red";
			case "RESALE": return "green";
			default: return "white";
		}
	}

	return (
		<>
			<Globe
				globeImageUrl={BACKGROUND_IMG}
				backgroundImageUrl={BACKGROUND_IMG}
				lineHoverPrecision={0}
				polygonsData={GEO_JSON_DATA.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
				polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
				polygonCapColor={d => d === hoverD ? 'steelblue' : getColorScale(d.status)}
				polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
				polygonStrokeColor={() => '#111'}
				// 	polygonLabel={({ properties: d }) => `
				//   <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
				//   GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
				//   Population: <i>${d.POP_EST}</i>
				// `}
				onPolygonHover={setHoverD}
				polygonsTransitionDuration={300}
				onPolygonClick={onPolygonClickHandler}
			/>
			<PureModal
				footer={
					<div style={{ float: "right" }}>
						<button className='btn-cancel' style={{ border: "2px solid", marginRight: '10px', padding: '5px 15px' }} onClick={() => setModal(false)}>Cancel</button>
						<button className='btn-purchase' style={{ marginRight: '-30px', padding: '7px 15px' }} onClick={() => setModal(false)}>Purchase</button>
					</div>
				}
				isOpen={modal}
				closeButton="close"
				closeButtonPosition="bottom"
				onClose={() => {
					setModal(false);
					return true;
				}}
			>
				<div>
					<h3>Land Details ({selectedPolygon?.status})</h3>
					<h4>Country: {selectedPolygon?.properties?.BRK_NAME + " " + selectedPolygon?.properties?.CONTINENT}</h4>
					<p>Economy: {selectedPolygon?.properties?.ECONOMY}</p>
					<h3>Pay Now</h3>
					<input type="radio" name="demo-pay" />Pay with metamask <br />
					<input type="radio" name="demo-pay" />Pay with terra wallet <br />
				</div>
			</PureModal>
		</>
	)
}

export default Choropleth