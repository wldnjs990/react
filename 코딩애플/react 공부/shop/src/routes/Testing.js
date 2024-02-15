import { useState, useTransition, useDeferredValue} from "react";


const Testpage = 
function(){

    let [name, setname] = useState('')
    let arr = new Array(10000).fill(0)
    let [isPending, startTransition] = useTransition()
    let state = useDeferredValue(name)

    return(
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
    )
}

export default Testpage