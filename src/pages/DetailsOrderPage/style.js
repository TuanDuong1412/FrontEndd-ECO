import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 13px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
  }
  .address,.phone-info,.delivery-info,.delivery-fee,.payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    margin-top: 8px;
  }
  .name-delivery {
    color: rgb(234, 133, 0); 
    font-weight: bold;
    text-transform: uppercase;
  }
  .status-payment {
    margin-top: 8px;
    color: rgb(234, 133, 0); 
  }
`

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 15px;
`
export const WrapperContentInfo = styled.div`
  height: 118px;
  width: 320px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
`

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const WrapperProduct = styled.div`
  display:flex;
  align-items:center;
  margin-top: 10px;
  gap:7px;
  border-bottom:1px dotted
  
`

export const WrapperNameProduct = styled.div`
 width:145px;
  display:flex;
  align-items: flex-start;
  
`

export const WrapperItem = styled.div`
  width: 270px;
  display:flex;
  justify-content:center;
  
  font-weight: 400;
  &:last-child {
    color: red  ; 
   
    
  }
`
export const WrapperItemLabel = styled.div`
  width: 270px;

  display:flex;
  justify-content:center;
  &:last-child {
    font-weight: bold;
    border-right:none;
  }
  border-right:1px solid;
`

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-weight:500;
  font-size:20px;
  border-right:none;
`