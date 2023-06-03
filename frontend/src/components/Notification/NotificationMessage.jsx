import React, { useState, useEffect } from 'react'
import { format } from 'timeago.js'
import axios from 'axios'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from 'react-router-dom';

const NotificationMessage = ({ setOpenModal, notification }) => {
  const [sender, setSender] = useState(null)
  const [productTitle, setProductTitle] = useState(null)
  const [productId, setProductId] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // fetch the sender's information
  //   axios.get(`${import.meta.env.VITE_BASE_URI}/users/${notification.senderId}`)
  //     .then(response => {
  //       setSender(response.data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })

  //   // fetch the product title if the notification is of type "adAddedToWishlist"
  //   if (notification.type === "adAddedToWishlist") {
  //     axios.get(`${import.meta.env.VITE_BASE_URI}/products/listings/${notification.productId}`)
  //       .then(response => {
  //         setProductTitle(response.data.title)
  //         setProductId(response.data._id)
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }
  // }, [notification])

  const handleClick = () => {
    setOpenModal(false);
    navigate(`/event/${productId}`);
  }

  if (notification.type === "adAddedToWishlist" && sender && productTitle) {
    return (
      <div className="p-4 hover:bg-gray-100  rounded cursor-pointer border-b border-gray-300"> 
    <span onClick={handleClick} className={`block`}>
      <p className='font-semibold'>{sender.displayName}</p> added your ad "{productTitle.slice(0, 3)}..." to their wishlist.
      {notification.createdAt && (
        <p className="text-sm text-gray-500">{format(notification.createdAt)}</p>
      )}
    </span>  
      </div>
    )
  }

  else if (notification.type === "unreadMessage" && sender) {
      return (
        <div className="p-4 hover:bg-gray-100  rounded cursor-pointer border-b border-gray-300"> 
        <p className="font-medium">{sender.name} sent you a message.</p>
        </div>
      )
  }
  
  else {
      return (
        <div className="p-4 hover:bg-gray-100  rounded cursor-pointer border-b border-gray-300"> 
        <div>
            <Skeleton width={310} height={20} />
        </div>
        </div>
      )
  }
}

export default NotificationMessage
