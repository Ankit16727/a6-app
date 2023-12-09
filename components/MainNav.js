import {Container, Form, Nav, Navbar, Button, NavDropdown} from "react-bootstrap" 
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import Link from "next/link"
import { addToHistory } from "@/lib/userData";
import { removeToken } from "@/lib/authenticate";
import { readToken } from "@/lib/authenticate";
export default function MainNav(){
   
    const router = useRouter();
    let token = readToken()
    const [searchValue, setSearchValue] = useState('');

    const [isExpanded, setExpanded] = useState(false);

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    async function submitForm(e) {
        e.preventDefault() // prevent the browser from automatically submitting the form
        setExpanded(false)
        let queryString  = `title=true&q=${searchValue}`
        setSearchHistory(await addToHistory(`title=true&q=${searchValue}`))
        setSearchValue('')
        router.push(`/artwork?${queryString}`)
    }

    function navClick(){
      setExpanded(false)
    }

    function toggleClick(){
      setExpanded(!isExpanded)
    }

    function logOut(){
      setExpanded(false)
      removeToken()
      router.push("/login")
    }

    return (
    <>
    <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded = {isExpanded}>
      <Container>
        <Navbar.Brand>Ankit Thapar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleClick}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href = "/" passHref legacyBehavior><Nav.Link onClick={navClick} active = {router.pathname === "/"}>Home</Nav.Link></Link>
            {token && <Link href= "/search" passHref legacyBehavior><Nav.Link onClick={navClick} active = {router.pathname === "/search"}>Advanced Search</Nav.Link></Link>}
          </Nav>
          { !token &&
          <Nav>
          <Link href = "/register" passHref legacyBehavior><Nav.Link onClick={navClick} active = {router.pathname === "/register"}>Register</Nav.Link></Link>
          <Link href = "/login" passHref legacyBehavior><Nav.Link onClick={navClick} active = {router.pathname === "/login"}>Login</Nav.Link></Link>
          </Nav>
          }
          &nbsp;
          {token &&
          <Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              value={searchValue}
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button variant="success" type = "submit">Search</Button>
          </Form>
          }
          &nbsp;
          {token &&
          <Nav>
            <NavDropdown title={token.userName}>
                <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item onClick = {navClick} >Favourites</NavDropdown.Item></Link>
                <Link href="/history" passHref legacyBehavior><NavDropdown.Item onClick = {navClick} >Search History</NavDropdown.Item></Link>
                <NavDropdown.Item onClick = {logOut} >Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/><br/>
    </>

    )

}