import ProductList from "../components/ProductList";

const Main = () => {
    return <>
    <img
    src="https://static.coupangcdn.com/ha/cmg_paperboy/image/1702979045489/C1-PC1.jpg"
    alt=""
    className="main-img-active"
  />
  <img
    src="https://image10.coupangcdn.com/image/ccm/banner/22ab75b623ae1fbe7db2446870d6e256.jpg"
    alt=""
  />
  <img
    src="https://static.coupangcdn.com/va/cmg_paperboy/image/1702617095967/Untitled-3.jpg"
    alt=""
  />

<section className="discovery-list container">
  <h2>오늘의 발견 <span> | 오늘 쿠팡이 엄선한 가장 HOT한 제품!</span></h2>
  <div className="discovery-list-items">
    <a href=""
      ><img
        src="https://static.coupangcdn.com/pa/cmg_paperboy/image/1702336886369/C2-1-%E1%84%91%E1%85%B5%E1%86%AF%E1%84%85%E1%85%B5%E1%86%B8%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A1.jpg"
        alt=""
    /></a>
    <a href=""
      ><img
        src="https://static.coupangcdn.com/ja/cmg_paperboy/image/1702336879265/C2-2-%E1%84%8B%E1%85%A2%E1%84%80%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%A5%E1%86%B8.jpg"
        alt=""
    /></a>
    <a href=""
      ><img
        src="https://static.coupangcdn.com/da/cmg_paperboy/image/1702336908873/C2-3-%E1%84%8B%E1%85%B2%E1%84%92%E1%85%A1%E1%86%AB%E1%84%92%E1%85%AC%E1%84%89%E1%85%A1-%E1%84%8B%E1%85%B184.jpg"
        alt=""
    /></a>
    <a href=""
      ><img
        src="https://static.coupangcdn.com/pa/cmg_paperboy/image/1702336924563/C2-4-%E1%84%8C%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A6%E1%86%A8%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8C%E1%85%A1.jpg"
        alt=""
    /></a>
    <a href=""
      ><img
        src="https://static.coupangcdn.com/xa/cmg_paperboy/image/1702336940639/C2-5-%E1%84%82%E1%85%A6%E1%84%8E%E1%85%B2%E1%84%85%E1%85%A5%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%E1%85%B3.jpg"
        alt=""
    /></a>
    <a href=""
      ><img
        src="https://static.coupangcdn.com/ea/cmg_paperboy/image/1702888199614/C2-6-%E1%84%8B%E1%85%B5%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%AE.jpg"
        alt=""
    /></a>
  </div>
</section>

<ProductList/>
</>
}

export default Main;