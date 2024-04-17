import { useEffect, useState } from "react";
import { getProduct } from "../api/Product";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { addReview, getReviews } from "../api/review";

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

    .review-add {
        border: 1px solid gray;
        margin-top: 20px;

        input {
            margin-bottom: 10px;
        }
        textarea{
            resize: none;
            margin-bottom: 10px;
        }
    }
`;

const Detail = () => {
    const [product, setProduct] = useState({});
    const {code} = useParams();
    const [user, setUser] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

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

    const reviewSubmit = async() => {
        // form 태그를 사용하지 않고 보낼 때
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("prodCode", code);

        // 입력 받는 텍스트
        formData.append("reviTitle");
        formData.append("reviDesc");


        formData.append("files");

        await addReview(formData);
    };

    return(
    <Div>
       <div className="product-info">
            <img src={product.prodPhoto?.replace("D:", "http://localhost:8081")}/>
                <div>
                    <p>이름 : {product.prodName}</p>
                    <p>가격 : {product.price}</p>
                </div>
        </div> 
        <div className="review-add" >
            <Form.Control type="file" multiple accept="image/*" />
            <Form.Control type="text" placeholder="제목 작성"/>
            <Form.Control as="textarea" placeholder="글 작성"/>
            <Button onClick={reviewSubmit}>리뷰 작성</Button>
        </div>
    </Div>
    )
};

export default Detail;