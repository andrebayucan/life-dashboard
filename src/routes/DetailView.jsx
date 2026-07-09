import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './DetailView.css'


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
        photo: null
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

            const nameJson = await json.results[0].taxon.name
            const whenObservedJson = await json.results[0].observed_on_details.date
            const observationsJson = await json.results[0].taxon.observations_count
            const classificationJson = await json.results[0].taxon.iconic_taxon_name
            const placeJson = await getPlaceName(await json.results[0].place_ids[0])
            const coordinatesJson = (await json.results[0].geojson.coordinates).join(", ")
            const urlJson = json.results[0].uri
            const photoJson = await json.results[0].taxon.default_photo.url

            setFullDetails({
                name: nameJson,
                whenObserved: whenObservedJson,
                observations: observationsJson,
                classification: classificationJson,
                place: placeJson,
                coordinates: coordinatesJson,
                url: urlJson,
                photo: photoJson
            })
        }

        getLifeDetails().catch(console.error)
    },[id])

    useEffect(() => {
        console.log(fullDetails)
        console.log("here")
    },[fullDetails])

    return (
        <div className="details-box">
            <ul>
               <li>
                    <div className="details-name">{fullDetails.name ? fullDetails.name : "N/A"}</div>
               </li>
               <li><span className="left-bold">Date Observed:</span> {fullDetails.whenObserved ? fullDetails.whenObserved : "N/A"}</li>
               <li><span className="left-bold">Number of Observations:</span> {fullDetails.observations ? fullDetails.observations : "N/A"}</li>
               <li><span className="left-bold">iNaturalist Classification:</span> {fullDetails.classification ? fullDetails.classification : "N/A"}</li>
               <li><span className="left-bold">Location name:</span> {fullDetails.place ? fullDetails.place : "N/A"}</li>
               <li><span className="left-bold">Coordinates (Long/Lat):</span> {fullDetails.coordinates ? fullDetails.coordinates : "N/A"}</li>
               <li><span className="left-bold">iNaturalist URL:</span> <a href={fullDetails.url} target="_blank" rel="noopener noreferrer">{fullDetails.url ? fullDetails.url : "N/A"}</a></li>
               <li>
                    <div className="left-bold">Photo:</div>
                    {fullDetails.photo ? <img src={fullDetails.photo}></img> : "N/A"}
                </li>
            </ul>
            
        </div>
    )
}

export default DetailView