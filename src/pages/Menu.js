import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MenuCard from "../components/MenuCard"
import AddMenuItem from "../components/AddMenuItem"


const Menu = (props) => {
  const [menu, setMenu] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://jiak-api.vitaverify.me/api/v1/stall/menu',
      withCredentials: true
    })
      .then(function (res) {
        console.log(res)
        setMenu(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <div className="headers"><h3>Menu Items</h3></div>
      {
        menu && menu.map((ele) => {
          console.log(ele)
          return (
            <MenuCard 
              image={ele.image}
              title={ele.name}
              line1={ele.description}
              line2={`Price: S$${ele.price}`}
              l2Class="text-success" 
            />
          )
        })
      }
      <AddMenuItem />
    </div>
  )
}

export default Menu
