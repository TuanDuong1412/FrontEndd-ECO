import React from 'react';
import { WrapperTextFooter, WrapperTextFooterTitle } from './style';
import {FacebookFilled,YoutubeFilled,HeartTwoTone} from '@ant-design/icons';

const FooterComponent = () => {
    return (
        <div style={{backgroundColor:'#fff',height:'200px',width:'100%',bottom:'0'}}>
            <div style={{display:'flex',justifyContent: 'space-between', gap: '20px',padding: '10px 16px'}}>
                <WrapperTextFooter>
                    <WrapperTextFooterTitle>
                        Hỗ trợ khách hàng
                    </WrapperTextFooterTitle>
                     <p>Các câu hỏi thường gặp</p>
                     <p>Gửi yêu cầu hỗ trợ</p>
                     <p>Hướng dẫn đặt hàng</p>
                </WrapperTextFooter>
                <WrapperTextFooter>
                    <WrapperTextFooterTitle>
                        Về Shop
                    </WrapperTextFooterTitle>
                     <p>Giới thiệu về Shop  <HeartTwoTone twoToneColor="#eb2f96" /></p>
                     <p>Tuyển dụng</p>
                     <p>Chính sách bảo mật và thanh toán</p>
                     <p>Bán hàng doanh nghiệp</p>
                     <p>Điều kiện vận chuyển</p>
                     <p>Gói hội viên vip</p>


                </WrapperTextFooter><WrapperTextFooter>
                    <WrapperTextFooterTitle>
                       Hợp tác và liên kết
                    </WrapperTextFooterTitle>
                     <p>Quy chế hoạt động Sàn GDTMĐT</p>
                     <p>Gửi yêu cầu hỗ trợ</p>
                     <p>Hướng dẫn đặt hàng</p>
                </WrapperTextFooter><WrapperTextFooter>
                    <WrapperTextFooterTitle>
                        Phương thức thanh toán
                    </WrapperTextFooterTitle>
                     <p>MOMO</p>
                     <p>Vn pay</p>
                     <p>Zalo pay</p>

                     <p>Hướng dẫn đặt hàng</p>
                </WrapperTextFooter><WrapperTextFooter>
                    <WrapperTextFooterTitle>
                       Kết nối với chúng tôi
                    </WrapperTextFooterTitle>
                    <a href="/" style={{marginRight:"10px"}}>
                        <FacebookFilled style={{color:'rgb(0,0,128)',fontSize:'32px'}} />
                    </a>
                    <a href="/">
                        <YoutubeFilled style={{color:'rgb(255,0,0)',fontSize:'32px'}}/>

                    </a>
                     <p>Tiktok</p>
                </WrapperTextFooter>
            </div>
            
           
        </div>
    );
};

export default FooterComponent;