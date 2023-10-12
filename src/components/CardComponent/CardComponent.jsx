import React from 'react';
import { Card ,Image} from 'antd';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style';

import {StarFilled} from '@ant-design/icons';
import logo from '../../assets/images/logo.png'
import { convertPrice } from '../../utils'
import { useNavigate } from 'react-router-dom';
const CardComponent = (props) => {
    const {countInStock, description, image, name, price, rating, type, selled, discount,id} = props
    const navigate = useNavigate()
    const handleDetailsProduct=(id)=>{
        navigate( `/product-details/${id}`)
    }
   
return (
        <div>
            <WrapperCardStyle
                hoverable
                headStyle={{height:'200px', width:'200px'}}
                bodyStyle={{padding:'10px'}}
                style={{
                    width: 200,
                }}
                cover={<img alt="example" src={image} />}
                onClick={()=> countInStock!==0 && handleDetailsProduct(id)}
                disable ={countInStock === 0}
            >
                <img src={logo} 
                    style={{width:'68px',height:'14px',position:'absolute',top:'0',left:'0'}}></img>

                 <StyleNameProduct>{name}</StyleNameProduct>
                 <WrapperReportText>
                    <span style={{marginRight:'4px'}}>
                        <span>{rating}</span> <StarFilled style={{fontSize:'12px', color:'yellow'}} />
                    </span>
                    <WrapperStyleTextSell> | Đã bán {selled || 0}+</WrapperStyleTextSell>
                 </WrapperReportText>
                 <WrapperPriceText>
                    <span style={{marginRight:'8px'}}>{convertPrice(price)}</span> 
                    <WrapperDiscountText>
                       - {discount}%
                    </WrapperDiscountText>
                 </WrapperPriceText>
             </WrapperCardStyle>
        </div>
    );
};

export default CardComponent;