import { Checkbox, Col, Rate, Row } from 'antd'
import React from 'react'
import { WrapperBannerA, WrapperContent, WrapperLableText } from './style'
import banner1 from '../../assets/images/bannertype1.png'
import banner2 from '../../assets/images/bannertype2.png'
import banner3 from '../../assets/images/bannertype3.png'

const NavBarComponent = () => {
   
    return (
        <div>
            <div style={{backgroundColor:'#fff',padding:'10px',marginBottom:'10px'}}>
                <h3 style={{marginTop:'5px'}}>Danh mục sản phẩm</h3>
                <div style={{paddingLeft:'10px'}}>
                    <p>IP</p>
                    <p>Laptop</p>
                    <p>Loa Bluetooth</p>
                    <p>Tai nghe</p>
                    <p>Ipad</p>
                    <p>Đồng hồ thông minh</p>

                </div>
            </div>
            <div >
                <WrapperBannerA href="">
                    <img src={banner1} style={{height: 'auto', maxWidth: '100%'}} alt="" />
                </WrapperBannerA>
                <WrapperBannerA  href="">
                    <img src={banner2} style={{height: 'auto', maxWidth: '100%'}}alt="" />
                </WrapperBannerA>
                <WrapperBannerA href="">
                    <img src={banner3} style={{height: 'auto', maxWidth: '100%'}}alt="" />    
                </WrapperBannerA>
            </div>
        </div>
    )
}

export default NavBarComponent