import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const ButttonInputSearch = (props) => {
    const {
      size, placeholder, textbutton, borderRadius='0',
      bordered, backgroundColorInput = '#fff',
      backgroundColorButton = 'rgb(13, 92, 182)',
      colorButton = '#fff'
    } = props
  
    return (
      <div style={{ display: 'flex', }}>
        <InputComponent
          size={size}
          placeholder={placeholder}
          bordered={bordered}
          style={{ backgroundColor: backgroundColorInput,
            borderRadius:borderRadius }}
          {...props}
        />
        <ButtonComponent
          size={size}
          styleButton={{ background: backgroundColorButton, border: !bordered && 'none' ,borderRadius:borderRadius , color:colorButton }}
          icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
          textbutton={textbutton}
        
        />
      </div>
    )
  }
  
  export default ButttonInputSearch