import express from "express";
const router = express.Router();
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PHQDLK6iiXprWrjkqh3kB2Q2mfNvDVqJDCzTS5O0DE7ne5wbJSPC7sLgcwhHPbL0DCZ8nU0MSNnumLLJZ9YPOw700ynUjnO0B"
);

import sendEmail from "../utills/nodemailerConfig.js"; // Update the path

router.post("/create-checkout-session", async (req, res) => {
  const dummyQuantity = 1; // Set a dummy quantity number

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.img.secure_url],
          metadata: {
            id: item.id,
            category: item.category, // You can add category as metadata
          },
        },
        unit_amount: item.price,
      },
      quantity: dummyQuantity, // Use the dummy quantity number
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "PK", "IN", "BD"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    // Send email on successful payment
    await sendEmail(
      "zainwaseem9371@gmail.com", // Assuming you have the user's email in the request body
      "Product",
      "Your Product is successfully ordered."
    );

    res.send({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({ error: "Something went wrong" });
  }
});



// router.post("/create-checkout-session", async (req, res) => {
//   console.log(req.body.cartItems);
//   try {
//     const line_items = req.body.cartItems.map((item) => {
//       return {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.title,
//           },
//           unit_amount: item.price,
//         },
//       };
//     });

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       shipping_address_collection: {
//         allowed_countries: ["US", "CA", "PK", "IN", "BD"],
//       },
//       shipping_options: [
//         {
//           shipping_rate_data: {
//             type: "fixed_amount",
//             fixed_amount: {
//               amount: 0,
//               currency: "usd",
//             },
//             display_name: "Free shipping",
//             // Delivers between 5-7 business days
//             delivery_estimate: {
//               minimum: {
//                 unit: "business_day",
//                 value: 5,
//               },
//               maximum: {
//                 unit: "business_day",
//                 value: 7,
//               },
//             },
//           },
//         },
//         {
//           shipping_rate_data: {
//             type: "fixed_amount",
//             fixed_amount: {
//               amount: 1500,
//               currency: "usd",
//             },
//             display_name: "Next day air",
//             delivery_estimate: {
//               minimum: {
//                 unit: "business_day",
//                 value: 1,
//               },
//               maximum: {
//                 unit: "business_day",
//                 value: 1,
//               },
//             },
//           },
//         },
//       ],
//       phone_number_collection: {
//         enabled: true,
//       },
//       line_items,
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/checkout-success`,
//       cancel_url: `${process.env.CLIENT_URL}/cart`,
//     });

//     res.send({ url: session.url });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).send("Error creating checkout session");
//   }
// });

export default router;
