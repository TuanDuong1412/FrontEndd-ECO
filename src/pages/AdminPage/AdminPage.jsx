import { Menu } from 'antd';
import React, { useState } from 'react';
import { getItem } from '../../utils';
import {UserOutlined,AppstoreOutlined,ShoppingCartOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import *as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutation';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
import banner from '../../assets/images/quan-ly-ban-hang.jpg'

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user',<UserOutlined />),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />),
        getItem('Đơn hàng', 'order', <ShoppingCartOutlined  />)

    
      ];
    
    const [ keySelected, setKeySelected] = useState('')
    const renderPage = (key)=>{
      switch(key){
        case'user':
        return(
          <AdminUser></AdminUser>
        )
        case'product':
        return(
          <AdminProduct></AdminProduct>
        )
        case'order':
        return(
          <AdminOrder></AdminOrder>
        )
        default:
          return <></>
      }
    }
    
    const handleOnClick=( {key})=>{
       
        setKeySelected(key)
    }
    return (
      <>
      <HeaderComponent isHiddenSearch isHiddenCart> </HeaderComponent>
      
        <div style={{ display:'flex' }}>
            <Menu
                mode="inline"
                
                style={{
                    width: 256,
                    boxShadow:'1px 1px 2px #ccc',
                    
                 
                }}
                items={items}
                onClick={handleOnClick}
            />
            

            {keySelected ? (
            <div style={{flex:1, padding:'15px'}}>
             
              {renderPage(keySelected)}
            </div>):(
               <img src={banner} style={{height:'700px',width:'100%'}} alt="" />
            )
            }
           
            
        </div>
     
      </> 
    );
};

export default AdminPage;