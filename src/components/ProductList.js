import { getProducts } from "../api/Product";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledProduct =styled.div`
  display: flex;
  margin-bottom: 50px;

  img{
    width: 70%;
  }

  div{
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // 페이지 관련
  const [loading, setLoading] = useState(false);
  
  const productsAPI = async () => {
    setLoading(true);
    const response = await getProducts(page);
    const newData = response.data;
    setProducts((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };
  useEffect(() => {
    const scroll = () => {
    //   console.log("window.innerHeight : " + window.innerHeight);
    //   console.log("scrollTop : " + document.documentElement.scrollTop);
    //   console.log("offSetHEight :" + document.documentElement.offsetHeight);

    //   console.log (window.innerHeight + document.documentElement.scrollTop >=
    //   document.documentElement.offsetHeight);

      if(window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight && !loading){
            productsAPI();
        }
    };
    window.addEventListener("scroll", scroll);
    return () => {
        window.removeEventListener("scroll", scroll);
    };
  }, [page]);

  const detail = (code) => {
    // Detail 컴포넌트로 이동
    navigate("/" + code);
  };

  return (
    <section className="category-best container">
      {products.map((product) => (
        <StyledProduct key={product.prodCode} onClick={() => detail(product.prodCode)}>
        <img src={product.prodPhoto?.replace("D:", "http://localhost:8081")}/>
          <div>
            <h2>{product.prodName}</h2>
            <p>{product.price}</p>
          </div>
        </StyledProduct>
      ))}
    </section>
  );
};
export default ProductList;