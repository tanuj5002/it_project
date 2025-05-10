// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useRef } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    price: '',
    description: '',
    deliveryMethod: 'both',
    location: '',
    paymentMethods: [] as string[],
    availability: {
      weekdays: true,
      weekends: true,
      evenings: true
    }
  });
  const [Ifiles, setIFiles] = useState<File[]>([])
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    "Textbooks",
    "Electronics",
    "Furniture",
    "Clothing",
    "School Supplies",
    "Musical Instruments",
    "Sports Equipment",
    "Appliances",
    "Tickets",
    "Other"
  ];

  const conditions = [
    "New",
    "Like New",
    "Good",
    "Fair",
    "Poor"
  ];

  const paymentOptions = [
    "Cash",
    "Venmo",
    "PayPal",
    "Zelle",
    "Apple Pay",
    "Bank Transfer"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.startsWith('payment-')) {
      const payment = name.replace('payment-', '');
      const updatedPayments = checked 
        ? [...formData.paymentMethods, payment]
        : formData.paymentMethods.filter(method => method !== payment);
      
      setFormData({
        ...formData,
        paymentMethods: updatedPayments
      });
    } else if (name.startsWith('availability-')) {
      const availabilityKey = name.replace('availability-', '') as keyof typeof formData.availability;
      setFormData({
        ...formData,
        availability: {
          ...formData.availability,
          [availabilityKey]: checked
        }
      });
    }
  };

  const handleDeliveryMethodChange = (method: string) => {
    setFormData({
      ...formData,
      deliveryMethod: method
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (images.length + files.length > 6) {
      setErrors({
        ...errors,
        images: 'Maximum 6 images allowed'
      });
      return;
    }

    // In a real app, we'd upload these files to a server
    // Here we'll just create object URLs for preview
    const newImages: string[] = [];
    
    // For demo purposes, we'll use Stable Diffusion generated images
    // const stableDiffusionImages = [
    //   'https://public.readdy.ai/ai/img_res/b5f5bf94359e542c89e0827c766036ba.jpg',
    //   'https://public.readdy.ai/ai/img_res/ab14b49538dca84e7528764150c70fca.jpg',
    //   'https://public.readdy.ai/ai/img_res/3fdc585a6e00b03338990cbc55832fee.jpg',
    //   'https://public.readdy.ai/ai/img_res/eee84a9eef7529f702bab2a713c17bfb.jpg',
    //   'https://public.readdy.ai/ai/img_res/0212e3b33491cfb327738cc71a6e2278.jpg',
    //   'https://public.readdy.ai/ai/img_res/c6b4512ee550d84a60e395b9a837acd6.jpg'
    // ];
    
    // for (let i = 0; i < Math.min(files.length, 6 - images.length); i++) {
    //   // In a real app, we'd upload the file and get back a URL
    //   // For this demo, we'll use our pre-defined stable diffusion images
    //   newImages.push(stableDiffusionImages[Math.min(i, stableDiffusionImages.length - 1)]);
    // }
    const filesArray = Array.from(files);
    const newImageUrls = filesArray.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImageUrls]);
    setIFiles(prev => [...prev, ...filesArray]);
    
    // Clear any previous image errors
    if (errors.images) {
      setErrors({
        ...errors,
        images: ''
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Price must be a valid number';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.deliveryMethod === 'pickup' && !formData.location.trim()) {
      newErrors.location = 'Location is required for pickup';
    }
    
    if (formData.paymentMethods.length === 0) {
      newErrors.paymentMethods = 'At least one payment method is required';
    }
    
    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (isDraft: boolean) => {
    if (!isDraft && !validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    const sellerId = "67f6c2aaf02a202c3be89bdc"
    const formDataToSend = new FormData();
formDataToSend.append("seller", sellerId);
formDataToSend.append("title", formData.title);
formDataToSend.append("description", formData.description);
formDataToSend.append("price", formData.price);
formDataToSend.append("condition", formData.condition);
formDataToSend.append("category", formData.category);
formDataToSend.append("status", "Available");

// Add the image file
if (Ifiles[0]) {
  formDataToSend.append("testImage", Ifiles[0]); // 'image' should match backend field
}
    axios.post("http://localhost:5001/api/listing/new", formDataToSend,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
    console.log('Form submitted:', { ...formData, images, isDraft });
    
    // For demo purposes, we'll just show an alert
    alert(isDraft ? 'Listing saved as draft!' : 'Listing published successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a 
                href="https://readdy.ai/home/62a88c4d-aac8-4b26-8141-65107abda862/cb5d451d-23fc-473e-9eae-029acf2141ed" 
                data-readdy="true"
                className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                <span>Back to Profile</span>
              </a>
              <div className="ml-6 flex-shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600">KampusKart</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                <i className="fas fa-heart"></i>
                <span className="ml-1">Saved</span>
              </button>
              <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                <i className="fas fa-comment"></i>
                <span className="ml-1">Messages</span>
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-plus mr-2"></i>
                <span>Sell Item</span>
              </button>
              <div className="relative">
                <img
                  src="https://public.readdy.ai/ai/img_res/9d2a7b3f4e6c8a1d5b2e7f9c3a6d8e2b.jpg"
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New Listing</h2>
          <p className="text-gray-600 mt-1">Fill out the details below to list your item for sale</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                <h3 className="text-lg font-medium text-indigo-800">
                  <i className="fas fa-info-circle mr-2"></i>
                  Basic Information
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                    placeholder="e.g., MacBook Pro 2023, Calculus Textbook, etc."
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none pr-10`}
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                  </div>

                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                      Condition <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${errors.condition ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none pr-10`}
                      >
                        <option value="">Select condition</option>
                        {conditions.map((condition) => (
                          <option key={condition} value={condition}>{condition}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                    {errors.condition && <p className="mt-1 text-sm text-red-500">{errors.condition}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={`w-full pl-7 pr-4 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>
              </div>
            </div>

            {/* Item Details */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                <h3 className="text-lg font-medium text-indigo-800">
                  <i className="fas fa-align-left mr-2"></i>
                  Item Details
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                    placeholder="Describe your item in detail. Include information about its features, condition, age, and any other relevant details."
                  ></textarea>
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                  <p className="mt-2 text-sm text-gray-500">
                    {formData.description.length}/1000 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photos <span className="text-red-500">*</span> <span className="text-gray-500 text-xs">(Up to 6 photos)</span>
                  </label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer ${dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'} ${errors.images ? 'border-red-500' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-3"></i>
                    <p className="text-sm text-gray-600 mb-1">Drag and drop your photos here</p>
                    <p className="text-xs text-gray-500">or</p>
                    <button 
                      type="button" 
                      className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-button text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap cursor-pointer"
                    >
                      Browse Files
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                  </div>
                  {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}

                  {images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Photos ({images.length}/6)</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={image} 
                              alt={`Upload ${index + 1}`} 
                              className="h-32 w-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                              <div className="hidden group-hover:flex space-x-2">
                                {index > 0 && (
                                  <button 
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      reorderImages(index, index - 1);
                                    }}
                                    className="bg-white rounded-full p-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                                  >
                                    <i className="fas fa-arrow-left text-xs"></i>
                                  </button>
                                )}
                                <button 
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(index);
                                  }}
                                  className="bg-white rounded-full p-2 text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                  <i className="fas fa-trash-alt text-xs"></i>
                                </button>
                                {index < images.length - 1 && (
                                  <button 
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      reorderImages(index, index + 1);
                                    }}
                                    className="bg-white rounded-full p-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                                  >
                                    <i className="fas fa-arrow-right text-xs"></i>
                                  </button>
                                )}
                              </div>
                            </div>
                            {index === 0 && (
                              <div className="absolute top-0 left-0 bg-indigo-500 text-white text-xs px-2 py-1 rounded-tl-lg rounded-br-lg">
                                Main Photo
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Listing Preferences */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                <h3 className="text-lg font-medium text-indigo-800">
                  <i className="fas fa-sliders-h mr-2"></i>
                  Listing Preferences
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Delivery Method <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => handleDeliveryMethodChange('pickup')}
                      className={`flex items-center px-4 py-2 rounded-button border ${
                        formData.deliveryMethod === 'pickup' 
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      } whitespace-nowrap cursor-pointer`}
                    >
                      <i className={`fas fa-map-marker-alt mr-2 ${formData.deliveryMethod === 'pickup' ? 'text-indigo-500' : 'text-gray-400'}`}></i>
                      Pickup Only
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeliveryMethodChange('delivery')}
                      className={`flex items-center px-4 py-2 rounded-button border ${
                        formData.deliveryMethod === 'delivery' 
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      } whitespace-nowrap cursor-pointer`}
                    >
                      <i className={`fas fa-shipping-fast mr-2 ${formData.deliveryMethod === 'delivery' ? 'text-indigo-500' : 'text-gray-400'}`}></i>
                      Delivery Only
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeliveryMethodChange('both')}
                      className={`flex items-center px-4 py-2 rounded-button border ${
                        formData.deliveryMethod === 'both' 
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      } whitespace-nowrap cursor-pointer`}
                    >
                      <i className={`fas fa-check-circle mr-2 ${formData.deliveryMethod === 'both' ? 'text-indigo-500' : 'text-gray-400'}`}></i>
                      Both Options
                    </button>
                  </div>
                </div>

                {(formData.deliveryMethod === 'pickup' || formData.deliveryMethod === 'both') && (
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-map-marker-alt text-gray-400"></i>
                      </div>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                        placeholder="e.g., University Library, Student Center, etc."
                      />
                    </div>
                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Methods <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {paymentOptions.map((method) => (
                      <div key={method} className="flex items-center">
                        <input
                          id={`payment-${method}`}
                          name={`payment-${method}`}
                          type="checkbox"
                          checked={formData.paymentMethods.includes(method)}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`payment-${method}`} className="ml-2 block text-sm text-gray-700">
                          {method}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.paymentMethods && <p className="mt-1 text-sm text-red-500">{errors.paymentMethods}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Availability
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center">
                      <input
                        id="availability-weekdays"
                        name="availability-weekdays"
                        type="checkbox"
                        checked={formData.availability.weekdays}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="availability-weekdays" className="ml-2 block text-sm text-gray-700">
                        Weekdays
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="availability-weekends"
                        name="availability-weekends"
                        type="checkbox"
                        checked={formData.availability.weekends}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="availability-weekends" className="ml-2 block text-sm text-gray-700">
                        Weekends
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="availability-evenings"
                        name="availability-evenings"
                        type="checkbox"
                        checked={formData.availability.evenings}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="availability-evenings" className="ml-2 block text-sm text-gray-700">
                        Evenings
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                <h3 className="text-lg font-medium text-indigo-800">
                  <i className="fas fa-eye mr-2"></i>
                  Preview
                </h3>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative h-48 bg-gray-200">
                    {images.length > 0 ? (
                      <img 
                        src={images[0]} 
                        alt="Item preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <i className="fas fa-image text-4xl"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {formData.title || "Item Name"}
                    </h3>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-lg text-indigo-600">
                        {formData.price ? `₹${formData.price}` : "₹0.00"}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {formData.condition || "Condition"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {formData.description || "Item description will appear here..."}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.category && (
                        <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                          {formData.category}
                        </span>
                      )}
                      {formData.deliveryMethod === 'pickup' && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          <i className="fas fa-map-marker-alt mr-1"></i>
                          Pickup Only
                        </span>
                      )}
                      {formData.deliveryMethod === 'delivery' && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          <i className="fas fa-shipping-fast mr-1"></i>
                          Delivery Only
                        </span>
                      )}
                      {formData.deliveryMethod === 'both' && (
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                          <i className="fas fa-check-circle mr-1"></i>
                          Pickup & Delivery
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="fas fa-user-circle mr-1"></i>
                      <span>Michael Thompson</span>
                      <span className="mx-2">•</span>
                      <span>April 2, 2025</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <p className="text-sm text-gray-500">
                    <i className="fas fa-info-circle mr-1"></i>
                    This is how your listing will appear to others.
                  </p>
                  <div className="flex items-center text-sm text-indigo-600">
                    <i className="fas fa-check-circle mr-1"></i>
                    <span className="font-medium">Listing completion:</span>
                    <div className="ml-2 flex-grow bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min(
                            100, 
                            (Object.keys(formData).filter(key => {
                              if (key === 'paymentMethods') return formData.paymentMethods.length > 0;
                              if (key === 'availability') return true;
                              if (key === 'location') {
                                return formData.deliveryMethod !== 'pickup' || formData.location.trim() !== '';
                              }
                              return formData[key as keyof typeof formData] !== '';
                            }).length / 6) * 100 + (images.length > 0 ? 16.6 : 0)
                          )}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className="px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-button text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap cursor-pointer"
            >
              <i className="fas fa-save mr-2"></i>
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => {
                handleSubmit(false)
                console.log(formData)}}
              className="px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-button text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap cursor-pointer"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Publish Listing
            </button>
          </div>
        </div>
        
        {/* Spacing to account for fixed button bar */}
        <div className="h-24"></div>
      </main>
    </div>
  );
};

export default App;

