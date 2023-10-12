import { Button, Col, Image, InputNumber } from "antd";
import { styled } from "styled-components";

export const WrapperStyleImageSmall= styled(Image)`
    height: 64px;
    width:64px;
`
export const WrapperStyleColSmall= styled(Col)`
   flex-basis : unset;
   display : flex;

`
export const WrapperStyleNameProduct= styled.h1`
   color: rgb(36,36,36);
   font-size:24px;
   font-weight:boid;
   line-height:32px;
   word-break:break-word;

`
export const WrapperStyleDescriptionProduct= styled.h1`
   color: rgb(36,36,36);
   font-size:18px;
   font-weight:300;
   line-height:32px;
   word-break:break-word;

`
export const WrapperStyleTextSell= styled.span`
   color: rgb(120,120,120);
   font-size:15px;
   line-height:24px;
`
export const WrapperPriceProduct= styled.div`
   background:rgb(250,250,250);
   border-radius:4px;
`
export const WrapperPriceTextProduct= styled.h1`
   font-size:32px;
   line-height:40px;
   margin-right:8px;
   font-weight:500;
   padding:10px;
   margin-top:10px;
`
export const WrapperAddressProduct= styled.div`
    span.address{
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    };
    span.address-change{
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
`
export const WrapperQualityProduct= styled.div`
   display:flex;
   gap:4px;
   align-items:center;
   width:120px;
   border: 1px solid #ccc;
   border-radius:4px;
`
export const WrapperInputNumber= styled(InputNumber)`
   border-top:none;
   
`
export const WrapperButtonBuy= styled(Button)`
  
   justify-content: center;
   min-width: 190px;
   width: 100%;
   max-width: 300px;
   height: 48px;
   font-size: 15px;
   line-height: 24px;
   font-weight: 500;
`
export const WrapperButtonBuyPay= styled(Button)`
   border: 1px solid rgb(13, 92, 182);
   font-size: 15px;
   line-height: 1.6;
   color: rgb(13, 92, 182);
   background: white;
   width:100%;
   max-width:300px;
   justify-content: center;
   margin-left: 12px;
   font-family: inherit;
 
`

export const WrapperProducts = styled.div`
  display: flex;

  gap:12px ;
  margin-top:20px;
  flex-wrap:wrap;
  
`