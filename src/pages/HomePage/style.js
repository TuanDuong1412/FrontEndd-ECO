import { styled } from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px ;
    justify-content : flex-start;
    font-size:15px;
    height:44px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover{
    color: #fff;
    background: rgb(13,92,182);
    span{
        color: #fff;
    }
    width: 100%;
    text-align:center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
  }
`
export const WrapperProducts = styled.div`
  display: flex;
  
  gap:12px ;
  
  flex-wrap:wrap;
  
`
export const WrapperProductsTextP = styled.p`
  border:2px solid #ccc;
  cursor: pointer;
  border-radius:10px;
  padding: 5px;
  &:hover{
    color: rgb(10, 104, 255);
    border: 1px solid rgb(10, 104, 255);
    font-weight: 600;
  }
  margin:0;
  
`
export const WrapperBrandBannerItem = styled.a`
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);
  display: inline-block;
  overflow: hidden;
  width: calc(25% - 11.25px);
  height:134px
`