import React, { useState } from 'react'
import {Error} from './Error'
import { Iproduct } from '../models'
import axios from 'axios'
const productData: Iproduct={
        title: '',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic',
        rating: {
            rate: 42, 
            count:10
        }
    }
    interface CreateProductProps{
        onCreate:(product :Iproduct)=>void
    }
export function CreateProduct({onCreate}:CreateProductProps){
    const [error, setError]=useState('')
    const[value, setValue]=useState('')
    const submitHandler=async(event: React.FormEvent)=>{
        event.preventDefault()
        setError('')
        if (value.trim().length===0){
            setError('Please enter valid title')
            return
        }

    productData.title=value;
    const response=await axios.post<Iproduct>('https://fakestoreapi.com/products', productData)
    onCreate(response.data)
    }

    const changeHandler=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setValue(event.target.value)
    }
    return (
        <form onSubmit={submitHandler}>
            <input
            type='text'
            className='border py-2 px-4 mb-2 w-full outline-0'
            placeholder='Enter product title...'
            value={value}
            onChange={changeHandler}
            />
            {error && <Error error={error}/>}
            <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Create</button>
        </form>
    )
}