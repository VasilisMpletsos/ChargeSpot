import * as actionTypes from '../actions/actions';


export const fetchToken = async (name, password) => {
    const data = await fetch("http://127.0.0.1:8000/api/token/",{
        headers: {'Accept': 'application/json,text/plain, */*','Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({username:name, password}),
      }).catch((error)=>{
        console.log(error)
      })
      return data.json()
}

export const fetchUser = async () => {
    const data = await fetch("http://127.0.0.1:8000/api/find_user/",{
        headers: {'Accept': 'application/json,text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtToken')},
        method: 'GET',
      }).catch((error)=>{
        console.log(error)
      })
      return data.json()
}

export const fetchProfile = async (url) => {
    const data = await fetch(url,{
        headers: {'Accept': 'application/json,text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtToken')},
        method: 'GET',
      }).catch((error)=>{
        console.log(error)
      })
      return data.json()
}

export const fetchHistory = async (url) => {
  const data = await fetch(url,{
      headers: {'Accept': 'application/json,text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwtToken')},
      method: 'GET',
    }).catch((error)=>{
      console.log(error)
    })
    return data.json()
}

export const fetchSpot = async(url) => {
  const data = await fetch(url,{
    headers: {'Accept': 'application/json,text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('jwtToken')},
    method: 'GET',
  }).catch((error)=>{
    console.log(error)
  })
  return data.json()
}




