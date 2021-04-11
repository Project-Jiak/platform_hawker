import React, { useState, useEffect } from 'react'
import axios from 'axios'
import OrderCard from '../components/OrderCard'
import { findInList, isFalse } from '../common/functions'

const Orders = (props) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://jiak-api.vitaverify.me/api/v1/stall/order',
      withCredentials: true
    })
      .then(function (res) {
        console.log(res)
        setOrders(res.data.bundledorders)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const menu = () => {
    axios({
      method: 'get',
      url: 'https://jiak-api.vitaverify.me/api/v1/stall/menu',
      withCredentials: true
    })
      .then(function (res) {
        console.log(res)
        return res.data
      })
      .catch(function (error) {
        console.log(error)
        return []
      })
  }


  const getMenuItem = (id) => {
    let menuItem = findInList(menu, "_id", id)
    if (!isFalse(menuItem)) return menu[menuItem]
  }

  return (
    <div>
      <div className="headers">Orders</div>
      {
        orders && orders.map((ele) => {
          console.log("Next order")
          let menuItem = getMenuItem(ele.menuid)
          if (menuItem == null) return <></>
          return (
            <OrderCard 
              image={menuItem.image}
              title={menuItem.name}
              badge={ele.quantity}
              line1={`$${ele.quantity*menuItem.price}`}
              b1={() => {
                console.log("Clicked complete")
              }}
              b1Name="Complete"
              b2={() => {
                console.log("Clicked reject")
              }}
              b2Name="Reject"
            />
          )
        })
      }
    </div>
  )
}

export default Orders
