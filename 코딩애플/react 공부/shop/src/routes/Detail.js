/* eslint-disable */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {Context1} from "./../App.js"
import { plusobject } from "./../store.js";
import { useDispatch, useSelector } from "react-redux";

// styled-components
  let Yellowbtn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'yellow' ? 'black' : 'white'};
  paddind : 10px;
`
  let Greydiv = styled.div`
  background : grey;
  padding : 20px;
  color : white;
  display : block;
  `
  let Uidiv = styled.div`
  width : 100%;
  height : 250px;
  background : ${props => props.bg};
  `

  let Inputbox = styled.input`
  width : 100%;
  `
  let Alertbox = styled.span`
  color : red;
  `



/* 상세페이지 */
const Detailpage =
function (props){
  let {context} = useContext(Context1); //useContext는 context로 가져온 state들을 풀어주는 역할을 함
  //context파일 가져온 내용물 열고 변수로 저장하기
  let [blink, setblink] = useState('blink-off')
  // detail 페이지 업로드시 깜빡거리는 애니메이션 만들기
  let dispatch = useDispatch()
  // Redux dispatch 사용하기(이거 붙여야 redux에서 만든 state 쓸 수 있음)
  let a = useSelector(state => state)
  // useSelector 사용하기


    useEffect(()=>{
      setTimeout(() => {
        setblink('blink-on')
      }, 10);
      return(
        setblink('blink-off')
      )
    }, [])

  let {pagenum} = useParams();
  let [shoes, setshoes] = useState(props.shoes)
  let pageobj = shoes.find(function(e){return e.id === Number(pagenum)}); // object의 id 숫자가 useParams로 가져온 숫자와 동일한 object 가져오기
  let idx = Number(pagenum) + 1; // 애플쌤이 사진번호를 0번부터 시작 안해서 useParams 숫자에 += 1 하는 변수 하나 만듬
  // 팝업창 띄우기
  let [greytrigger,setgreytrigger] = useState(true)
  //input 숫자만표시 경고창
  let [inputkey, setinputkey] = useState()
  let [inputtrigger, setinputtrigger] = useState(false)
  // 동적인UI팝업창 열기
  let [uitrigger, setuitrigger] = useState("none")
  
    //useEffect 2초 후에 사라지는 창 만들기
    useEffect(()=>{
      let a = setTimeout(function(){setgreytrigger(false)}, 2000)
      console.log("useEffect 클로저에 작성된 문구")
      return ()=>{
        clearTimeout(a) //clearTimeout == 타이머 설정해놓은 것들 지우기
        console.log("useEffect return 클로저에 작성된 문구")
      } 
    }, [greytrigger])  
    //useEffect

    //useEffect input 숫자가 아닐시 경고문 띄우기
    useEffect(()=>{
      if(isNaN(Number(inputkey))){
        return (
          setinputtrigger(true)
        )
      } else {
          setinputtrigger(false)
      }
    }, [inputkey])
    //useEffect input 숫자가 아닐시 경고문 띄우기

    return(
      <div className={`"container" ${blink}`}>
        <div className="row"> 
          <div className="popup">
            <Greydiv>
              <Yellowbtn bg="red" onClick={()=>{return setgreytrigger(true)}}>버튼</Yellowbtn>
            </Greydiv>
            {
              greytrigger == true ? <Greydiv className="delete">2초 뒤에 문 닫습니다.</Greydiv> : null
            }  
          </div>
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes" + idx + ".jpg"} width="100%" />
            <div className="input-box">
              {
                inputtrigger == true ? <Alertbox>숫자만 입력하시오</Alertbox> : null
              }
              <Inputbox onChange={(e)=>{setinputkey(e.target.value.replace(/ /g, ""))}}></Inputbox>
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{pageobj.title}</h4>
            <p>{pageobj.content}</p>
            <p>{pageobj.price}</p>
            <button className="btn btn-danger" onClick={()=>{
              {
                console.log(a.products.find(e => e.id == pageobj.id) == undefined)
                a.products.find(e => e.id == pageobj.id) == undefined ? dispatch(plusobject(pageobj)) :  null
                // store.js에 있는 products state중 해당페이지에 object의 id(pageobj.id)번호와 일치하는 object를 찾아보고 만약에 undefind가 나온다면 해당 pageobj의 object내용을 redux기능인 dispatch를 통해 store.js에 state를 수정해서 추가 해라.
              }
            }}>주문하기</button>      
          </div>
        </div>
        <div className="tab" style={{marginTop : "10px"}}>
              <div className="ui-btn">
                <Yellowbtn bg="yellow" onClick={()=>{
                  if(uitrigger == 0){
                    setuitrigger("none")
                  } else {
                    setuitrigger(0)
                  }
                }} >1</Yellowbtn>
                <Yellowbtn bg="green" onClick={()=>{
                  if(uitrigger == 1){
                    setuitrigger("none")
                  } else {
                    setuitrigger(1)
                  }
                  }}>2</Yellowbtn>
                <Yellowbtn bg="blue" onClick={()=>{
                  if(uitrigger == 2){
                    setuitrigger("none")
                  } else {
                    setuitrigger(2)
                  }
                  }}>3</Yellowbtn>
              </div>
              <Uicontent shoes={shoes} uitrigger = {uitrigger}/>
        </div>
      </div>
    )
  };
  

  // 동적인 UI if문 function
  function Uicontent({uitrigger, shoes}){

    let [show, setshow] = useState('')
    useEffect(()=>{

      let time = setTimeout(() => {
        setshow("show")
      }, 10);

      return(()=>{
        clearTimeout(time)
        setshow('')
      }) 
    },[uitrigger])
    return(
      <div className={`ui-contents ${show}`}>
        {
          [<Uidiv bg="yellow">{shoes[0].title}</Uidiv>, <Uidiv bg="green">{shoes[1].title}</Uidiv>, <Uidiv bg="blue">{shoes[2].title}</Uidiv>][uitrigger]
        }
      </div>
    )
    }
  // 동적인 UI if문 function
  

  /* //상세페이지 */
  export default Detailpage;