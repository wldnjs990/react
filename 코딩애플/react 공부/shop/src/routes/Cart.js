import { Table } from "react-bootstrap"
import { useSelector } from "react-redux";

function Cartpage(){

    let a = useSelector((state)=>{return state});
    console.log(a.products)

    return(
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        a.products.map((e, i)=>{
                            return(
                                <tr>
                                    <td>1</td>
                                    <td>{a.products[i].name}</td>
                                    <td>{a.products[i].count}</td>
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