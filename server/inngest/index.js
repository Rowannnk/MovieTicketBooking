import { Inngest } from "inngest";
import User from "../models/User.js";

//need to sync with inngest (https://app.inngest.com/env/production/apps) after deploying on vercel

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

//inngest function to save user data to a database
const userCreation = inngest.createFunction(
  { id: "user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.create(userData);
  }
);

//inngest function to delete user data to a database
const userDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

//inngest function to update user data to a database
const userUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.findByIdAndUpdate(id, userData);
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [userCreation, userDeletion, userUpdation];
