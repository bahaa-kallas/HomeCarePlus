import connectToMongoDB from "../config/database.js";
import createServices from "./init-service.js";
import createCategories from "./init-category.js";
import createCurrencies from "./init-currency.js";
import createPaymentMethods from "./init-payment-methods.js";
import createUsers from "./init-users.js";
import createOrders from "./init-order.js";
import createAds from "./init-ad.js";

console.log("Connecting to MongoDB...");
await connectToMongoDB();
console.log("Connected to MongoDB.");

console.log("Inserting users...");
const users = await createUsers();
console.log(`Inserted ${users.length} users.`);

console.log("Inserting categories...");
const categories = await createCategories();
console.log(`Inserted ${categories.length} categories.`);

console.log("Inserting currencies...");
const currencies = await createCurrencies();
console.log(`Inserted ${currencies.length} currencies.`);

console.log("Inserting payment methods...");
const paymentMethods = await createPaymentMethods();
console.log(`Inserted ${paymentMethods.length} payment methods.`);

console.log("Inserting services...");
const services = await createServices(currencies, paymentMethods, categories);
console.log(`Inserted ${services.length} services.`);

console.log("Inserting orders...");
const orders = await createOrders(users, services);
console.log(`Inserted ${orders.length} orders.`);

console.log("Inserting ads...");
const ads = await createAds(services);
console.log(`Inserted ${ads.length} ads.`);

console.log("Bootstrap process completed successfully.");
