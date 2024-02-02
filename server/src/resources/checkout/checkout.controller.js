const stripe = require("stripe")("sk_test_51OZsmwGEGALpabhRFFNN7pra0yGfAgPhH88Fwx8fKuNwSeOBwhYGgfNozakyL9GNAdCcvXUyoPMXNmKpzxkK5xjT00dpBSK0Dv");
const CLIENT_URL = "http://localhost:5173";
const { ProductModel } = require("../product/product.model")


async function fetchProductDetails(productId) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      return product;
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


module.exports = { checkout };
