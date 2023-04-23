import { useEffect, useState } from "react"
import { Iproduct } from "../models"
import axios, { AxiosError } from "axios"

export function useProducts(){
const [products, setProducts]=useState<Iproduct[]>([])
const [loading, setLoading]=useState(false)
const [error, setError]=useState('')
    function addProduct(product: Iproduct){
        setProducts(prev=>[...prev, product])
    }
  async function fetchProducts(){
    try{
      setError('')
    setLoading(true)
    const response=await axios.get<Iproduct[]>('https://fakestoreapi.com/products?limit=5')
    setProducts(response.data)
    setLoading(false)
  } catch(e: unknown){
    const error=e as AxiosError
    setError(error.message)
  setLoading(false)
  }
}
  useEffect(()=>{
    fetchProducts()
  }, [])
  return {products, loading, error, addProduct};
}