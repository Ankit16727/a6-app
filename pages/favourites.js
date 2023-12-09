import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites(){
    const [favouritesList] = useAtom(favouritesAtom)
    if(!favouritesList) return null;

    return (
        
        <Row className="gy-4"> 
            {favouritesList.length > 0 ? 
            
                favouritesList.map((objID)=>
                    <Col lg={3} key={objID}><ArtworkCard objectID={objID} /></Col>
                )
            : 
                <Card>
                <Card.Body>
                    <Card.Title>Nothing here</Card.Title>
                    <Card.Text>
                        Try adding some new artwork to the list.
                    </Card.Text>
                </Card.Body>
                </Card>
            }
        
        
        </Row>

        
        
    )
    
}