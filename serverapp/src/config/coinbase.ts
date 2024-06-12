import coinbase from "coinbase-commerce-node";

const Client = coinbase.Client;

const CoinbaseClient = Client.init(process.env.COINBASE_KEY);

export default CoinbaseClient;