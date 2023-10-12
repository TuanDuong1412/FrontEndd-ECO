import React from 'react';
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent';
import {  useNavigate, useParams } from 'react-router-dom';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const ProductDetailsPage = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    return (
        <div style={{ width:'100%',background:'#efefef'}}>
            <div style={{width:'1270px',margin:'0 auto',height:'100%'}}>
                <div style={{marginTop:'0', padding:'10px 0 10px 0'}} ><span style={{cursor:"pointer",fontWeight:'bold'}} onClick={()=>{navigate('/')}}>Trang chủ</span> - Chi tiết sản phẩm</div>
                <ProductDetailsComponent idProduct={id}/>
            </div>
        <FooterComponent style={{ marginTop: "10px" ,width:'100%'}}></FooterComponent>

        </div>
    );
};

export default ProductDetailsPage;