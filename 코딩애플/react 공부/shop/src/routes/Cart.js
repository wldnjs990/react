import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeCount , setcount, deletobject} from "./../store";

function Cartpage(){

    let a = useSelector((state) => state);
    let dispatch = useDispatch()

    return(
        <div>
            {a.user[0].name + a.user[0].count}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>수량 추가</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        a.products.map((e, i)=>{
                            return(
                                <tr key={i}>
                                    <td>{"no." + i}</td>
                                    <td>{a.products.find(e => e.id == a.products[i].id).title}</td>
                                    <td>{a.products.find(e => e.id == a.products[i].id).count}</td>
                                    <td>
                                        <button onClick={() => {
                                            return(
                                                dispatch(setcount(i))
                                                )
                                        }}>+</button>
                                    </td>
                                    <td>
                                        <button onClick={()=>{
                                            return(
                                                dispatch(deletobject(i))
                                            )
                                        }}>X</button>
                                    </td>
                                </tr>
                            )  
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default Cartpage;