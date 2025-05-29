import React from 'react'
import { toast } from 'react-toastify'

function ToastExample() {
  const handleClick = () => {
    toast.success("This is a success toast!", {
      toastId: "custom-toast" // prevents duplicates
    })
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button onClick={handleClick} style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
        Show Toast
      </button>
    </div>
  )
}

export default ToastExample
