import { useState, useTransition, useDeferredValue, useEffect} from "react";


const Testpage = 
function(){

    let [name, setname] = useState('')
    let arr = new Array(10000).fill(0)
    let [isPending, startTransition] = useTransition()
    let state = useDeferredValue(name)

    // async(동기 / 비동기 처리 방식) 예시
    let [count, setcount] = useState(0)
    let [age, setage] = useState(20)
    useEffect(()=>{
        if(count !== 0 && count < 3){
            setage(age + 1);
        }
    },[count]);
    return(
        <div>
            <div>
                {name}
                <input onChange={(e)=>{ 
                    startTransition(()=>{
                        setname(e.target.value)  
                    })
                }}></input>
                <div>
                    {
                        isPending ? '로딩중' :
                        arr.map((a, i)=>{
                            return <div key={i}>{state}</div>
                        })
                    }
                </div>
            </div>
            <div>
                <div>안녕하십니까 전 {age}</div>
                <button onClick={()=>{
                    setcount(count + 1);
                }}>누르면한살먹기</button>
            </div>
        </div>
    )
}

export default Testpage