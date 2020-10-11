"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const express_graphql_1 = require("express-graphql");
const app = express();
const PORT = 1488;
const schema_1 = require("../graphql/schema");
app.use(cors());
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schema_1.schema,
    graphiql: true,
}));
app.get("/", (req, res) => {
    res.end("GraphQl");
});
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});
