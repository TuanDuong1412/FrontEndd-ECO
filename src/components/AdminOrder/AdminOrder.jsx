import { Button, Form, Space } from 'antd'
import React, { useState } from 'react'
import { WrapperHeader, WrapperHeaderItem, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import { convertPrice, getBase64 } from '../../utils'
import { useEffect } from 'react'
import * as message from '../Message/Message'

import * as OrderService from '../../services/OrderService'
import { useQuery } from 'react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { orderContant } from '../../contant'

import PieChartComponent from './PieChart'


const AdminOrder = () => {
  const user = useSelector((state) => state?.user)
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return res
  }


  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
  const { isLoading: isLoadingOrders, data: orders } = queryOrder
  const totalOrder = orders?.data?.length;
 

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: 'User name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
   
    {
      title: 'Shipped',
      dataIndex: 'isDelivered',
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps('isDelivered')
    },
    {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Image',
      dataIndex: 'image',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
    }
  ];
  
  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
  
    return { ...order, 
      key: order._id,
      userName: order?.shippingAddress?.fullName,
      phone: order?.shippingAddress?.phone,
      address: order?.shippingAddress?.address,
      paymentMethod: orderContant.payment[order?.paymentMethod],
      isPaid: order?.isPaid ? 'TRUE' :'FALSE',
      isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE',
      image:order?.orderItems?.map((ordered)=>{
        return(

          <img
            src={ordered?.image}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              border: "1px solid rgb(238, 238, 238)",
              padding: "2px",
            }}
          />
        )
      }),
      amount:order?.orderItems?.map((ordered)=>{
        return(
          ordered?.amount
        )
      })
      ,
      totalPrice: convertPrice(order?.totalPrice)}
  })

  /////
  let sum = 0;
  const [totalRevenue, setTotalRevenue] = useState(0);
  useEffect(() => {
    const doanhthus = orders?.data?.map((total, order) => total.totalPrice );
   
    const sum = doanhthus?.reduce((total, current) => total + current, 0);
    
    setTotalRevenue(sum);
  }, [orders]);
  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{display:'flex'}}>   
        <div style={{height: 200, width:200}}>
          <PieChartComponent data={orders?.data} />
        </div>
        <div style={{marginLeft:'10px'}}>
            <h3>Tổng số doanh thu :{ convertPrice(totalRevenue)} </h3>
            <h3>Tổng số đơn hàng :{totalOrder } </h3>

        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
     
        <TableComponent  columns={columns} isLoading={isLoadingOrders} data={dataTable} />
      </div>
    </div>
  )
}

export default AdminOrder;