let sample_data = require("./data.js");
let Listing = require("../model/listing");
const mongoose = require("mongoose");

main()
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

async function insertData() {
  try {
    await Listing.deleteMany({});

    sample_data.data = sample_data.data.map(data => ({
      ...data,
      owner: "6967ac7d740e743ade769d56",
      geometry: {
        type: "Point",
        coordinates: [77.2090, 28.6139] // Delhi (lng, lat)
      }
    }));

    await Listing.insertMany(sample_data.data);
    console.log("Sample data inserted successfully ✅");
  } catch (err) {
    console.log("Data not inserted ❌", err);
  }
}

insertData();
