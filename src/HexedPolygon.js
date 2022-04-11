import { useState, useEffect } from 'react'
import Globe from 'react-globe.gl'
import GLOBE_IMG from './TV_Logo.gif'
import { GEO_JSON_DATA } from './countries.geojson'
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

function HexedPolygon() {
	const [modal, setModal] = useState(false);

	const pointClickHandler = (e) => {
		console.log("--> ", e);
		setModal(true);
	}

	return (
		<>
			<Globe
				globeImageUrl={GLOBE_IMG}
				hexPolygonsData={GEO_JSON_DATA.features}
				hexPolygonResolution={3}
				hexPolygonMargin={0.3}
				hexPolygonColor={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`}
				// 	hexPolygonLabel={({ properties: d }) => `
				//   <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
				//   Population: <i>${d.POP_EST}</i>
				// `}
				onHexPolygonClick={pointClickHandler}
			/>
			<PureModal
				footer={
					<div style={{ float: "right" }}>
						<button style={{ marginRight: '10px' }} onClick={() => setModal(false)}>Cancel</button>
						<button style={{ marginRight: '-30px' }} onClick={() => setModal(false)}>Save</button>
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
				<p>Purchase Land On Terra Virtua</p>
			</PureModal>
		</>
	)
}

export default HexedPolygon