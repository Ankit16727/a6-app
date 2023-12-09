import { useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {Error} from 'next/error'
import Pagination from 'react-bootstrap/Pagination'
import { Col, Row } from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'
import Card from 'react-bootstrap/Card'
import validObjectIDList from '@/public/data/validObjectIDList.json'


export default function Artwork(){
    const PER_PAGE = 12
    const [artworkList, setArtworkList] = useState(null)
    const [page, setPage] = useState(1)

    function nextPage(){
        if(page < artworkList.length){
            setPage(page + 1)
        }
    }

    function previousPage(){
        if(page > 1){
            setPage(page - 1)
        }
    }

    

    const router = useRouter()
    let finalQuery = router.asPath.split('?')[1]

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
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher)

        

    useEffect(() => {
        
        if(data != null){
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x))
            let results = []
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) { 
                const chunk = filteredResults.slice(i, i + PER_PAGE); 
                results.push(chunk); 
              }
              setArtworkList(results); 
        }
        setPage(1)
    }, [data])

    if (error) return <Error statusCode = {404}/>
    if (artworkList != null){
        return (
            <>
            <Row className="gy-4"> 
                {artworkList.length > 0 ? 
                
                    artworkList[page - 1].map((objID)=>
                        <Col lg={3} key={objID}><ArtworkCard objectID={objID} /></Col>
                    )
                : 
                    <Card>
                    <Card.Body>
                        <Card.Title>Nothing here</Card.Title>
                        <Card.Text>
                            Try searching for something else.
                        </Card.Text>
                    </Card.Body>
                    </Card>
                }
            
            
            </Row>

            {artworkList.length > 0 ? 
            <Row>
                <Col>
                    <Pagination>
                    <Pagination.Prev onClick={previousPage}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage}/>
                    </Pagination>
                </Col>
            </Row>
            : null}
            </>
        )
    }else{  
        return null
    }


}