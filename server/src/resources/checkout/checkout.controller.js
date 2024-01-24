const stripe = require("stripe")("sk_test_51OZsmwGEGALpabhRFFNN7pra0yGfAgPhH88Fwx8fKuNwSeOBwhYGgfNozakyL9GNAdCcvXUyoPMXNmKpzxkK5xjT00dpBSK0Dv");
const CLIENT_URL = "http://localhost:5173";
const fs = require("fs");
// const { getProductsById } = require("../product/product.controller");
const { ProductModel } = require("../product/product.model")


async function fetchProductDetails(productId) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      return product; // Returnera hela produktobjektet
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  }

async function checkout(req, res) {
    try {
      const items = req.body;
      console.log("Request body:", items);
     
      // Hämta pris-ID och annan information från MongoDB-databas baserat på produkt-ID
      const lineItems = await Promise.all(
        items.map(async (item) => {
          const product = await fetchProductDetails(item._id); // Hämta hela produktobjektet
          if (!product.price_id) {
            throw new Error(`No Stripe price ID found for product ID ${item._id}`);
          }
          return {
            price: product.price_id, // Använd Stripe-pris-ID:t här
            quantity: item.quantity,
          };
        })
      );
   
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${CLIENT_URL}/confirmation`,
        cancel_url: CLIENT_URL,
        allow_promotion_codes: true,
      });
      res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (error) {
      console.log(error);
      res.status(400).json("Det gick inte så bra");
    }
  }

// // Inkludera fetchProductFromDatabase-funktionen här
// async function fetchProductFromDatabase(productId) {
//     try {
//         console.log("Fetching product for productId:", productId);

//         const productData = await getProductsById({ params: { id: productId } });
//         console.log("Result from ProductModel.findById:", productData);

//         if (!productData) {
//             console.error('Produkten kunde inte hämtas från databasen: Ingen data returnerad.');
//             return null;
//         }

//         // Lägg till loggar för att inspektera productData
//         console.log("Product Data:", JSON.stringify(productData, null, 2));

//         if (productData.error) {
//             console.error('Fel vid hämtning av produkt från databasen:', productData.error);
//             return null;
//         }

//         if (!productData.title || !productData.images || productData.price === undefined) {
//             console.error('Produkten saknar nödvändig information.');
//             return null;
//         }

//         return {
//             title: productData.title,
//             images: productData.images,
//             price: productData.price,
//             // ... andra produktattribut
//         };
//     } catch (error) {
//         console.error('Fel vid hämtning av produkt från databasen:', error.message);
//         return null;
//     }
// }



// async function checkout(req, res, next) {
//     console.log("Inuti checkout");
//     try {
//         const cartItems = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

//         const validProducts = await Promise.all(cartItems.map(async (item) => {
//             console.log("Fetching product for productId:", item.productId);
//             const productData = await fetchProductFromDatabase(item.productId);

//             if (!productData) {
//                 console.error('Produkten kunde inte hämtas från databasen.');
//                 // Skicka felmeddelande till klienten
//                 return {
//                     error: 'Produkten kunde inte hämtas från databasen.',
//                 };
//             }

//             if (productData.error) {
//                 console.error('Fel vid hämtning av produkt från databasen:', productData.error);
//                 // Skicka felmeddelande till klienten
//                 return {
//                     error: 'Fel vid hämtning av produkt från databasen: ' + productData.error,
//                 };
//             }

//             console.log("Product Data for productId:", item.productId, ":", JSON.stringify(productData, null, 2));

//             return {
//                 price_data: {
//                     currency: 'sek',
//                     product_data: {
//                         name: productData.title || "Okänt namn",
//                         images: productData.images ? [productData.images[0]] : [],
//                     },
//                     unit_amount: Math.round((productData.price || 0) * 100),
//                 },
//                 quantity: item.quantity,
//             };
//         }));

//         console.log("Valid Products:", validProducts);

//         const line_items = validProducts.filter(product => !product.error);

//         console.log("Line Items:", line_items);

//         if (line_items.length === 0) {
//             console.error("Inga produkter i kundvagnen.");
//             return res.status(400).json({ error: "Inga produkter i kundvagnen." });
//         }

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: line_items,
//             mode: "payment",
//             success_url: `${CLIENT_URL}/confirmation`,
//             cancel_url: CLIENT_URL,
//         });

//         console.log("Stripe Checkout Session:", session);

//         return res.status(200).json({ url: session.url, sessionId: session.id });

//     } catch (error) {
//         console.error("Fel i checkout:", error.message);
//         return res.status(400).json("Det gick inte så bra");
//     }
// }





// async function verify(req, res) {
//     try {
//         const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

//         if (session.payment_status !== "paid") {
//             return res.status(400).json({ verified: false });
//         }

//         const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);

//         let existingOrders = [];

//         if (fs.existsSync(filePath)) {
//             const fileData = fs.readFileSync(filePath, "utf8");
//             existingOrders = JSON.parse(fileData);
//         }

//         if (!Array.isArray(existingOrders)) {
//             existingOrders = [];
//         }

//         const order = {
//             created: session.created,
//             customer: session.customer_details.name,
//             email: session.customer_details.email,
//             products: line_items.data.map(item => {
//                 return {
//                     product: item.description,
//                     quantity: item.quantity,
//                     price: item.price.unit_amount / 100,
//                 };
//             }),
//         };

//         console.log("ORDER", order);
//         existingOrders.push(order);

//         const jsonData = JSON.stringify(existingOrders, null, 2);

//         fs.writeFileSync(filePath, jsonData);
//         res.status(200).json({ verified: true });

//     } catch (error) {
//         console.error('Fel vid verify:', error.message);
//         next(error); // Skicka vidare felet till felhanteringsmiddleware
//     }
// }

module.exports = { checkout };
