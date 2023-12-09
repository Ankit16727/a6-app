import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { ListGroup, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import styles from '@/styles/History.module.css'
import { removeFromHistory } from "@/lib/userData";
export default function History(){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter()

    if(!searchHistory) return null;
    // Parsed History
    let parsedHistory = []; 
    searchHistory.forEach(h => { 
        let params = new URLSearchParams(h); 
        let entries = params.entries(); 
        parsedHistory.push(Object.fromEntries(entries)); 
    }); 


    // historyClicked
    function historyClicked(e, index){
        
        router.push(`/artwork?${searchHistory[index]}`)
    }

    // removeHistoryClicked
    async function removeHistoryClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events 
        setSearchHistory(await removeFromHistory(searchHistory[index]))
    }
    
    // Rendering part
    return (
        parsedHistory.length > 0 ?
        <ListGroup>
            {parsedHistory.map((historyItem, index)=>
                <ListGroup.Item className = {styles.historyListItem} key = {index} onClick={(event)=> historyClicked(event,index)}>
                    {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))} 
                    <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                </ListGroup.Item>
            )}   
        </ListGroup>
        


        :

        <Card>
            <Card.Body>
                <Card.Title>Nothing Here</Card.Title>
                <Card.Text>
                    Try searching for some artwork.
                </Card.Text>
            </Card.Body>
        </Card>

    )

}