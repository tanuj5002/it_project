// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import axios from 'axios'
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("listings");
  const [notificationPreferences, setNotificationPreferences] = useState({
    messages: true,
    newListings: true,
    priceDrops: true,
    orderUpdates: true,
    promotions: false,
  });
  const toggleNotification = (key: string) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };
  // User data

  const [user, setUser] = useState(
    {
      _id: "",
      fullName: "",
      phone: "",
      email: "",
      password: "",
      listings: [""],
      savedItems: [""],
      createdAt: "",
      updatedAt: "",
      __v: 0
    })
  const [listings, setListings] = useState([
    {
      image: {
          data: {
              type: "",
              data: []
          },
          contentType: ""
      },
      _id: "",
      seller: {
        id:"",
        fullName:"",
        email:"",
        phone:"",
      },
      title: "",
      description: "",
      price: 2323,
      condition: "",
      category: "",
      status: "",
      createdAt: "",
      __v: 0
  },
  ])
  const [savedListings, setSavedListings] = useState([{
    image: {
        data: {
            type: "",
            data: []
        },
        contentType: ""
    },
    _id: "",
    seller: {
      id:"",
      fullName:"",
      email:"",
      phone:"",
    },
    title: "",
    description: "",
    price: 2323,
    condition: "",
    category: "",
    status: "",
    createdAt: "",
    __v: 0
},])
  function DataFetching(){

    useEffect(() =>{
      axios.get("http://localhost:5001/api/user/67f6c2aaf02a202c3be89bdc")
      .then(res => {
        setUser(res.data)
        console.log(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
    }, [])

    useEffect(()=>{
      axios.get("http://localhost:5001/api/listing/currlistings/67f6c2aaf02a202c3be89bdc")
      .then(res =>{
        setListings(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
    }, [])

    useEffect(()=>{
      axios.get("http://localhost:5001/api/listing/savelistings/67f6c2aaf02a202c3be89bdc")
      .then(res =>{
        setSavedListings(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
    }, [])
  }
  DataFetching();
  let countSavedList = 0;
  savedListings.forEach((item) => {
    if(item.status === "Sold"){
        countSavedList++;
    }
  })
  const userData = {
    name: user.fullName,
    username: "@mike_thompson",
    joinDate: user.createdAt,
    rating: 4.8,
    email: user.email,
    phone: user.phone,
    school: "University of Technology",
    location: "East Campus, Building 4",
    languages: ["English", "Spanish"],
    paymentMethods: ["UPI", "Cash"],
    totalListings: listings.length,
    completedSales: countSavedList,
    profileImage:
      "https://public.readdy.ai/ai/img_res/8a23351c703153c3048b5db615237c49.jpg",
  };
  // Active listings
  // const userListings = 

  const activeListings =  listings.map((item) => ({
      id: item._id,
      name: item.title,
      price: item.price,
      condition: item.condition,
      image:
        `http://localhost:5001/uploads/${item.image.data}`,
      postedDate: item.createdAt,
    }
  ))

  const savedItems =  savedListings.map((item) => ({
    id: item._id,
    name: item.title,
    price: item.price,
    condition: item.condition,
    image:
      `http://localhost:5001/uploads/${item.image.data}`,
    seller:item.seller.fullName,
    postedDate: item.createdAt,
  }
))

  // const activeListings = [
  //   {
  //     id: 1,
  //     name: "MacBook Pro 2023",
  //     price: 1299,
  //     condition: "Like New",
  //     image:
  //       "https://public.readdy.ai/ai/img_res/3e3748716a4d27d07178455ead6e05a5.jpg",
  //     postedDate: "2 days ago",
  //   },
  //   {
  //     id: 2,
  //     name: "Desk Lamp with USB Port",
  //     price: 25,
  //     condition: "Very Good",
  //     image:
  //       "https://public.readdy.ai/ai/img_res/74064d062e0152e6c93a3f4c764c0ef5.jpg",
  //     postedDate: "1 week ago",
  //   },
  //   {
  //     id: 3,
  //     name: "Physics Textbook Bundle",
  //     price: 75,
  //     condition: "Good",
  //     image:
  //       "https://public.readdy.ai/ai/img_res/e232a7732c4513c812e0dc96c885bc7a.jpg",
  //     postedDate: "3 days ago",
  //   },
  // ];
  // Sold items
  const soldItems = [
    {
      id: 4,
      name: "Wireless Headphones",
      price: 1200,
      condition: "Like New",
      image:
        "https://public.readdy.ai/ai/img_res/621bbd4dba83c7ac2a647dbc49062e91.jpg",
      soldDate: "Last month",
      buyer: "Emma Wilson",
    },
    {
      id: 5,
      name: "Graphic Calculator",
      price: 450,
      condition: "Good",
      image:
        "https://public.readdy.ai/ai/img_res/89ecf8475e605ce7a553f256f2c6ae20.jpg",
      soldDate: "2 months ago",
      buyer: "Alex Johnson",
    },
  ];
  // Saved items
  // const savedItems = [
  //   {
  //     id: 6,
  //     name: "Mountain Bike",
  //     price: 220,
  //     condition: "Good",
  //     image:
  //       "https://public.readdy.ai/ai/img_res/53009fd0f46c23c1f695daf759fce6ef.jpg",
  //     seller: "Jake Williams",
  //     postedDate: "6 days ago",
  //   },
  //   {
  //     id: 7,
  //     name: "Acoustic Guitar",
  //     price: 150,
  //     condition: "Very Good",
  //     image:
  //       "https://public.readdy.ai/ai/img_res/3870a9d158678de6796524b031f45406.jpg",
  //     seller: "Sophia Rodriguez",
  //     postedDate: "3 days ago",
  //   },
  // ];
  // Reviews
  const reviews = [
    {
      id: 1,
      reviewer: "Emma Wilson",
      rating: 5,
      date: "March 15, 2025",
      text: "Great seller! The MacBook was exactly as described and Michael was very prompt with delivery. Would definitely buy from again.",
      avatar:
        "https://public.readdy.ai/ai/img_res/a779fc9d5ea2d8382c0a23d397988b38.jpg",
      item: "MacBook Pro",
    },
    {
      id: 2,
      reviewer: "Alex Johnson",
      rating: 5,
      date: "February 28, 2025",
      text: "Smooth transaction. The calculator was in perfect working condition and at a fair price. Thanks!",
      avatar:
        "https://public.readdy.ai/ai/img_res/4046ff4ed2b732144aba7279cee0780e.jpg",
      item: "Graphic Calculator",
    },
    {
      id: 3,
      reviewer: "Marcus Chen",
      rating: 4,
      date: "January 10, 2025",
      text: "Good communication and the textbooks were in decent condition. Would recommend.",
      avatar:
        "https://public.readdy.ai/ai/img_res/e0050a5af5afc8814594a3a7bb037095.jpg",
      item: "Physics Textbooks",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600">
                  KampusKart
                </h1>
              </div>
              <a
                href="http://localhost:3000/listings"
                data-readdy="true"
                className="ml-4 text-gray-600 hover:text-gray-900 flex items-center cursor-pointer"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                <span>Back to Marketplace</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              {/*<button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                <i className="fas fa-heart"></i>
                <span className="ml-1">Saved</span>
              </button>
              <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                <i className="fas fa-comment"></i>
                <span className="ml-1">Messages</span>
              </button>*/}
              <a
                href="http://localhost:3000/listingform"
                data-readdy="true"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button whitespace-nowrap cursor-pointer inline-flex items-center"
              >
                <i className="fas fa-plus mr-2"></i>
                <span>Sell Item</span>
              </a>
              <div className="relative">
                <img
                  src={userData.profileImage}
                  alt="User profile"
                  className="h-8 w-8 rounded-full object-cover cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 h-40">
            <button className="absolute top-4 right-4 bg-white text-indigo-600 px-4 py-2 rounded-button shadow-md hover:bg-gray-50 whitespace-nowrap cursor-pointer">
              <i className="fas fa-pencil-alt mr-2"></i>
              Edit Profile
            </button>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col items-center md:items-start -mt-16 md:-mt-12 md:mr-8">
                <div className="rounded-full p-1 bg-white shadow-md">
                  <img
                    src={userData.profileImage}
                    alt={userData.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h1 className="mt-4 text-2xl font-bold text-gray-900">
                  {userData.name}
                </h1>
                {/* <p className="text-gray-600">{userData.username}</p> */}
                <div className="mt-2 flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  {/* <span className="font-medium">{userData.rating}</span> */}
                  {/* <span className="mx-2 text-gray-300">•</span> */}
                  <span className="text-gray-600">
                    Joined {userData.joinDate}
                  </span>
                </div>
              </div>
              <div className="mt-6 md:mt-0 flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-indigo-600">
                    {userData.totalListings}
                  </p>
                  <p className="text-gray-600">Total Listings</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-indigo-600">
                    {userData.completedSales}
                  </p>
                  <p className="text-gray-600">Completed Sales</p>
                </div>
                {/* <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-indigo-600">
                    {userData.rating}
                  </p>
                  <p className="text-gray-600">Average Rating</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Account Details */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Account Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium flex items-center">
                    {userData.email}
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Verified
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
                {/* <div>
                  <p className="text-sm text-gray-500">School/University</p>
                  <p className="font-medium flex items-center">
                    {userData.school}
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Verified Student
                    </span>
                  </p>
                </div> */}
                {/* <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{userData.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Languages</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {userData.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div> */}
                <div>
                  <p className="text-sm text-gray-500">
                    Preferred Payment Methods
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {userData.paymentMethods.map((method, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Messages</p>
                    <p className="text-sm text-gray-500">
                      Get notified when someone messages you
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                      notificationPreferences.messages
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    }`}
                    onClick={() => toggleNotification("messages")}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        notificationPreferences.messages
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Listings</p>
                    <p className="text-sm text-gray-500">
                      Get notified about new items matching your interests
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                      notificationPreferences.newListings
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    }`}
                    onClick={() => toggleNotification("newListings")}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        notificationPreferences.newListings
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Price Drops</p>
                    <p className="text-sm text-gray-500">
                      Get notified when saved items drop in price
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                      notificationPreferences.priceDrops
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    }`}
                    onClick={() => toggleNotification("priceDrops")}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        notificationPreferences.priceDrops
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Updates</p>
                    <p className="text-sm text-gray-500">
                      Get notified about your order status changes
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                      notificationPreferences.orderUpdates
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    }`}
                    onClick={() => toggleNotification("orderUpdates")}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        notificationPreferences.orderUpdates
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotions</p>
                    <p className="text-sm text-gray-500">
                      Receive promotional offers and news
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                      notificationPreferences.promotions
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    }`}
                    onClick={() => toggleNotification("promotions")}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        notificationPreferences.promotions
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
            </div> */}
            {/*notificaltion*/}
          </div>
          {/* Right Column - Tabs Content */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap cursor-pointer ${
                      activeTab === "listings"
                        ? "text-indigo-600 border-b-2 border-indigo-600 border-b-indigo-600 w-3/4 mx-auto"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("listings")}
                  >
                    Active Listings
                  </button>
                  <button
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap cursor-pointer ${
                      activeTab === "sold"
                        ? "text-indigo-600 border-b-2 border-indigo-600 border-b-indigo-600 w-3/4 mx-auto"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("sold")}
                  >
                    Sold Items
                  </button>
                  <button
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap cursor-pointer ${
                      activeTab === "saved"
                        ? "text-indigo-600 border-b-2 border-indigo-600 border-b-indigo-600 w-3/4 mx-auto"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("saved")}
                  >
                    Saved Items
                  </button>
                  {/* <button
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap cursor-pointer ${
                      activeTab === "reviews"
                        ? "text-indigo-600 border-b-2 border-indigo-600 border-b-indigo-600 w-3/4 mx-auto"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews & Feedback
                  </button> */}
                </nav>
              </div>
              <div className="p-6">
                {/* Active Listings Tab */}
                {activeTab === "listings" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Your Active Listings
                      </h2>
                      <a
                      href="http://localhost:3000/listingform"
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer"
                      ><i className="fas fa-plus mr-2"></i>
                      Add New Listing
                      </a>
                    </div>
                    {activeListings.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeListings.map((item) => (
                          <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="relative h-40 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover object-top"
                              />
                              <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                                {item.condition}
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-gray-900">
                                  {item.name}
                                </h3>
                                <span className="font-bold text-indigo-600">
                                ₹{item.price}
                                </span>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                <span className="text-xs text-gray-500">
                                  Posted {item.postedDate}
                                </span>
                                <div className="flex space-x-2">
                                  <button className="p-2 text-gray-500 hover:text-indigo-600 cursor-pointer">
                                    <i className="fas fa-pencil-alt"></i>
                                  </button>
                                  <button className="p-2 text-gray-500 hover:text-red-600 cursor-pointer">
                                    <i className="fas fa-trash-alt"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <i className="fas fa-box-open text-gray-300 text-5xl mb-4"></i>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          No active listings
                        </h3>
                        <p className="text-gray-500 mb-4">
                          You don't have any items for sale right now.
                        </p>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button whitespace-nowrap cursor-pointer">
                          <i className="fas fa-plus mr-2"></i>
                          Create New Listing
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {/* Sold Items Tab */}
                {activeTab === "sold" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Your Sold Items
                      </h2>
                    </div>
                    {soldItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {soldItems.map((item) => (
                          <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="relative h-40 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover object-top"
                              />
                              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
                                <span className="text-white font-bold px-3 py-1 rounded bg-green-600">
                                  SOLD
                                </span>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-gray-900">
                                  {item.name}
                                </h3>
                                <span className="font-bold text-green-600">
                                ₹{item.price}
                                </span>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">
                                  Sold to: {item.buyer}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Sold {item.soldDate}
                                </p>
                              </div>
                              <div className="mt-4 flex justify-end">
                                <button className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <i className="fas fa-shopping-bag text-gray-300 text-5xl mb-4"></i>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          No sold items yet
                        </h3>
                        <p className="text-gray-500">
                          You haven't sold any items yet.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {/* Saved Items Tab */}
                {activeTab === "saved" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Your Saved Items
                      </h2>
                    </div>
                    {savedItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savedItems.map((item) => (
                          <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="relative h-40 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover object-top"
                              />
                              <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer">
                                <i className="fas fa-heart text-red-500"></i>
                              </button>
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-gray-900">
                                  {item.name}
                                </h3>
                                <span className="font-bold text-indigo-600">
                                ₹{item.price}
                                </span>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">
                                  Seller: {item.seller}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Posted {item.postedDate}
                                </p>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                  {item.condition}
                                </span>
                                <button className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <i className="far fa-heart text-gray-300 text-5xl mb-4"></i>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          No saved items
                        </h3>
                        <p className="text-gray-500 mb-4">
                          You haven't saved any items yet.
                        </p>
                        <a
                          href="https://readdy.ai/home/62a88c4d-aac8-4b26-8141-65107abda862/2136e2fe-4f22-4e35-a4f5-2639d96b0a5e"
                          data-readdy="true"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button whitespace-nowrap cursor-pointer"
                        >
                          Browse Marketplace
                        </a>
                      </div>
                    )}
                  </div>
                )}
                {/* Reviews Tab */}
                {/* {activeTab === "reviews" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Reviews & Feedback
                      </h2>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className="fas fa-star text-yellow-400"
                            ></i>
                          ))}
                        </div>
                        <span className="ml-2 font-medium">
                          {userData.rating}/5
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({reviews.length} reviews)
                        </span>
                      </div>
                    </div>
                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div
                            key={review.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-start">
                                <img
                                  src={review.avatar}
                                  alt={review.reviewer}
                                  className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                  <h3 className="font-medium text-gray-900">
                                    {review.reviewer}
                                  </h3>
                                  <div className="flex items-center mt-1">
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <i
                                          key={star}
                                          className={`${
                                            star <= review.rating
                                              ? "fas text-yellow-400"
                                              : "far text-gray-300"
                                          } fa-star text-sm`}
                                        ></i>
                                      ))}
                                    </div>
                                    <span className="ml-2 text-xs text-gray-500">
                                      {review.date}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                Item: {review.item}
                              </span>
                            </div>
                            <p className="mt-3 text-gray-600">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <i className="far fa-comment-alt text-gray-300 text-5xl mb-4"></i>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          No reviews yet
                        </h3>
                        <p className="text-gray-500">
                          You haven't received any reviews yet.
                        </p>
                      </div>
                    )}
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-indigo-600">KampusKart</h2>
              <p className="text-sm text-gray-500 mt-1">
                The marketplace for university students
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 KampusKart. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
