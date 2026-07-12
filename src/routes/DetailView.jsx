import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './DetailView.css'
import GenericDetail from '../components/GenericDetail'
import OrganismObservations from '../components/charts/OrganismObservations'

const DetailView = () => {
    const { id } = useParams()
    const [ fullDetails, setFullDetails ] = useState({
        name: null,
        whenObserved: null,
        observations: null,
        classification: null,
        place: null,
        coordinates: null,
        url: null,
        photo: null,
        taxonId: null
    })

    const getPlaceName = async(placeId) => {
        const response = await fetch(`https://api.inaturalist.org/v1/places/${placeId}`);
        const json = await response.json();

        return json.results[0].name;
    }

    useEffect(() => {
        const getLifeDetails = async () => {
            const response = await fetch(`https://api.inaturalist.org/v1/observations?page=1&uuid=${id}`)
            const json = await response.json()

            if (json.total_results == 0) {
                setFullDetails(null)
                return
            }

            const nameJson = await json.results[0].taxon.name
            const whenObservedJson = await json.results[0].observed_on_details.date
            const observationsJson = await json.results[0].taxon.observations_count
            const classificationJson = await json.results[0].taxon.iconic_taxon_name
            const placeJson = await getPlaceName(await json.results[0].place_ids[0])
            const coordinatesJson = (await json.results[0].geojson.coordinates).join(", ")
            const urlJson = json.results[0].uri
            const photoJson = await json.results[0].taxon.default_photo.url
            const taxonJson = await json.results[0].taxon.id

            setFullDetails({
                name: nameJson,
                whenObserved: whenObservedJson,
                observations: observationsJson,
                classification: classificationJson,
                place: placeJson,
                coordinates: coordinatesJson,
                url: urlJson,
                photo: photoJson,
                taxonId: taxonJson
            })
        }

        getLifeDetails().catch(console.error)
    },[id])

    if (fullDetails == null) {
        return (
            <div className="details-box">
                <h1>Invalid organism ID!</h1>
            </div>
        )
    } else {
        return (
            <div className="details-box">
                <ul>
                <li>
                        <div className="details-name italic-text">{fullDetails.name ?? "N/A"}</div>
                </li>
                <GenericDetail category="Date Observed" value={fullDetails.whenObserved}></GenericDetail>
                <GenericDetail category="Number of Observations" value={fullDetails.observations}></GenericDetail>
                <GenericDetail category="iNaturalist Classification" value={fullDetails.classification}></GenericDetail>
                <GenericDetail category="Location Name" value={fullDetails.place}></GenericDetail>
                <GenericDetail category="Coordinates (Long/Lat)" value={fullDetails.coordinates}></GenericDetail>
                <li>
                        <span className="bold-text">URL of Record:</span> <a href={fullDetails.url} target="_blank" rel="noopener noreferrer">{fullDetails.url ? fullDetails.url : "N/A"}</a>
                    </li>
                <li>
                        <div className="bold-text">Photo:</div>
                        {fullDetails.photo ? <img src={fullDetails.photo}></img> : "N/A"}
                    </li>
                </ul>

                <OrganismObservations taxon_id={fullDetails.taxonId}></OrganismObservations>
            </div>
        )
    }
}

export default DetailView