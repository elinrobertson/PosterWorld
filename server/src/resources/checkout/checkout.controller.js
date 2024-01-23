const stripe = require("stripe")("sk_test_51OZsmwGEGALpabhRFFNN7pra0yGfAgPhH88Fwx8fKuNwSeOBwhYGgfNozakyL9GNAdCcvXUyoPMXNmKpzxkK5xjT00dpBSK0Dv");
const CLIENT_URL = "http://localhost:5173";
const fs = require("fs");
const { getProductsById } = require("../product/product.controller");

// Inkludera fetchProductFromDatabase-funktionen här
async function fetchProductFromDatabase(productId) {
    try {
        console.log("Fetching product for productId:", productId);

        const productData = await getProductsById({ params: { id: productId } });
        console.log("Result from ProductModel.findById:", productData);

        if (!productData) {
            console.error('Produkten kunde inte hämtas från databasen: Ingen data returnerad.');
            return null;
        }

        if (productData.error) {
            console.error('Fel vid hämtning av produkt från databasen:', productData.error);
            return null;
        }

        if (!productData.title || !productData.images || productData.price === undefined) {
            console.error('Produkten saknar nödvändig information.');
            return null;
        }

        return {
            title: productData.title,
            images: productData.images,
            price: productData.price,
            // ... andra produktattribut
        };
    } catch (error) {
        console.error('Fel vid hämtning av produkt från databasen:', error.message);
        return null;
    }
}

async function checkout(req, res, next) {
    console.log("Inuti checkout");
    try {
        const cartItems = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

        const validProducts = await Promise.all(cartItems.map(async (item) => {
            console.log("Fetching product for productId:", item.productId);
            const productData = await fetchProductFromDatabase(item.productId);

            if (!productData) {
                console.error('Produkten kunde inte hämtas från databasen.');
                // Skicka felmeddelande till klienten
                return {
                    error: 'Produkten kunde inte hämtas från databasen.',
                };
            }

            if (productData.error) {
                console.error('Fel vid hämtning av produkt från databasen:', productData.error);
                // Skicka felmeddelande till klienten
                return {
                    error: 'Fel vid hämtning av produkt från databasen: ' + productData.error,
                };
            }

            return {
                price_data: {
                    currency: 'sek',
                    product_data: {
                        name: productData.title || "Okänt namn",
                        images: productData.images ? [productData.images[0]] : [],
                    },
                    unit_amount: Math.round((productData.price || 0) * 100),
                },
                quantity: item.quantity,
            };
        }));

        const line_items = validProducts.filter(product => !product.error);

        if (line_items.length === 0) {
            console.error("Inga produkter i kundvagnen.");
            return res.status(400).json({ error: "Inga produkter i kundvagnen." });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: "payment",
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL,
        });

        return res.status(200).json({ url: session.url, sessionId: session.id });

    } catch (error) {
        console.error("Fel i checkout:", error.message);
        return res.status(400).json("Det gick inte så bra");
    }
}








async function verify(req, res) {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

        if (session.payment_status !== "paid") {
            return res.status(400).json({ verified: false });
        }

        const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);

        let existingOrders = [];

        if (fs.existsSync(filePath)) {
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
                    price: item.price.unit_amount / 100,
                };
            }),
        };

        console.log("ORDER", order);
        existingOrders.push(order);

        const jsonData = JSON.stringify(existingOrders, null, 2);

        fs.writeFileSync(filePath, jsonData);
        res.status(200).json({ verified: true });

    } catch (error) {
        console.error('Fel vid verify:', error.message);
        next(error); // Skicka vidare felet till felhanteringsmiddleware
    }
}

module.exports = { checkout, verify };
