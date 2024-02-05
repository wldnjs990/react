/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import logo from './logo.svg';
import "./App.css"
import { createContext, useEffect, useState } from 'react';
import img from '../src/cat4.jpg';
import {a, b, c, d} from "./data.js";
import data from "./data.js";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detailpage from './routes/Detail.js';
import Cartpage from './routes/Cart.js'
import axios from "axios";
import styled from 'styled-components';

export let Context1 = createContext()
// react로부터 Context함수 가져오기(Context함수는 state 보관함임)


function App() {
  let [shoes, setshoes] = useState(data)
  let [context, setcontext] = useState([10, 11, 12])
  let navigate = useNavigate()

    return (
      <div className="App">

        {/* 네비게이션 바 */}
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">쇼핑몰</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>{a}</Nav.Link>
            <Nav.Link onClick={() => {navigate('/Detail/0')}}>{b}</Nav.Link>
            <Nav.Link onClick={() => {navigate('/About')}}>{c}</Nav.Link>
            <Nav.Link onClick={() => {navigate('/Cart')}}>{d}</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        {/* 네비게이션 바 */}
  
        {/* 페이지 관리 */}
        <Routes>

          <Route path='/' element={<Mainpage shoes = {shoes}/>}></Route>

          <Route path='/Detail/:pagenum' element={
            <Context1.Provider value={{context}}>
              <Detailpage shoes = {shoes}/>
            </Context1.Provider>
          }></Route>

          <Route path='/About' element={<Aboutpage/>}>
              <Route path='members' element={<div>직원정보</div>}></Route>
              <Route path='location' element={<div>위치정보</div>}></Route>
          </Route>

          <Route path='/Homework' element={<Homework/>}>
              <Route path='work1' element={<h5>1번 메뉴</h5>}></Route>
              <Route path='work2' element={<h5>2번 메뉴</h5>}></Route>
          </Route>

          <Route path='/Cart' element={<Cartpage/>}></Route>

          <Route path='*' element={<div>하하 주소를 잘못 입력했다구(404에러)</div>}></Route>
        </Routes>
        {/* 페이지 관리 */}

      </div>
    );
  
}
/* 메인페이지 */
function Mainpage(props){
  let [shoes, setshoes] = useState(props.shoes)
  let [count, setcount] = useState(0); // 물품 더보기 count
  let [loadingtrigger, setloadingtrigger] = useState(false)
  let Loading = styled.div`
  width : 200px;
  height : 100px;
  background : #fff;
  display : block;
  position : fixed;
  top : 50%;
  left : 50%;
  transform : translate(-50%, -50%);
  text-align : center;
  line-height : 100px;
  `
    return(
      <>
      {loadingtrigger == true ? <Loading>로딩중입니다..</Loading> : null}
      <div className='main-bg' style={{height : '300px', backgroundSize : 'cover' ,backgroundImage : 'url(' + img + ')'}}> </div>
      <div className='product-list'>
          {
            shoes.map(function(a, i){
              let findobj = shoes.find(function(a){return a.id == i})
              // shoes array에서 Detail페이지 번호에 해당하는 id값을 가진 object찾기
              console.log(i)
              return(
                <div className='product' key={i}>
                  {/*이것도 페이지 정렬이 발생했을때 해당 상품의 id값을 따라 URL파라미터가 붙을 수 있게 만들어야 한다.(아직 못만듬)*/}
                  <Productlist findobj = {findobj} e = {findobj.id + 1} i = {i}></Productlist>
                </div>
              )
            })
          }
      </div>
      <button style={{alignItems : "center"}} onClick={()=>{ 
        if(count == 0){
          // 서버에서 데이터 받아와서 상품목록 추가시키기
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{
            setloadingtrigger(false)
            // 로딩창 끄기
            let data = result.data;
            let newshoes = [...shoes];
            newshoes.push(...data);
            setshoes(newshoes);
          })
          .catch(()=>{
            setloadingtrigger(false)
            // 로딩창 끄기
            alert("서버통신에 실패했음")
          })

          
          setcount(1)
          // 카운트 늘리기
        }
        else if(count == 1){
          console.log('실행')
          axios.get('https://codingapple1.github.io/shop/data3.json')
          .then((result)=>{
            setloadingtrigger(false)
            // 로딩창 끄기
            let data = result.data;
            let newshoes = [...shoes];
            newshoes.push(...data);
            setshoes(newshoes);
          })
          .catch(()=>{
            setloadingtrigger(false)
            // 로딩창 끄기
            alert("서버통신에 실패했음")
          })

          setcount(2)
          // 카운트 늘리기
        } else if(count == 2){
          axios.get('NONO')
          .then((result)=>{
          })
          .catch(()=>{
            alert("마지막 페이지입니다.")
            setloadingtrigger(false)
            // 로딩창 끄기
          })
        }
        
        // 로딩중 창 띄우기
        return(
          setloadingtrigger(true)
        )
      }}>더보기</button>
      </>
    )
}
// 메인페이지 상품 데이터바인딩
function Productlist(props){
    let [i, seti] = useState(props.i)
    let [e, sete] = useState(props.e)
    let [findobj, setfindobj] = useState(props.findobj)
    let navigate = useNavigate()
      return(
        <>
          <img src={"https://codingapple1.github.io/shop/shoes"+ e +".jpg"} onClick={() => {navigate('/Detail/' + i)}}></img>
          <h4>{ findobj.title }</h4>
          <p style={{marginTop : "10px"}}>{ findobj.price }</p>
        </>
      )
}
/* //메인페이지 */

/* about 페이지 */
function Aboutpage(){
  return(
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
}
/* //about 페이지 */

/* Nested Routes 페이지 만들어보기 숙제 */
function Homework(){
  return(
    <div>
      <h4>숙제페이지 만들어보리기</h4>
      <Outlet></Outlet>
    </div>
  )
}
/* //Nested Routes 페이지 만들어보기 숙제 */



export default App;
