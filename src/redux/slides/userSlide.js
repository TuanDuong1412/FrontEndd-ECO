import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone:'',
  address:'',
  avatar:'',
  access_token: '',
  id:'',
  isAdmin:false, 
  city:'',
  refreshToken: ''
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state,action)=>{
        const {name = '', email = '', access_token='',phone='',address='',avatar='',_id='',isAdmin, city='',refreshToken = ''} = action.payload
        state.name = name ;
        state.email = email;
        state.phone = phone;
        state.address = address;
        state.avatar = avatar;
        state.id = _id;
        state.isAdmin = isAdmin;
        state.city = city;
        state.access_token = access_token;
        state.refreshToken = refreshToken

       
    },
    resetUser: (state)=>{
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.id = '';
      state.isAdmin = false;
      state.access_token = '';
      state.city = '';
      state.refreshToken = ''
  },
    
  },
})

export const {updateUser,resetUser } = userSlide.actions

export default userSlide.reducer
