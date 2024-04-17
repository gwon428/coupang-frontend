import { useEffect, useState } from "react";
import { getProduct } from "../api/Product";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Div = styled.div`
    .product-info {
        display:flex;
        img{
            width: 50%;
            margin-right: 20px;
        }
        div{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

`;
const Detail = () => {
    const [product, setProduct] = useState({});
    const {code} = useParams();
    const [user, setUser] = useState({});

    const info = useSelector((state) => {
        return state.user;
      });
    
    const productAPI = async () => {
        const response = await getProduct(code);
        setProduct(response.data);
    };

    useEffect(() => {
        productAPI();
        // 0인 경우
        if(Object.keys(info).length === 0){
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            // 아닌 경우
            setUser(info);
        }
        // console.log(Object.keys(info).length);
        // console.log(info);
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return(
    <Div>
       <div className="product-info">
            <img src={product.prodPhoto?.replace("D:", "http://localhost:8081")}/>
                <div>
                    <p>이름 : {product.prodName}</p>
                    <p>가격 : {product.price}</p>
                </div>
        </div> 
    </Div>)
};

export default Detail;