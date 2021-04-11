import React, { useState } from 'react'


const AddMenuItem = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [desc, setDesc] = useState('')

  return (
    <div className='card-block text-start p-3'>
      <p>Add new menu item</p>
      <form className='add-menu-item'>
        <div className='form-control'>
          <label>Dish name</label>
          <br></br>
          <input 
            type="text"
            placeholder='Add name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='form-control'>
          <label>Price</label>
          <br></br>
          <input 
            type="number" step="0.01"
            placeholder='Add price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className='form-control'>
          <label>Description</label>
          <br></br>
          <input 
            type="text" 
            placeholder='Add description'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}/>
        </div>

        <input type='submit' value='Save item' className="btn btn-primary btn-sm mr-2 px-4" onSubmit={console.log("Submit")}/>
      </form>
    </div>
  )
}

export default AddMenuItem
