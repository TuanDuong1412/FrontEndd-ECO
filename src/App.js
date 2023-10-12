import { Button, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReactDOM from "react-dom/client"
import routes from './routes/index'
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import isShowHeader from './routes'
import { Fragment } from 'react';
import { useQuery } from 'react-query';
import { isJsonString } from './utils';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import *as UserService from '../src/services/userService'
import { resetUser, updateUser } from './redux/slides/userSlide';
import Loading from './components/LoadingComponent/Loading'


export default function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) =>state.user)
  // const [isLoading, setIsLoading] = useState(false)
 
 useEffect(()=>{
  setIsLoading(true)
    let {decoded,storageData} = handleDecoded()
            if(decoded?.id){
                  handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
 },[])


 const handleDecoded =()=>{
  let storageData = localStorage.getItem('access_token')
  let decoded = {}
  if(storageData && isJsonString(storageData)){
          storageData = JSON.parse(storageData)
          decoded = jwt_decode(storageData)
         
  }
       return {decoded, storageData}
}

// Check token hết hạn gọi đến refresh token lấy token mới để thay
 UserService.axiosJWT.interceptors.request.use(async (config) =>{
  let {decoded} = handleDecoded()
  const currentTime = new Date()
  let storageRefreshToken = localStorage.getItem('refresh_token')
  const refreshToken = JSON.parse(storageRefreshToken)
  const decodedRefreshToken =  jwt_decode(refreshToken)
  if(decoded?.exp < currentTime.getTime()/1000){
    if(decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
    const data = await UserService.refreshToken()
    config.headers['token'] = `Bearer ${data?.access_token}`
  }else{
    dispatch(resetUser())
  }
  }
  return config;
},  (err) => {

  return Promise.reject(err);
});

 const handleGetDetailsUser =async (id, token )=>{
  let storageRefreshToken = localStorage.getItem('refresh_token')
  const refreshToken = JSON.parse(storageRefreshToken)
  const res = await UserService.getDetailsUser(id, token )
  dispatch(updateUser({ ...res?.data, access_token: token ,refreshToken: refreshToken}))
 
}



  return (
    <div>
      <Loading isLoading={isLoading} style={{background:'#ccc'}}>

        <Router>
          <Routes>
            {routes.map((route)=>{
              const Page = route.page;
              // const isCheckAuth = !route.isPrivated ||user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return(
                <Route key={route.path} path={ route.path} 
                       element={
                        <Layout>
                          <Page/>
                       </Layout>
                      }
                />
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  )

}
