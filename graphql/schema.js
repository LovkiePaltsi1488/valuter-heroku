"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql = __importStar(require("graphql"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const toFixed_1 = require("../helpers/toFixed");
// import { Currency } from "../interfaces/currency";
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, } = graphql;
const fetchCur = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield node_fetch_1.default("https://www.cbr-xml-daily.ru/daily_json.js");
    const data = yield response.json();
    return data;
});
const fetchValute = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetchCur();
    const valute = Object.entries(data.Valute).map(([key, el]) => el);
    const res = {};
    for (const { Value, Previous, Name, CharCode, ID, NumCode, Nominal, } of valute) {
        res[CharCode] = {
            ID,
            Name,
            CharCode,
            NumCode,
            Nominal: Number.parseInt(Nominal),
            Value: toFixed_1.toFixed(Number.parseFloat(Value)),
            Previous: toFixed_1.toFixed(Number.parseFloat(Previous)),
        };
    }
    return res;
});
const Currency = new GraphQLObjectType({
    name: "Currency",
    fields: () => ({
        ID: { type: GraphQLString },
        NumCode: { type: GraphQLString },
        CharCode: { type: GraphQLString },
        Nominal: { type: GraphQLInt },
        Name: { type: GraphQLString },
        Value: { type: GraphQLFloat },
        Previous: { type: GraphQLFloat },
    }),
});
const Valute = new GraphQLObjectType({
    name: "Valute",
    fields: () => ({
        AUD: { type: Currency },
        AZN: { type: Currency },
        GBP: { type: Currency },
        AMD: { type: Currency },
        BYN: { type: Currency },
        BGN: { type: Currency },
        BRL: { type: Currency },
        HUF: { type: Currency },
        HKD: { type: Currency },
        DKK: { type: Currency },
        USD: { type: Currency },
        EUR: { type: Currency },
        INR: { type: Currency },
        KZT: { type: Currency },
        CAD: { type: Currency },
        KGS: { type: Currency },
        CNY: { type: Currency },
        MDL: { type: Currency },
        NOK: { type: Currency },
        PLN: { type: Currency },
        RON: { type: Currency },
        XDR: { type: Currency },
        SGD: { type: Currency },
        TJS: { type: Currency },
        TRY: { type: Currency },
        TMT: { type: Currency },
        UZS: { type: Currency },
        UAH: { type: Currency },
        CZK: { type: Currency },
        SEK: { type: Currency },
        CHF: { type: Currency },
        ZAR: { type: Currency },
        KRW: { type: Currency },
        JPY: { type: Currency },
    }),
});
const CurrencyType = new GraphQLObjectType({
    name: "CurrencyType",
    fields: () => ({
        Date: { type: GraphQLString },
        PreviousDate: { type: GraphQLString },
        PreviousUrl: { type: GraphQLString },
        Timestamp: { type: GraphQLString },
        Valute: { type: Valute },
    }),
});
const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        valutes: {
            type: CurrencyType,
            resolve(parent, args) {
                return fetchCur();
            },
        },
        values: {
            type: Valute,
            resolve(parent, args) {
                return fetchValute();
            },
        },
    },
});
exports.schema = new GraphQLSchema({
    query: Query,
});
