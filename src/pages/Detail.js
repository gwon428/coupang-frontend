import { useEffect, useState } from "react";
import { getProduct } from "../api/Product";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { addReview, getReview, delReview, updateReview } from "../api/review";

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
    .review-contents{
        margin-top: 30px;
        .review-content{
            margin-top: 15px;
        img{
            width: 200px;
        }
        .btn-container{
            display: flex;
            justify-content: flex-end;

            button{
                margin-left: 5px;
            }
        }
    }
    }
`;

const Detail = () => {
    const [product, setProduct] = useState({});
    const {code} = useParams();
    const [user, setUser] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [images, setImages] = useState([]);
    const [reviews, setReview] = useState([]);
    // 조건 걸어야하니까 null
    const [edit, setEdit] = useState(null);

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
        ReviewAPI();
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
        formData.append("reviTitle", title);
        formData.append("reviDesc", desc);

        // 배열 형태로 들어감
        // 반복문 필수 !!!!
        images.forEach((image, index) => {
            // index : files의 몇번째냐!
            formData.append(`files[${index}]`, image);
        });
        // formData.append("files", images);

        await addReview(formData);
        
        // CSS로 스타일링하면 비워져있지 않은 것처럼 보이지만 비워져있는 상태임!
        // 브라우저 보안상 문제
        setImages([]);

        setTitle("");
        setDesc("");
        
        ReviewAPI();
    };

    // 수정할 때도 쓰일 함수 선언
    const imageChange = (e) => {
        // console.log(e.target.files);
        const files = Array.from(e.target.files);
        setImages(files);
    };

    // useEffect(() => {
    //     console.log(images);
    // }, [images]);

    // 리뷰 가져오기
    const ReviewAPI = async() => {
        const response = await getReview(code);
        let reviews = response.data;
        setReview(reviews);
    };

    const onUpdate = async(review) => {
        setEdit(review);    // 편집하려고 하는 정보를 담음
        // await setReview(review);
    };

    // useEffect(() => {
    //     console.log(edit);
    // }, [edit]);

    const onDelete = async(reviCode) => {
        await delReview(reviCode);
        // 삭제 후 다시 세팅 (받은 no와 같지 않은 번호들로 리스트를 다시 만들어서)
        // setReview(reviews.filter((review) => review.reviCode !== reviCode));
        ReviewAPI();
    };

    const deleteImage = (code) => {
        setEdit((prev) => {
            const images = prev.images.filter((image) => image.reviImgCode !== code);
            return {...prev, images: images};
        });
    }

    const cancel = () => {
        setEdit(null);
    }

    const reviewUpdate = async() => {
        // FormData 방식으로 전달
        const formData = new FormData();

        // append로 필요한 값들 추가해야 하는 것
        formData.append("reviCode", edit.reviCode);
        formData.append("reviTitle", edit.reviTitle);
        formData.append("reviDesc", edit.reviDesc);

        // 새로 추가된 게 있을 때 !
        images.forEach((image, index) => {
            // index : files의 몇번째냐!
            formData.append(`files[${index}]`, image);
        });
        formData.append("id", user.id);
        formData.append("prodCode", code);
        edit.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image.reviUrl);
        })

        // updateReview <-- formData 값 전달
        await updateReview(formData);

        // images 비울 것, edit 비울 것
        setImages([]);
        setEdit(null);

        // review 다시 호출
        ReviewAPI();
    };

    return(
    <Div>
       <div className="product-info">
            <img src={product.prodPhoto?.replace("D:", "http://localhost:8081")}/>
                <div>
                    <h2>{product.prodName}</h2>
                    <h2>{product.price}</h2>
                </div>
        </div> 
        <div className="review-add" >
            <Form.Control type="file" multiple accept="image/*" onChange={imageChange}/>
            <Form.Control type="text" placeholder="제목 작성" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <Form.Control as="textarea" placeholder="글 작성" value={desc} onChange={(e) => setDesc(e.target.value)} />
           
            <Button onClick={reviewSubmit}>리뷰 작성</Button>
        </div>
        <div className="review-contents">
            {reviews.map((review) => (
                <div key={review.reviCode} className="review-content">
                    {/* 해당 리뷰를 수정하는 상황 */}
                    {edit?.reviCode === review.reviCode 
                    ? (
                        <>
                        {/* 기존 사진 삭제 */}
                            {edit.images.map((image) => (
                                <img key={image.reviImgCode} 
                                src={image.reviUrl.replace("D:", "http://localhost:8081")} 
                                onClick={() => {deleteImage(image.reviImgCode)}}/>
                            ))}
                            <Form.Control type="file" accept="image/*" multiple onChange={imageChange}/>
                            <Form.Control type="text" value={edit.reviTitle}
                                onChange={(e) => setEdit((prev) => ({...prev, reviTitle: e.target.value}))}/>
                            <Form.Control as="textarea" value={edit.reviDesc}
                                onChange={(e) => setEdit((prev) => ({...prev, reviDesc: e.target.value}))}/>

                            <div className="btn-container">
                                <Button variant="warning" onClick={reviewUpdate}>완료</Button>
                                <Button variant="danger" onClick={cancel}>취소</Button>

                            </div>
                        </>
                    ) 
                    : 
                    (<>
                        {review.images?.map((image) =>
                            (<img key={image.reviImgCode} src={image.reviUrl.replace("D:", "http://localhost:8081")} />
                            ))}
                        <h4>{review.reviTitle}</h4>
                        <p>{review.reviDesc}</p>

                        <div className="btn-container">
                        {/* onUpdate(review) : 기존 정보를 넘김! */}
                        <Button variant="warning" onClick={() => onUpdate(review)}>
                            수정</Button>
                        <Button variant="danger" onClick={() => onDelete(review.reviCode)}>삭제</Button>
                        </div>
                    </>)
                    }
                </div>
            ))}
        </div>
    </Div>
    );
};

export default Detail;