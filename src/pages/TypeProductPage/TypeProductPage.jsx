import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col, Pagination, Row } from 'antd';
import { WrapperNavbar, WrapperProducts } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductType } from '../../services/ProductService';
import *as ProductService from '../../services/ProductService'
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import FooterComponent from '../../components/FooterComponent/FooterComponent';


const TypeProductPage = () => {
    const {state} = useLocation()
    const searchProduct = useSelector((state)=>state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const navigate = useNavigate()
    const [ products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [panigate, setPanigate] = useState({
        page:0,
        limit:10,
        total:1
    })

    const fetchProductType = async(type,page,limit)=>{
        setLoading(true)
        const res = await  ProductService.getProductType(type,page,limit)
        
        if(res?.status =='OK'){
            setLoading(false)
            setProducts(res?.data)
            setPanigate({...panigate,total: res?.total})
        }else{
            setLoading(false)
        }
       
    }

    useEffect(()=>{
        if(state){
            fetchProductType(state, panigate.page, panigate.limit)
        }
    },[state,panigate.page,panigate.limit])
    
    const onChange = (current, pageSize)=>{
       
        setPanigate({...panigate, page: current-1, limit:pageSize})
    }
    return (
        <Loading isLoading={loading}>

            <div style={{width:'100%', background:'#efefef',height:'100%'}}>
                <div style={{width:'1270px',margin:'0 auto',height:'100%'}}>
                <div style={{marginTop:'0', padding:'10px 0 10px 0',background:'#fff'}} ><span style={{cursor:"pointer",fontWeight:'bold'}} onClick={()=>{navigate('/')}}>Trang chủ ></span> {state}</div>
                    <Row style={{ flexWrap:'nowrap',paddingTop:'10px',height: 'calc(100% - 20px)'}}>
                        {state==='Laptop'?(
                            <div>
                                <div>
                                    <a href=""></a>
                                </div>
                                <div></div>
                            </div>
                        ):(
                            <div></div>
                        )}
                        <WrapperNavbar span={4} >
                        <NavbarComponent/>
                        </WrapperNavbar>
                        <Col span={20} style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                            <WrapperProducts >
                            {products?.filter((pro) => {
                                    if(searchDebounce === '') {
                                        return pro
                                    }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                        return pro
                                    }
                                })?.map((product)=>{
                                    return(
                                            <CardComponent  key={product._id}
                                                countInStock={product.countInStock} 
                                                description= {product.description}
                                                image = {product.image} 
                                                name = {product.name}
                                                price= {product.price}
                                                rating = {product.rating}
                                                type={product.type}
                                                selled={product.selled} 
                                                discount = {product.discount}
                                                id= {product._id}/>
                                        )
                                })}
                            
                            </WrapperProducts>
                        <Pagination
                            showSizeChanger
                            onChange={onChange}
                            // onShowSizeChange={onShowSizeChange}
                            defaultCurrent={panigate.page+1}
                            total={panigate?.total}
                            style={{textAlign:'center',marginTop:'10px',marginBottom:'10px'}}
                        />
                        </Col>
                
                    </Row> 
                </div>
                <FooterComponent></FooterComponent>
            </div>
        </Loading>
    );
};

export default TypeProductPage;