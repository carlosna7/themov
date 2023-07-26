'use client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Navbar = () => {

    const [input, setInput] = useState("");
    const router = useRouter();

    const searchMovie = (e) => {
        e.preventDefault()
        router
    }

  return (
    <div>Navbar</div>
  )
}

export default Navbar