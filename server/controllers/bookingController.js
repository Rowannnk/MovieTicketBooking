import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import stripe from "stripe";

//function to check availability seats for a movie
const checkSeatAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) {
      return false;
    }
    const occupiedSeats = showData.occupiedSeats;

    //occupied seat shi m shi check shi yin true
    const isAnySeatsTaken = selectedSeats.some((seat) => occupiedSeats[seat]);

    return !isAnySeatsTaken;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = req.user;
    const { showId, selectedSeats } = req.body;
    //for payment from frontend url
    const { origin } = req.headers;

    //check if seate is available for selected show
    const isAvailable = await checkSeatAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected seats are not available",
      });
    }
    //get the show details
    const showData = await Show.findById(showId).populate("movie");

    //create a booking
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    selectedSeats.map((seat) => {
      showData.occupiedSeats[seat] = userId;
    });
    showData.markModified("occupiedSeats");
    await showData.save();

    //stripe gateway initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    //creating line items for stripe
    const line_items = [
      {
        price_data: {
          currency: "thb",
          product_data: {
            name: showData.movie.title,
          },
          unit_amount: Math.floor(booking.amount) * 100,
        },
        quantity: 1,
      },
    ];
    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      line_items: line_items,
      mode: "payment",
      metadata: {
        bookingId: booking._id.toString(),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, //expires in 30 minutes
    });

    booking.paymentLink = session.url;
    await booking.save();

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);

    const occupiedSeats = Object.keys(showData.occupiedSeats);
    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
