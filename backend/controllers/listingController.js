// const asyncHandler = require("express-async-handler");
// const Listing = require("../models/listingModel");
// const upload = require("../middleware/fileUpload");

// //@desc create listing
// //@route POST /listing
// //@access public
// const createListing = asyncHandler(async (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Request to create a listing");
//       // const {seller, title, description, price, condition, category} = req.body
//       const seller = req.body.seller;
//       const title = req.body.title;
//       const description = req.body.description;
//       const price = req.body.price;
//       const condition = req.body.condition;
//       const category = req.body.category;
//       const image = req.file;

//       if (
//         !seller ||
//         !title ||
//         !description ||
//         !price ||
//         !condition ||
//         !category
//       ) {
//         res.status(400);
//         throw new Error("All fields are mandatory");
//       }
//       if (image) {
//         upload(req, res, (err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             const newListing = new Listing({
//               seller: seller,
//               title: title,
//               description: description,
//               price: price,
//               condition: condition,
//               category: category,
//               image: { data: req.file.filename, contentType: "image/png" },
//             });
//             newListing
//               .save()
//               .then(() =>
//                 res
//                   .status(200)
//                   .json({ id: newListing._id, title: newListing.title })
//               )
//               .catch((err) => {
//                 console.log(err);
//                 throw new Error("Error occured while upload");
//               });
//           }
//         });
//       } else {
//         const newListing = new Listing({
//           seller: seller,
//           title: title,
//           description: description,
//           price: price,
//           condition: condition,
//           category: category,
//         });
//         const save = newListing.save();
//         if (save) {
//           res.status(200).json({ id: newListing._id, title: newListing.title });
//         }
//       }
//     }
//   });
// });

// //   console.log("Request to create a listing");
// //   // const {seller, title, description, price, condition, category} = req.body
// //   const seller = req.body.seller;
// //   const title = req.body.title;
// //   const description = req.body.description;
// //   const price = req.body.price;
// //   const condition = req.body.condition;
// //   const category = req.body.category;
// //   const image = req.file;
// //   console.log(seller, title);
// //   if (!seller || !title || !description || !price || !condition || !category) {
// //     res.status(400);
// //     throw new Error("All fields are mandatory");
// //   }
// //   if (image) {
// //     upload(req, res, (err) => {
// //       if (err) {
// //         console.log(err);
// //       } else {
// //         const newListing = new Listing({
// //           seller: seller,
// //           title: title,
// //           description: description,
// //           price: price,
// //           condition: condition,
// //           category: category,
// //           image: { data: req.file.filename, contentType: "image/png" },
// //         });
// //         newListing
// //           .save()
// //           .then(() =>
// //             res
// //               .status(200)
// //               .json({ id: newListing._id, title: newListing.title })
// //           )
// //           .catch((err) => {
// //             console.log(err);
// //             throw new Error("Error occured while upload");
// //           });
// //       }
// //     });
// //   } else {
// //     const newListing = new Listing({
// //       seller: seller,
// //       title: title,
// //       description: description,
// //       price: price,
// //       condition: condition,
// //       category: category,
// //     });
// //     const save = await newListing.save();
// //     if (save) {
// //       res.status(200).json({ id: newListing._id, title: newListing.title });
// //     } else {
// //       res.status(400);
// //       throw new Error("Server error");
// //     }
// //   }
// // });

// module.exports = createListing;

const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingModel");
const User = require('../models/userModel')

// @desc    Create a listing
// @route   POST /listing
// @access  Public
const createListing = asyncHandler(async (req, res) => {
  const { seller, title, description, price, condition, category } = req.body;
  const image = req.file;

  if (!seller || !title || !description || !price || !condition || !category) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const newListing = new Listing({
    seller,
    title,
    description,
    price,
    condition,
    category,
    ...(image && {
      image: {
        data: image.filename,
        contentType: image.mimetype,
      },
    }),
  });

  const savedListing = await newListing.save();

  res.status(201).json({
    id: savedListing._id,
    title: savedListing.title,
  });
});

// @desc    GET all listings
// @route   GET /listings
// @access  Public

const getListings = asyncHandler(async(req, res) =>{
  const listings = await Listing.find({}).populate("seller", "fullName email phone")
  if(!listings){
    throw new Error("No listings found")
  }
  res.json(listings)
})

// @desc    GET listings of a user
// @route   GET /currlistings/:id
// @access  Public

const userListings = asyncHandler(async(req, res) =>{
  const listings = await Listing.find({seller:req.params.id});
  if(!listings){
    throw new Error("No listings found")
  }
  res.json(listings)
})

// @desc    GET saved listings of a user
// @route   GET /savelistings/:id
// @access  Public
const savedListings = asyncHandler(async(req, res) =>{
  const user = await User.findById(req.params.id)
  if(!user){
    throw new Error("No user exits")
  }
  const sListings = await Listing.find({_id:{$in:user.savedItems}}).populate("seller", "fullName email phone");
  if(!sListings){
    throw new Error("No listings found")
  }
  res.json(sListings);
})

module.exports = {createListing, getListings, userListings, savedListings};

