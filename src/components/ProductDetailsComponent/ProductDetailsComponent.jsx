import { Col, Image, Row, InputNumber, Button, Rate } from "antd";
import React, { useEffect, useState } from "react";

import { StarFilled, PlusOutlined, MinusOutlined,MobileOutlined,CheckCircleTwoTone ,DropboxOutlined } from "@ant-design/icons";
import * as ProductService from "../../services/ProductService";
import Slider from 'react-slick';

import {
  WrapperAddressProduct,
 
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperProducts,
  WrapperQualityProduct,

  WrapperStyleDescriptionProduct,
  
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useQuery } from "react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import FooterComponent from "../FooterComponent/FooterComponent";
import CardComponent from "../CardComponent/CardComponent";
import { orderContant } from "../../contant";

const ProductDetailsComponent = ({ idProduct }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [numProduct, setNumProduct] = useState(1);
  
  const [products, setProducts] = useState([]);
  const { state } = useLocation();
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  //////////////////////////////////
  const [limit, setLimit] = useState(6);
  const fetProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const res = await ProductService.getAllProduct(limit);
    return res;
  };


////////////////
  const onChange = (value) => {
    setNumProduct(Number(value));
  };
  const location = useLocation();
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];

    const res = await ProductService.getDetailsProduct(id);
    return res.data;
  };
 

  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else {
      setNumProduct(numProduct - 1);
    }
  };

  const { isLoading, data: productDetails } = useQuery( ["product-details", idProduct],fetchGetDetailsProduct,{ enabled: !!idProduct });
   
    
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
            discount: productDetails?.discount,
            countInStock: productDetails?.countInStock,
          },
        })
      );
      navigate("/order");
    }
  };
  const handleAddOrderProduct2 = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
            discount: productDetails?.discount,
            countInStock: productDetails?.countInStock,
          },
        })
      );
      
    }
  };
  const {
    isloading: isLoadinged, data: producted } = useQuery(["products"], fetProductAll);


  let  allProducts =[]
  if(productDetails){
    allProducts = producted?.data?.filter((product) => product.type === productDetails.type && product._id!== productDetails._id)
    
  }
   
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
    <Loading isLoading={isLoading }>
      <div>
        <Row
          style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}
        >
          <Col
            span={10}
            style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
          >
            <Image
              src={productDetails?.image}
              alt="image product"
              style={{ width: "500px" }}
            ></Image>
            <div style={{border:'1px solid #e5e7eb',borderRadius:'10px',marginTop:'20px',padding: '10px 10px 0'}}>
              <div >
                <p style={{color: '#4a4a4a',fontSize: '16px',fontWeight: '700',lineHeight: '1.5',marginTop:'0px'}}>Thông tin sản phẩm</p>
              </div>
              <div>
                <div style={{display:'flex'}}>
                  <div><MobileOutlined style={{fontSize:'20px',marginRight:'10px'}}/></div>
                  <div>Mới, đầy đủ phụ kiện từ nhà sản xuất</div>
                </div>
                <div style={{marginTop:'10px',display:'flex'}}>
                  <div><DropboxOutlined style={{fontSize:'20px',marginRight:'10px'}}/></div>
                  <div>Giá sản phẩm đã bao gồm VAT</div>
                </div>
                <div style={{marginTop:'10px',marginBottom:'10px',display:'flex'}}>
                  <div> <CheckCircleTwoTone twoToneColor="#52c41a"style={{fontSize:'20px',marginRight:'10px'}} /></div>
                  <div>1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo hành 12 tháng tại trung tâm bảo hành chính hãng Apple</div>
                </div>
              </div>
            </div>
          </Col>

          <Col span={14} style={{ padding: "10px" }}>
            <WrapperStyleNameProduct>
              {productDetails?.name}
            </WrapperStyleNameProduct>
            <div>
              <Rate
                allowHalf
                defaultValue={productDetails?.rating}
                value={productDetails?.rating}
              />
              <WrapperStyleTextSell>
              
                | Đã bán {productDetails?.selled}
              </WrapperStyleTextSell>
            </div>
            <WrapperPriceProduct>
              <WrapperPriceTextProduct>
                {convertPrice(productDetails?.price)}
              </WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperStyleDescriptionProduct> 
              <h4 style={{marginTop:'0px',marginBottom:'0px'}}>Mô tả sản phẩm</h4>
              {productDetails?.description}
            </WrapperStyleDescriptionProduct>

            <WrapperAddressProduct>
              <span>Giao đến </span>
              <span className="address">{user?.address}</span>
              <span className="address-change"></span>
            </WrapperAddressProduct>
            <div
              style={{
                margin: "10px 0 20px",
                borderTop: "1px solid #e5e5e5",
                borderBottom: "1px solid #e5e5e5",
                padding: "10px 0",
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  lineHeight: "1.6",
                  marginBottom: "10px",
                }}
              >
                Số lượng{" "}
              </div>
              <WrapperQualityProduct>
                <button style={{ border: "none", background: "transparent" }}>
                  <MinusOutlined
                    style={{ color: "#000", fontSize: "20px" }}
                    onClick={() => handleChangeCount("decrease")}
                  />
                </button>
                <WrapperInputNumber
                  onChange={onChange}
                  defaultValue={1}
                  value={numProduct}
                />
                <button style={{ border: "none", background: "transparent" }}>
                  <PlusOutlined
                    style={{ color: "#000", fontSize: "20px" }}
                    onClick={() => handleChangeCount("increase")}
                  />
                </button>
              </WrapperQualityProduct>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <ButtonComponent
                size={40}
                onClick={handleAddOrderProduct}
                styleButton={{
                  background: "rgb(255,57,69)",
                  height: "48px",
                  width: "220px",
                  border: "none",
                  borderRadius: "4px",
                }}
                textbutton={"Mua ngay"}
                styleTextbutton={{ color: "#fff", fontSize: "15px" }}
              ></ButtonComponent>
              <ButtonComponent
                size={40}
                onClick={handleAddOrderProduct2}
                styleButton={{
                  background: "white",
                  height: "48px",
                  width: "220px",
                  border: "1px solid rgb(13, 92, 182)",
                  borderRadius: "4px",
                }}
                textbutton={"Thêm vào giỏ hàng"}
                styleTextbutton={{ color: "rgb(13,92,182)", fontSize: "15px" }}
              ></ButtonComponent>
            </div>
          </Col>
        </Row>
      </div>
    
      <div style={{marginBottom:'20px'}}>
        <h1>Sản phẩm tương tự </h1>
        <div>
       <Slider {...settings}>
          
              {allProducts?.map((product) => {

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

     </Loading>

     
   
  );
};

export default ProductDetailsComponent;
