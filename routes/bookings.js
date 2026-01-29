const express = require("express");
const router = express.Router({ mergeParams: true });

const Booking = require("../models/booking");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware");

// CREATE booking
router.post("/", isLoggedIn, async (req, res) => {
  const { startDate, endDate } = req.body;
  const { id } = req.params; // listing id

  if (new Date(startDate) >= new Date(endDate)) {
    req.flash("error", "Check-out date must be after check-in date");
    return res.redirect(`/listings/${id}`);
  }

  // 🔥 availability check
  const conflictingBooking = await Booking.findOne({
    listing: id,
    status: "confirmed",
    startDate: { $lt: new Date(endDate) },
    endDate: { $gt: new Date(startDate) },
  });

  if (conflictingBooking) {
    req.flash("error", "Selected dates are not available");
    return res.redirect(`/listings/${id}`);
  }

  const listing = await Listing.findById(id);

  const days =
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

  const totalPrice = days * listing.price;

  const booking = new Booking({
    listing: id,
    user: req.user._id,
    startDate,
    endDate,
    totalPrice,
  });

  await booking.save();

  req.flash("success", "Booking confirmed 🎉");
  res.redirect(`/listings/${id}`);
});

module.exports = router;
