import React, { useState, useEffect } from 'react'
import axios from 'axios'
import OrderCard from '../components/OrderCard'
import { findInList, isFalse } from '../common/functions'
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90%',
    maxWidth: '90%'
  }
};


const Orders = (props) => {
  const [orders, setOrders] = useState([])
  const [menu, setMenu] = useState([])
  const [modalDescription, setModalDescription] = useState({ customer: null, orders: [], total: 0 })
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => { setIsOpen(true); }
  const afterOpenModal = () => { }
  const closeModal = () => { setIsOpen(false); }

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://jiak-api.vitaverify.me/api/v1/stall/order',
      withCredentials: true
    })
      .then(function (res) {
        console.log(res)
        setOrders(res.data.bundledOrders)
      })
      .catch(function (error) {
        console.log(error)
      })
    
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

  const getMenuItem = (id) => {
    let menuItem = findInList(menu, "_id", id)
    if (!isFalse(menuItem)) return menu[menuItem]
    return null
  }

  return (
    <div>
      <div className="headers">Orders</div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel=""
      >
        <h2>{modalDescription.customer}</h2>
        {modalDescription.orders.map((ele) => {
          const item = getMenuItem(ele.menuId)
          if (item == null) return <></>
          return <OrderCard title={item.name}/>
        })}
        <button onClick={closeModal}>close</button>
      </Modal>
      {
        orders && orders.map((ele) => {
          let menuItem = getMenuItem(ele.menuId)
          if (ele.length === 0) return <></>
          return (

            <OrderCard
              onClick={() => {
                openModal()
                setModalDescription({ customer: ele[0].customerId, 
                                      orders: ele})
              }}
              title={ele[0].customerId}

            />
          )
        })
      }
    </div>
  )
}

export default Orders
