/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {

  let post = '강남 우동 맛집';
  let [글제목, 글제목함수] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])
  let [좋아요, 좋아요함수] = useState([0, 0, 0])
  let [modal, setmodal] = useState(false)
  let [color, setcolor] = useState(['yellow', 'grey', 'blue'])
  let [idx, setidx] = useState(0)
  let [입력값, 입력값변경] = useState('');

  function 글제목기능(a){
    if(글제목[a] == '여자 코트 추천'){
      let new글제목 = [...글제목]; 
      new글제목[a] = '남자 코트 추천';
      글제목함수(new글제목);
    } else if(글제목[a] == '남자 코트 추천'){
      let new글제목 = [...글제목]; 
      new글제목[a] = '여자 코트 추천';
      글제목함수(new글제목);
    }
  }

  function 좋아요기능(a){
    let new좋아요 = [...좋아요];
    new좋아요[a] = new좋아요[a] + 1;
    좋아요함수(new좋아요);
    console.log(좋아요)
  }

  function 가나다정렬기능(){
    let new글제목 = [...글제목];
    new글제목.sort();
    글제목함수(new글제목);
  }

  function 모달창여닫기기능(a){
    if(modal == false){
      setmodal(true)
    }
    else if(modal == true && idx == a){
      setmodal(false)
    }
  }
  function 메뉴추가기능(){
    if(입력값 !== ''){
      let copy = [...글제목];
      copy.push(입력값); 
      글제목함수(copy);
      let copy2 = [...좋아요];
      copy2.push(0);
      좋아요함수(copy2);
    }
  }
  function 글제목삭제기능(a){
      let copy = [...글제목];
      copy.splice(a, 1);
      글제목함수(copy);
      let copy2 = [...좋아요];
      copy2.splice(a, 1);
      좋아요함수(copy2);
      console.log(좋아요)
      a--;
  }
  return (
    <div className="App">
      <div>
        <h4 className='black-nav'> 블로그임 </h4>
      </div>
      <button onClick={가나다정렬기능}>가나다 정렬</button>
      {
        글제목.map(function(a, i){
          return (
            <div className='list' key={i}>
              <h4 onClick={function(){ 모달창여닫기기능(i); setidx(i)}}>{ 글제목[i] }<span onClick={function(e){e.stopPropagation(); 좋아요기능(i)}}>👍</span>{좋아요[i]}</h4>
              <p onClick={function(){글제목기능(0)}}>2월 17일 발행</p>
              <button onClick={()=>{글제목삭제기능(i);}}>삭제</button>
            </div>
          )
        })
      }
      <h4 id={post} style = { {color : 'red', fontSize : '20px'} }>{ post }</h4>
      <input onChange={(e)=>{입력값변경(e.target.value)}}></input>
      <button onClick={메뉴추가기능}>메뉴 추가하기</button>

      {
        modal == true ? <Modal 글제목 = {글제목} idx = {idx} color = {color} 글제목기능 = {글제목기능}/> : null
      }
    </div>
  );
}


function Modal(props){

  return(
      <div className='modal' style={{background : props.color[0]}}>
        <h4>{ props.글제목[props.idx] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={function(){props.글제목기능(0)}}>글수정</button>
      </div>
  );
}
export default App;
