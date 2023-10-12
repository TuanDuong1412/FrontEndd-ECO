import React, { useEffect, useRef, useState } from 'react';
import TableComponent from '../TableComponent/TableComponent';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import {PlusOutlined ,DeleteOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons'
import { WrapperHeader, WrapperUploadFile } from './style';
import InputComponent from '../InputComponent/InputComponent';
import { getBase64, renderOptions } from '../../utils';
import { createProduct } from '../../services/ProductService';
import *as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutation';
import Loading from '../LoadingComponent/Loading';
import * as message  from '../Message/Message';
import { useQueries, useQuery } from 'react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';

import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

 
const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen]= useState(false);
    const [rowSelected,setRowSelected] = useState('')

    const [isOpenDrawer,setIsOpenDrawer]= useState()
    const [isLoadingUpdate, setIsLoadingUpdate]= useState();
    const user = useSelector((state)=>state?.user);
    const searchInput = useRef(null);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [typeSelect, setTypeSelect] =useState('')
    const inittial = ()=>({
      name:'',
      price:'',
      description:'',
      rating:'',
      image:'',
      type:'',
      countInStock:'',
      newType:'',
      discount:''
  })
    const [stateProduct, setStateProduct]= useState(inittial())
    const [stateProductDetails, setStateProductDetails]= useState(inittial())
    const [form] = Form.useForm();
    const mutation = useMutationHooks(
        (data) =>{
            const {name,price, description,rating,image,type, countInStock,discount} = data
            
            const res = ProductService.createProduct({name,price, description,rating,image,type,countInStock,discount})
            return res
        }         
    )
    const mutationUpdate = useMutationHooks(
        (data) => {
            
          const { id,
            token,
            ...rests } = data
            
          const res =  ProductService.updateProduct(
            id,
            rests,
            token)

            return res
        },
        
      )
      const mutationDeleteMany = useMutationHooks(
        (data) => {
            
          const {
            token,...ids
             } = data
            
          const res =  ProductService.deleteManyProduct(
            ids,
            token)

            return res
        },
        
      )
      const mutationDeleted = useMutationHooks(
        (data) => {
            
          const { id,
            token } = data
            
          const res =  ProductService.deleteProduct(
            id,
            token)

            return res
        },
        
      )
    const getAllProducts = async()=>{
        const res = await ProductService.getAllProduct()
       
        return res
    }
    const fetchGetDetailsProduct = async ()=>{
        const res =await ProductService.getDetailsProduct(rowSelected);
        if(res?.data){
            setStateProductDetails({
                name : res?.data?.name,
                price:res?.data?.price,
                description:res?.data.description,
                rating:  res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data.countInStock,
                discount:res?.data.discount
            })
        }
        setIsLoadingUpdate(false)
       
    }

    useEffect(()=>{
      if(!isModalOpen){

        form.setFieldsValue(stateProductDetails)
      }else{
        form.setFieldsValue(inittial())

      }

    },[form, stateProductDetails,isModalOpen])


    useEffect(()=>{
        if(rowSelected){
            fetchGetDetailsProduct(rowSelected)
        }
    },[rowSelected])
    
    const handleDetailsProduct =()=>{
        setIsOpenDrawer(true);
       
    }
    const handleDeleteManyProducts = (ids)=>{
      mutationDeleteMany.mutate({ids: ids,token: user?.access_token},{
        onSettled:()=>{
            queryProduct.refetch()
        }
    })
    }
    const fetchAllTypeProduct = async() =>{
      const res = await ProductService.getAllTypeProduct()
      return  res
  }
    const {data , isLoading, isSuccess, isError} = mutation;
    const {data : dataUpdated , isLoading:isLoadingUpdated, isSuccess: isSuccessUpdated, isError:isErrorUpdated} = mutationUpdate;
    const {data : dataDeleted , isLoading:isLoadingDeleted, isSuccess: isSuccessDeleted, isError:isErrorDeleted} = mutationDeleted;
    const {data : dataDeletedMany , isLoading:isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError:isErrorDeletedMany} = mutationDeleteMany;


   

    const queryProduct = useQuery({queryKey: ['product'],queryFn: getAllProducts});
    const typeProduct = useQuery({queryKey: ['type-product'],queryFn: fetchAllTypeProduct});
    

    const {isLoading: isLoadingProduct, data: products} = queryProduct
   
    const renderAction =()=>{
        return (
            <div><DeleteOutlined  style={{color:'red',fontSize:'20px',cursor:'pointer',marginRight:'7px'}} onClick={() => setIsModalOpenDelete(true)}/>
                <EditOutlined style={{color:'orange',fontSize:'20px',cursor:'pointer'}} onClick={handleDetailsProduct} />
            </div>
            
        )
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
      };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <InputComponent
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
                with:'100px'
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
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
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
    });

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
          sorter:(a, b) =>a.name.length - b.name.length,
          ...getColumnSearchProps('name')
        },
        {
          title: 'Image',
          dataIndex: 'image',
      
        },
        {
          title: 'Price',
          dataIndex: 'price',
          sorter:(a, b) =>a.price - b.price,
          filters: [
            {
              text: '>= 500',
              value: '>=',
            },
            {
              text: '< 500',
              value: '<=',
            }
          ],
          onFilter: (value, record) => {
            if (value === '>=') {
              return record.price >= 500
            }
            return record.price < 500
          },

        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          sorter:(a, b) =>a.rating - b.rating,
          filters: [
            {
              text: '>= 3',
              value: '>=',
            },
            {
              text: '<= 3',
              value: '<=',
            }
          ],
          onFilter: (value, record) => {
            if (value === '>=') {
              return Number(record.rating) >= 3
            }
            return Number(record.rating) <= 3
          },

        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render:renderAction

        },
      ];
      console.log('product',products?.data);
      const dataTable = products?.data?.length && products?.data?.map((product)=>{
       
        return{ ...product,key : product._id,
          image:
          <img
          src={product?.image}
          style={{
            width: "70px",
            height: "70px",
            objectFit: "cover",
            border: "1px solid rgb(238, 238, 238)",
            padding: "2px",
          }}
        />}
      })
       
     
    useEffect(()=>{
        if(isSuccess && data?.status === 'OK'){
            message.success()
            handleCancel()
        }else if(isError){
            message.error()
        }
    },[isSuccess])
    useEffect(()=>{
      if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK'){
          message.success()
          handleCancel()
      }else if(isErrorDeletedMany){
          message.error()
      }
  },[isSuccessDeletedMany])
    useEffect(()=>{
        if(isSuccessDeleted && dataDeleted?.status === 'OK'){
            message.success('Xóa thành công')
            handleCancelDelete()
        }else if(isErrorDeleted){
            message.error()
        }
    },[isSuccessDeleted])
    
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
        name:'',
        price:'',
        description:'',
        rating:'',
        image:'',
        type:'',
        countInStock:'',
        discount:''
      })
        form.resetFields()
      };
      useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
          message.success()
          handleCloseDrawer()
        } else if (isErrorUpdated) {
          message.error()
        }
      }, [isSuccessUpdated])

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
        name:'',
        price:'',
        description:'',
        rating:'',
        image:'',
        type:'',
        countInStock:'',
        discount:''
    })
        form.resetFields()
      };
      const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
      }
    
      const handleDeleteProduct=()=>{
        mutationDeleted.mutate({id: rowSelected,token: user?.access_token},{
            onSettled:()=>{
                queryProduct.refetch()
            }
        })
      }
    const onFinish = () => {
        
      const params = {
        name: stateProduct.name,
        price: stateProduct.price,
        description: stateProduct.description,
        rating: stateProduct.rating,
        image: stateProduct.image,
        type: stateProduct.type ==='add_type'?stateProduct.newType : stateProduct.type,
        countInStock: stateProduct.countInStock,
        discount:stateProduct.discount
      }
             mutation.mutate(params,{
                onSettled:()=>{
                        queryProduct.refetch()
                    }
                })
       
      };
     
      
      const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
        
      };
      const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
       
      };
      const  handleOnchangeAvatar= async ({fileList})=>{
        const file = fileList[0]
        if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj);
       }
       setStateProduct({
        ...stateProduct,
        image: file.preview
       })
      
     }
     const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
          ...stateProductDetails,
          image: file.preview
        })
      }
      
    const onUpdateProduct = ()=>{
        mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
            onSettled:()=>{
                queryProduct.refetch()
            }
        })
    }
    const handleChangeSelect = (value)=>{
        setStateProduct({
          ...stateProduct,
          type: value
     })
    }
    return (
        <div>
        <WrapperHeader> Quản lý sản phẩm</WrapperHeader>
        <div style={{display:'flex',marginTop:'10px'}}>
          <div style={{}}>
            <p>Thêm sản phẩm </p>
            <Button style={{height:'150px',width:'150px',borderStyle:'dashed'}} onClick={(()=> setIsModalOpen(true))}><PlusOutlined style={{fontSize:'60px'}} /> </Button>
          </div>
          <div style={{marginLeft:'10px'}}>
            <p>Tổng số mặt hàng có trong của hàng: {products?.data.length}</p>
          </div>
        </div>
        <div style={{marginTop:'20px'}}>
            <TableComponent handleDeleteMany={handleDeleteManyProducts} columns={columns} data={dataTable} isLoading={isLoadingProduct} onRow={(record, rowIndex)=>{
                return{
                    onClick: event=>{
                        setRowSelected(record._id)
                    }
                }
            }}></TableComponent>
        </div>
        <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen}  onCancel={handleCancel} footer=''>
            <Loading isLoading={isLoading}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                    autoComplete="on"
                >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
                </Form.Item>
                

                <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <Select
                name="type"
                // defaultValue="lucy"
                // style={{ width: 120 }}
                value={stateProduct.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeProduct?.data?.data)}
                />
            </Form.Item>
            {stateProduct.type === 'add_type' && (
              <Form.Item
                label='New type'
                name="newType"
                rules={[{ required: true, message: 'Please input your type!' }]}
              >
                <InputComponent value={stateProduct.newType} onChange={handleOnChange} name="newType" />
              </Form.Item>
            )}
                
                <Form.Item
                    label="count inStock"
                    name="countInStock"
                    rules={[{ required: true, message: 'Please input your countInStock!' }]}
                    >
                    <InputComponent  value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock"/>
                </Form.Item>
                    <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                    <InputComponent  value={stateProduct.price} onChange={handleOnChange} name="price"/>
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                    <InputComponent  value={stateProduct.description} onChange={handleOnChange} name="description"/>
                </Form.Item>
                <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[{ required: true, message: 'Please input your rating!' }]}
                    >
                    <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating"/>
                </Form.Item>
                <Form.Item
                    label="Discount"
                    name="discount"
                    rules={[{ required: true, message: 'Please input your discount of product!' }]}
                    >
                    <InputComponent value={stateProduct.discount} onChange={handleOnChange} name="discount"/>
                </Form.Item>
                
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your image!' }]}
                    >
                    { <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button >Select File</Button>
                        {stateProduct?.image && (
                                <img src={stateProduct?.image} style={{
                                    height: '60px',
                                    width: '60px',
                                    marginLeft:'30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} alt="avatar"/>
                            )}
                    </WrapperUploadFile>}
                    
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button> 
                </Form.Item>
                </Form>
            </Loading>
        </ModalComponent>
        
        <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="50%">
        <Loading isLoading={isLoadingUpdate ||isLoadingUpdated}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onUpdateProduct}
                    form={form}
                    autoComplete="on"
                >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                <InputComponent value={stateProductDetails['name']} onChange={handleOnChangeDetails} name="name" />
                </Form.Item>

                <Form.Item
                    label="Type"
                    name="type"
                    rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                    <InputComponent  value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type"/>
                </Form.Item>
                
                <Form.Item
                    label="count inStock"
                    name="countInStock"
                    rules={[{ required: true, message: 'Please input your countInStock!' }]}
                    >
                    <InputComponent  value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock"/>
                </Form.Item>
                    <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                    <InputComponent  value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price"/>
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                    <InputComponent  value={stateProductDetails.description} onChange={handleOnChangeDetails} name="description"/>
                </Form.Item>
                <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[{ required: true, message: 'Please input your rating!' }]}
                    >
                    <InputComponent value={stateProductDetails.rating} onChange={handleOnChangeDetails} name="rating"/>
                </Form.Item>

                <Form.Item
                    label="Discount"
                    name="discount"
                    rules={[{ required: true, message: 'Please input your Discount of product!' }]}
                    >
                    <InputComponent value={stateProductDetails.discount} onChange={handleOnChangeDetails} name="discount"/>
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your image!' }]}
                    >
                    { <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                        <Button >Select File</Button>
                        {stateProductDetails?.image && (
                                <img src={stateProductDetails?.image} style={{
                                    height: '60px',
                                    width: '60px',
                                    marginLeft:'30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginLeft:'10px'
                                }} alt="avatar"/>
                            )}
                    </WrapperUploadFile>}
                    
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Apply
                </Button> 
                </Form.Item>
                </Form>
            </Loading>
        </DrawerComponent>
        
         <ModalComponent forceRender title="Xóa sản phẩm" open={isModalOpenDelete}  onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
            <Loading isLoading={isLoadingDeleted}>
                <div>Bạn có chắc muốn xóa sản phẩm này không?</div>
            </Loading>
        </ModalComponent>
    </div>
    );
};

export default AdminProduct;