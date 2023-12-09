import useSWR from 'swr'
import Error from 'next/error'
import Card from 'react-bootstrap/Card'
import {useAtom} from 'jotai'
import { favouritesAtom } from '@/store'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { addToFavourites } from '@/lib/userData'
import { removeFromFavourites } from '@/lib/userData'
export default function ArtworkCardDetail(props){
    const fetcher = async url => {
        const res = await fetch(url)
       
        
        // If the status code is not in the range 200-299,
        // we still try to parse and throw it.
        if (!res.ok) {
          const error = new Error('An error occurred while fetching the data.')
          // Attach extra info to the error object.
          error.info = await res.json()
          error.status = res.status
          throw error
        }
        
       
        return res.json()
      }
      
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`: null, fetcher)

    // getting reference to favourites list
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setShowAdded] = useState(false)
    
    // Use effect
    useEffect(()=>{
      setShowAdded(favouritesList?.includes(props.objectID))
    }, [favouritesList])

    // Adding the function facouritesClicked

    async function favouritesClicked(){
      
      if(showAdded){
        setFavouritesList(await removeFromFavourites(props.objectID)) 
        setShowAdded(false)
      }else{
        setFavouritesList(await addToFavourites(props.objectID))
        setShowAdded(true)
      }
      
    }

    if (error) return <Error statusCode={404}/>
    if(data) return (
        <Card>
        {data?.primaryImage ? <Card.Img variant="top" src= {data.primaryImage}/> : null}
        
        <Card.Body>
            <Card.Title>{data?.title ? data.title: "N/A" }</Card.Title>
            <Card.Text>
            <strong>Date: </strong> {data?.objectDate ? data.objectDate : "N/A"} <br/>
            <strong>Classification: </strong> {data?.classification ? data.classification: "N/A"} <br/>
            <strong>Medium: </strong> {data?.medium ? data.medium : "N/A"} <br/><br/>
            <strong>Artist: </strong> {data?.artistDisplayName ? <> {data.artistDisplayName} (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>)</> : "N/A"} <br/>
            <strong>Credit Line: </strong> {data?.creditLine ? data.creditLine: "N/A" } <br/>
            <strong>Dimensions: </strong> {data?.dimensions ? data.dimensions : "N/A"} <br/><br/>
            <Button variant= {showAdded ?  'primary': 'outline-primary'} onClick={favouritesClicked}> {showAdded ? '+ Favourite(added)': '+ Favourite'} </Button>
            </Card.Text>
        </Card.Body>
        </Card>
    )
    return null
}


  