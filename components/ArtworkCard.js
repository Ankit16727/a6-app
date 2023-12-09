import useSWR from 'swr'
import Error from 'next/error'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function ArtworkCard(props){
    //const fetcher = url => fetch(url).then(r => r.json())
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
    
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`, fetcher)
    if (error) return <Error statusCode = {404}/>
    if(data) return (
        <Card>
        <Card.Img variant="top" src= {data?.primaryImageSmall ? data.primaryImageSmall: "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
        <Card.Body>
            <Card.Title>{data?.title ? data.title: "N/A" }</Card.Title>
            <Card.Text>
            <strong>Date: </strong> {data?.objectDate ? data.objectDate : "N/A"} <br/>
            <strong>Classification: </strong> {data?.classification ? data.classification: "N/A"} <br/>
            <strong>Medium: </strong> {data?.medium ? data.medium : "N/A"} <br/><br/>
            <Link href = {`/artwork/${data.objectID}`} passHref><Button variant="outline-primary"><strong>ID: </strong> {data.objectID}</Button></Link>
            </Card.Text>
            
        </Card.Body>
        </Card>
    )
    return null
    
}