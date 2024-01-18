const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://localhost:5173"
const fs = require("fs");
const filePath = "./db/orders.json";

async function checkout (req, res) {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.map(item => {
                return {
                    price: item.id,
                    quantity: item.quantity,
                }
            }),
            mode: "payment",
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL,
            allow_promotion_codes: true
        });

        res.status(200).json({ url: session.url, sessionId: session.id })
        
    } catch (error) {
        console.log(error);
        res.status(400).json("Det gick inte så bra")
    }
}

async function verify(req, res) {
    
   try {
       const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

        if(session.payment_status != "paid") {
            return res.status(400).json({ verified: false });
        }

        const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);

        let existingOrders = [];

        if(fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, "utf8");
            existingOrders = JSON.parse(fileData);
        }

        if (!Array.isArray(existingOrders)) {
            existingOrders = [];
          }
        
        const order = {
            created: session.created,
            customer: session.customer_details.name,
            email: session.customer_details.email,
            products: line_items.data.map(item => {
                return {
                    product: item.description,
                    quantity: item.quantity,
                    price: item.price.unit_amount/100,
                }
            })
        }
        console.log("ORDER", order)
        existingOrders.push(order);

        const jsonData = JSON.stringify(existingOrders, null, 2);

        fs.writeFileSync(filePath, jsonData)
        res.status(200).json({ verified: true });

   } catch (error) {
       console.log(error.message);
       res.status(500).json({ error: "Ett fel uppstod vid behandling av ordern." });
   }
  }
  


module.exports = { checkout, verify }