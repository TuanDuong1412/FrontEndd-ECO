import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import Slider from 'react-slick';
import {
  WrapperBrandBannerItem,
  WrapperButtonMore,
  WrapperProducts,
  WrapperProductsTextP,
  WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "./../../assets/images/slider1.png";
import uudai1 from "./../../assets/images/banner/1.png";
import uudai2 from "./../../assets/images/banner/2.png";
import uudai3 from "./../../assets/images/banner/3.png";
import uudai4 from "./../../assets/images/banner/4.png";
import sale from "./../../assets/images/hotsale.jpg";
import sale1 from "./../../assets/images/SALE2.jpg";

import slider2 from "./../../assets/images/slider2.png";
import slider3 from "./../../assets/images/slider3.png";
import slider4 from "./../../assets/images/slider4.png";
import slider5 from "./../../assets/images/slider5.png";
import slider6 from "./../../assets/images/slider6.png";
import bannerphu from "./../../assets/images/bannerphu.png";

import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useQuery } from "react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useReducer } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { useLocation } from "react-router-dom";
import { Image } from "antd";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const {state} = useLocation()
 


  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [typeProducts, setTypeProducts] = useState([]);

  const fetProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products",limit, searchDebounce], fetProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  const {
    data: producted,
  
  } = useQuery(["products", searchDebounce], fetProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

 const fetchProductType = async(type)=>{
  const res = await  ProductService.getProductType(type)
  return res
 }
 useEffect(()=>{
  if(state){
      fetchProductType(state)
  }
},[state])
    const iPhoneProducts = producted?.data?.filter((product) => product.type === "IP")
    const laptopProducts =producted?.data?.filter((product) => product.type === "Laptop")
    
    const samSungProducts =producted?.data?.filter((product) => product.type === "Samsung")
    const clockProducts =producted?.data?.filter((product) => product.type === "Đồng hồ thông minh")
    const saleProducts =producted?.data?.filter((product) => product.discount >= 10)
   

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6 , // Số sản phẩm hiển thị trên mỗi slide
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed:1000
    };

   
  return (
    <Loading isLoading={isLoading || loading}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        className="body"
        style={{ width: "100%", backgroundColor: "#efefef" }}
      >
        <div
          id="container"
          style={{
            height: "auto",
            width: "1270px",
            margin: "0 auto",
            marginBottom: "20px",
          }}
        >
          <SliderComponent
            arrImages={[slider1, slider2, slider3, slider4, slider5, slider6]}
          />
          <div style={{backgroundColor: "#33FFFF",padding:'5px',marginTop:'20px'}}>

          <WrapperProducts>
            {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
              textbutton={isPreviousData ? "Load more" : "Xem thêm"}
              type="outline"
              styleButton={{
                border: "1px solid rgb(11,116,229)",
                color: `${
                  products?.total === products?.data?.length
                    ? "#ccc"
                    : "rgb(11,116,229)"
                }`,
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              styleTextbutton={{
                fontWeight: 500,
                color: products?.total === products?.data?.length && "#fff",
              }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
          <div>
          {/* Phân loại */}
        
            
            <div>
              <div>
                <h2>Ưu đãi thanh toán</h2>
              </div>
              <div style={{display:'flex',gap:'14px'}}>
                <WrapperBrandBannerItem href="">
                  <img src={uudai1} alt="" style={{ maxWidth:' 100%'}}/>
                </WrapperBrandBannerItem>
                <WrapperBrandBannerItem href="">
                  <img src={uudai2} alt="" style={{maxWidth:' 100%'}}/>
                </WrapperBrandBannerItem>
                <WrapperBrandBannerItem href="">
                  <img src={uudai3} alt="" style={{maxWidth:' 100%'}}/>
                </WrapperBrandBannerItem>
                <WrapperBrandBannerItem href="">
                  <img src={uudai4} alt="" style={{maxWidth:' 100%'}}/>
                </WrapperBrandBannerItem>
              </div>
            </div>
            <div></div>
          </div>
          {/* Phân loại */}
         
          <div style={{ backgroundColor: "#CCFFFF", borderRadius: "10px" ,padding:'5px',marginTop:'20px'}}>
            <h2
              style={{
                lineHeight: "24px",
               
                paddingLeft: "20px",
              }}
            >
              Iphone
            </h2>
           <Slider  {...settings} >
              {iPhoneProducts?.map((product) => {
                  return (
                    <CardComponent
                      key={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      selled={product.selled}
                      discount={product.discount}
                      id={product._id}
                    />
                  );
                
              })}
            
           </Slider>
          
          </div>


        {/* / Banner phụ/ */}
        <div style={{marginTop:'20px'}}>
          <a href="">
            <img src={bannerphu} width='100%' height='150px' alt="" />
          </a>
        </div>
        {/* / Banner phụ/ */}

          <div style={{ backgroundColor: "#CCFFFF", borderRadius: "10px" , marginTop:'10px',padding:'5px',marginTop:'20px'}}>
            <h2
              style={{
                lineHeight: "24px",
                
                paddingLeft: "20px",
              }}
            >
             Laptop
            </h2>
            <WrapperProducts>
              {laptopProducts?.map((product) => {
               
                  return (
                    <CardComponent
                      key={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      selled={product.selled}
                      discount={product.discount}
                      id={product._id}
                    />
                  );
                
              })}
            </WrapperProducts>
             </div>
            {/* Hot Sale -----------------------Hot Sale*/}
              
             
              <div style={{ backgroundColor: "#33CCFF", borderRadius: "10px" , marginTop:'20px'}}>
                <div style={{display:'flex'}}>
                  
                  <img src={sale} loading="lazy" style={{height:'170px',width:'100%'}}/>
                  <img src={sale1} style={{height:'170px',width:'100%'}}/>

                </div>

              <div style={{  borderRadius: "10px" , marginTop:'10px',padding:'5px '}}>
                <Slider  {...settings}>
                   {saleProducts?.map((product) => {
                
                    return (
                      <CardComponent
                        key={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        selled={product.selled}
                        discount={product.discount}
                        id={product._id}
                      />
                    );
                  
                })}
                </Slider>          
              </div>
          
            </div>
          {/* Hot Sale -----------------------Hot Sale*/}



          <div style={{ backgroundColor: "#CCFFFF", borderRadius: "10px",padding:'5px',marginTop:'20px' }}>
            <h2
              style={{
                lineHeight: "24px",
               
                paddingLeft: "20px",
              }}
            >
              Đồng hồ thông minh
            </h2>
            
           <Slider {...settings}>
              {clockProducts?.map((product) => {
               
                  return (
                    <CardComponent
                      key={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      selled={product.selled}
                      discount={product.discount}
                      id={product._id}
                    />
                  );
                
              })}
            </Slider>
          </div>
         
        
          <div style={{ backgroundColor: "#CCFFFF", borderRadius: "10px" ,padding:'5px',marginTop:'20px'}}>
            <h2
              style={{
                lineHeight: "24px",
                
                paddingLeft: "20px",
              }}
            >
              Samsung
            </h2>
            
            <Slider {...settings}>
              {samSungProducts?.map((product) => {
               
                  return (
                    <CardComponent
                      key={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      selled={product.selled}
                      discount={product.discount}
                      id={product._id}
                    />
                  );
                
              })}
            </Slider>
          </div>
        </div>
        <FooterComponent></FooterComponent>
      </div>
    </Loading>
  );
};

export default HomePage;
