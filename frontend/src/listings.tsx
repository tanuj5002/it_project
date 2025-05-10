// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
interface Seller {
name: string;
rating: number;
avatar: string;
}
interface Product {
id: string;
name: string;
price: number;
description: string;
condition: string;
category: string;
seller: Seller;
image: string;
timestamp: string;
saved: boolean;
}
const App: React.FC = () => {
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
const [products, setProducts] = useState<Product[]>([
{
id: "1",
name: "MacBook Pro 2023",
price: 1299,
description: "Barely used MacBook Pro with M2 chip, 16GB RAM, 512GB SSD",
condition: "Like New",
category: "Electronics",
seller: {
name: "Alex Johnson",
rating: 4.8,
avatar: "https://public.readdy.ai/ai/img_res/56a6446dc4771b3a06879c284713259d.jpg"
},
image: "https://public.readdy.ai/ai/img_res/d4c3de1aadad10654846d1514344ca84.jpg",
timestamp: "2 days ago",
saved: false
},
{
id: "2",
name: "Calculus Textbook 5th Edition",
price: 45,
description: "Calculus: Early Transcendentals, James Stewart, perfect condition with no highlights",
condition: "Good",
category: "Books",
seller: {
name: "Emma Wilson",
rating: 4.6,
avatar: "https://public.readdy.ai/ai/img_res/c00aceccd61d9c48db4578bf2dbdcd09.jpg"
},
image: "https://public.readdy.ai/ai/img_res/73c123769a3f0352157b8451ecbf7840.jpg",
timestamp: "5 days ago",
saved: true
},
{
id: "3",
name: "Dorm Room Mini Fridge",
price: 75,
description: "Compact 3.2 cu ft refrigerator, perfect for dorm rooms, includes freezer compartment",
condition: "Good",
category: "Appliances",
seller: {
name: "Marcus Chen",
rating: 4.9,
avatar: "https://public.readdy.ai/ai/img_res/1eef5868f90b493f68d61a9ad74b8807.jpg"
},
image: "https://public.readdy.ai/ai/img_res/260ad05442fc26e4a1ebd7b4da785c59.jpg",
timestamp: "1 week ago",
saved: false
},
{
id: "4",
name: "Acoustic Guitar",
price: 150,
description: "Yamaha FG800 acoustic guitar with case, great condition, perfect for beginners",
condition: "Very Good",
category: "Musical Instruments",
seller: {
name: "Sophia Rodriguez",
rating: 4.7,
avatar: "https://public.readdy.ai/ai/img_res/2c509a3cf39c9ccb273ea0f20f3339c5.jpg"
},
image: "https://public.readdy.ai/ai/img_res/dfb6c78be16bfc2aff53f532c5438b0d.jpg",
timestamp: "3 days ago",
saved: false
},
{
id: "5",
name: "Mountain Bike",
price: 220,
description: "Trek 3500 mountain bike, 21-speed, recently tuned up and ready to ride",
condition: "Good",
category: "Sports & Outdoors",
seller: {
name: "Jake Williams",
rating: 4.5,
avatar: "https://public.readdy.ai/ai/img_res/591a63981cad1e82799f92623428cc07.jpg"
},
image: "https://public.readdy.ai/ai/img_res/902cbcac0e7a98e183b6bcf5dd8781d9.jpg",
timestamp: "6 days ago",
saved: true
},
{
id: "6",
name: "Desk Lamp with USB Port",
price: 25,
description: "LED desk lamp with adjustable brightness, USB charging port, perfect for studying",
condition: "Like New",
category: "Home & Furniture",
seller: {
name: "Olivia Parker",
rating: 4.8,
avatar: "https://public.readdy.ai/ai/img_res/fee2d4bc8f340612eec89b290792d03e.jpg"
},
image: "https://public.readdy.ai/ai/img_res/c2a4c1b51061c302d12761c2cd8587ca.jpg",
timestamp: "4 days ago",
saved: false
}
]);


    useEffect(() =>{
      axios.get("http://localhost:5001/api/listing/")
      .then(res => {
        setListings(res.data)
        console.log(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
    }, [])
    useEffect(() => {
        const activeListings =  listings.map((item) => ({
        id: item._id,
        name: item.title,
        price: item.price,
        description: item.description,
        condition: item.condition,
        category: item.category,
        seller: {
        name: item.seller.fullName,
        rating: 4.8,
        avatar: "https://public.readdy.ai/ai/img_res/fee2d4bc8f340612eec89b290792d03e.jpg"
        },
        image: `http://localhost:5001/uploads/${item.image.data}`,
        timestamp: item.createdAt,
        saved: true,
      }
    ))
    setProducts(activeListings)
}, [listings])
const categories = [
"All Categories",
"Electronics",
"Books",
"Appliances",
"Musical Instruments",
"Sports & Outdoors",
"Home & Furniture",
"Clothing",
"Other"
];
const conditions = ["All Conditions", "Like New", "Very Good", "Good", "Fair", "Poor"];
const [activeCategory, setActiveCategory] = useState("All Categories");
const [activeCondition, setActiveCondition] = useState("All Conditions");
const [searchQuery, setSearchQuery] = useState("");
const [sortOption, setSortOption] = useState("newest");
const [showSavedOnly, setShowSavedOnly] = useState(false);
const [showModal, setShowModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
const [showMessageModal, setShowMessageModal] = useState(false);
const [messageText, setMessageText] = useState("");
const [notifications, setNotifications] = useState<{message: string, type: string}[]>([]);
const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
const userMenuRef = useRef<HTMLDivElement>(null);
useEffect(() => {
const handleClickOutside = (event: MouseEvent) => {
if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
setIsUserMenuOpen(false);
}
};
document.addEventListener('mousedown', handleClickOutside);
return () => {
document.removeEventListener('mousedown', handleClickOutside);
};
}, []);
const toggleSaved = (id: string) => {
setProducts(
products.map(product =>
product.id === id ? { ...product, saved: !product.saved } : product
)
);
const product = products.find(p => p.id === id);
if (product) {
const action = !product.saved ? 'saved' : 'removed from saved';
addNotification(`${product.name} ${action}`, 'success');
}
};
const addNotification = (message: string, type: string) => {
const newNotification = { message, type };
setNotifications([...notifications, newNotification]);
setTimeout(() => {
setNotifications(current => current.filter(n => n !== newNotification));
}, 3000);
};
const openProductDetail = (product: Product) => {
setSelectedProduct(product);
setShowModal(true);
};
const openMessageModal = (product: Product) => {
setSelectedProduct(product);
setShowMessageModal(true);
};
const sendMessage = () => {
if (messageText.trim() && selectedProduct) {
addNotification(`Message sent to ${selectedProduct.seller.name}`, 'success');
setMessageText('');
setShowMessageModal(false);
}
};
const handleSellItem = () => {
addNotification('Sell item feature coming soon!', 'info');
};
const filteredProducts = products.filter(product => {
const matchesCategory = activeCategory === "All Categories" || product.category === activeCategory;
const matchesCondition = activeCondition === "All Conditions" || product.condition === activeCondition;
const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
product.description.toLowerCase().includes(searchQuery.toLowerCase());
const matchesSaved = showSavedOnly ? product.saved : true;
return matchesCategory && matchesCondition && matchesSearch && matchesSaved;
});
const sortedProducts = [...filteredProducts].sort((a, b) => {
if (sortOption === "price_low") return a.price - b.price;
if (sortOption === "price_high") return b.price - a.price;
if (sortOption === "newest") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
return 0;
});
return (
<div className="min-h-screen bg-gray-50">
{/* Notifications */}
<div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
{notifications.map((notification, index) => (
<div
key={index}
className={`px-4 py-2 rounded-md shadow-md transition-all duration-300 transform translate-x-0 ${
notification.type === 'success' ? 'bg-green-500 text-white' :
notification.type === 'error' ? 'bg-red-500 text-white' :
'bg-blue-500 text-white'
}`}
>
{notification.message}
</div>
))}
</div>
{/* Header */}
<header className="bg-white shadow-sm">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between items-center h-16">
<div className="flex items-center">
<div className="flex-shrink-0">
<h1 className="text-2xl font-bold text-indigo-600">KampusKart</h1>
</div>
</div>
<div className="flex items-center space-x-4">
<button
className={`text-gray-600 hover:text-gray-900 cursor-pointer ${showSavedOnly ? 'text-indigo-600 font-medium' : ''}`}
onClick={() => setShowSavedOnly(!showSavedOnly)}
>
<i className="fas fa-heart"></i>
<span className="ml-1">Saved</span>
</button>
<button className="text-gray-600 hover:text-gray-900 cursor-pointer" onClick={() => addNotification('No new messages', 'info')}>
<i className="fas fa-comment"></i>
<span className="ml-1">Messages</span>
</button>
<a
  href="http://localhost:3000/listingform"
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button whitespace-nowrap cursor-pointer"
>
  <i className="fas fa-plus mr-2"></i>
  <span>Sell Item</span>
</a>
<div className="relative" ref={userMenuRef}>
<img
src="https://public.readdy.ai/ai/img_res/7285b982f41641a86940239c7459881a.jpg"
alt="User profile"
className="h-8 w-8 rounded-full object-cover cursor-pointer"
onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
/>
{isUserMenuOpen && (
<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
<a href="http://localhost:3000/profile" data-readdy="true" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
{/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>*/}
</div>
)}
</div>
</div>
</div>
</div>
</header>
{/* Main Content */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
{/* Search and Filters */}
<div className="mb-8">
<div className="flex flex-col md:flex-row gap-4 mb-6">
<div className="relative flex-grow">
<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<i className="fas fa-search text-gray-400"></i>
</div>
<input
type="text"
className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
placeholder="Search for items..."
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
</div>
<div className="flex space-x-4">
<div className="relative inline-block text-left">
<select
className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md cursor-pointer"
value={sortOption}
onChange={(e) => setSortOption(e.target.value)}
>
<option value="newest">Newest First</option>
<option value="price_low">Price: Low to High</option>
<option value="price_high">Price: High to Low</option>
</select>
</div>
</div>
</div>
<div className="flex flex-wrap gap-2 mb-4">
{categories.map((category) => (
<button
key={category}
className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${
activeCategory === category
? "bg-indigo-100 text-indigo-800"
: "bg-gray-100 text-gray-800 hover:bg-gray-200"
}`}
onClick={() => setActiveCategory(category)}
>
{category}
</button>
))}
</div>
<div className="flex flex-wrap gap-2">
{conditions.map((condition) => (
<button
key={condition}
className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${
activeCondition === condition
? "bg-indigo-100 text-indigo-800"
: "bg-gray-100 text-gray-800 hover:bg-gray-200"
}`}
onClick={() => setActiveCondition(condition)}
>
{condition}
</button>
))}
</div>
</div>
{/* Product Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{sortedProducts.length > 0 ? (
sortedProducts.map((product) => (
<div
key={product.id}
className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
>
<div className="relative h-48 overflow-hidden">
<img
src={product.image}
alt={product.name}
className="w-full h-full object-cover object-top"
onClick={() => openProductDetail(product)}
/>
<button
className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer"
onClick={(e) => {
e.stopPropagation();
toggleSaved(product.id);
}}
>
<i className={`${product.saved ? 'fas text-red-500' : 'far text-gray-400'} fa-heart`}></i>
</button>
</div>
<div className="p-4">
<div className="flex justify-between items-start mb-2">
<h3
className="text-lg font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer"
onClick={() => openProductDetail(product)}
>
{product.name}
</h3>
<span className="font-bold text-lg text-indigo-600">₹{product.price}</span>
</div>
<p className="text-sm text-gray-500 mb-3">{product.description.substring(0, 80)}...</p>
<div className="flex items-center justify-between">
<div className="flex items-center">
<img
src={product.seller.avatar}
alt={product.seller.name}
className="h-6 w-6 rounded-full mr-2"
/>
<span className="text-sm text-gray-600">{product.seller.name}</span>
</div>
<div className="flex items-center">
<i className="fas fa-star text-yellow-400 mr-1 text-xs"></i>
<span className="text-sm text-gray-600">{product.seller.rating}</span>
</div>
</div>
<div className="mt-3 flex justify-between items-center">
<span className="text-xs text-gray-500">{product.timestamp}</span>
<span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{product.condition}</span>
</div>
</div>
</div>
))
) : (
<div className="col-span-3 py-12 flex flex-col items-center justify-center text-gray-500">
<i className="fas fa-search text-4xl mb-4"></i>
<p className="text-xl font-medium">No products found</p>
<p className="mt-2">Try adjusting your search or filter criteria</p>
</div>
)}
</div>
{/* Load More Button */}
{sortedProducts.length > 0 && (
<div className="mt-8 flex justify-center">
<button
className="bg-white border border-gray-300 rounded-button px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap cursor-pointer"
onClick={() => addNotification('Loading more products...', 'info')}
>
Load More
</button>
</div>
)}
</main>
{/* Footer */}
<footer className="bg-white border-t border-gray-200 mt-12">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
<div className="flex flex-col md:flex-row justify-between items-center">
<div className="mb-4 md:mb-0">
<h2 className="text-xl font-bold text-indigo-600">CampusMarket</h2>
<p className="text-sm text-gray-500 mt-1">The marketplace for university students</p>
</div>
<div className="flex space-x-6">
<a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer">
<i className="fab fa-facebook-f"></i>
</a>
<a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer">
<i className="fab fa-twitter"></i>
</a>
<a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer">
<i className="fab fa-instagram"></i>
</a>
</div>
</div>
<div className="mt-8 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
<p className="text-sm text-gray-500">© 2025 CampusMarket. All rights reserved.</p>
<div className="mt-4 md:mt-0 flex space-x-4">
<a href="#" className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">Privacy Policy</a>
<a href="#" className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">Terms of Service</a>
<a href="#" className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">Contact Us</a>
</div>
</div>
</div>
</footer>
{/* Product Detail Modal */}
{showModal && selectedProduct && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
<div className="p-6">
<div className="flex justify-between items-start mb-4">
<h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
<button
className="text-gray-500 hover:text-gray-700"
onClick={() => setShowModal(false)}
>
<i className="fas fa-times text-xl"></i>
</button>
</div>
<div className="flex flex-col md:flex-row gap-6">
<div className="md:w-1/2">
<div className="rounded-lg overflow-hidden">
<img
src={selectedProduct.image}
alt={selectedProduct.name}
className="w-full h-auto object-cover"
/>
</div>
<div className="mt-4 flex items-center justify-between">
<div className="flex items-center">
<img
src={selectedProduct.seller.avatar}
alt={selectedProduct.seller.name}
className="h-10 w-10 rounded-full mr-3"
/>
<div>
<p className="font-medium">{selectedProduct.seller.name}</p>
<div className="flex items-center">
<i className="fas fa-star text-yellow-400 mr-1 text-xs"></i>
<span className="text-sm text-gray-600">{selectedProduct.seller.rating} · Listed {selectedProduct.timestamp}</span>
</div>
</div>
</div>
<button
className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button whitespace-nowrap"
onClick={() => openMessageModal(selectedProduct)}
>
<i className="fas fa-comment mr-2"></i>
Message
</button>
</div>
</div>
<div className="md:w-1/2">
<div className="flex justify-between items-center mb-4">
<span className="text-3xl font-bold text-indigo-600">${selectedProduct.price}</span>
<button
className="p-2 rounded-full hover:bg-gray-100"
onClick={() => toggleSaved(selectedProduct.id)}
>
<i className={`${selectedProduct.saved ? 'fas text-red-500' : 'far text-gray-400'} fa-heart text-xl`}></i>
</button>
</div>
<div className="mb-4">
<span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-gray-800 text-sm font-medium">
{selectedProduct.condition}
</span>
<span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-gray-800 text-sm font-medium ml-2">
{selectedProduct.category}
</span>
</div>
<div className="mb-6">
<h3 className="text-lg font-medium mb-2">Description</h3>
<p className="text-gray-600">{selectedProduct.description}</p>
</div>
<div className="space-y-4">
<button
className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-button whitespace-nowrap"
onClick={() => {
setShowModal(false);
addNotification(`You've made an offer for ${selectedProduct.name}`, 'success');
}}
>
<i className="fas fa-tag mr-2"></i>
Make an Offer
</button>
<button
className="w-full bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 rounded-button whitespace-nowrap"
onClick={() => {
setShowModal(false);
addNotification(`${selectedProduct.name} has been reported`, 'info');
}}
>
<i className="fas fa-flag mr-2"></i>
Report Item
</button>
</div>
</div>
</div>
</div>
</div>
</div>
)}
{/* Message Modal */}
{showMessageModal && selectedProduct && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className="bg-white rounded-lg max-w-lg w-full">
<div className="p-6">
<div className="flex justify-between items-center mb-4">
<h3 className="text-xl font-bold">Message to {selectedProduct.seller.name}</h3>
<button
className="text-gray-500 hover:text-gray-700"
onClick={() => setShowMessageModal(false)}
>
<i className="fas fa-times"></i>
</button>
</div>
<div className="mb-4">
<p className="text-sm text-gray-600 mb-2">About: {selectedProduct.name}</p>
<textarea
className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
rows={4}
placeholder="Write your message here..."
value={messageText}
onChange={(e) => setMessageText(e.target.value)}
></textarea>
</div>
<div className="flex justify-end space-x-3">
<button
className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 hover:bg-gray-50 whitespace-nowrap"
onClick={() => setShowMessageModal(false)}
>
Cancel
</button>
<button
className="px-4 py-2 bg-indigo-600 text-white rounded-button hover:bg-indigo-700 whitespace-nowrap"
onClick={sendMessage}
disabled={!messageText.trim()}
>
Send Message
</button>
</div>
</div>
</div>
</div>
)}
</div>
);
};
export default App
