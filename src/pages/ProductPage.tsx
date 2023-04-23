import React, { useContext } from 'react'
import { useProducts } from '../hooks/products'
import { ModalContext } from '../context/ModalContext'
import { Loader } from '../compoents/Loader'
import { Product } from '../compoents/Product'
import { CreateProduct } from '../compoents/CreateProduct'
import { Modal } from '../compoents/Modal'
import { Iproduct } from '../models'
import { Error } from '../compoents/Error'

export function ProductPage(){
    const {products, loading, error, addProduct}=useProducts()
  const {modal, open, close}=useContext(ModalContext)
  const createHandler=(product: Iproduct)=>{
    close()
    addProduct(product)
  }
  return (

    <div className="container mx-auto max-w-2xl pt-5">
      {loading&& <Loader/>}
      {error && <Error error={error}/>}
      {products.map(product=><Product product={product} key={product.id}/>)}
      {modal&&<Modal title="Create new product" onClose={close}>
        <CreateProduct onCreate={createHandler}/>
      </Modal>}
      <button className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4" onClick={()=>open}>Открыть окно</button>
    </div>
  )
}