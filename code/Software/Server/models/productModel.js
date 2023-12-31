import mongoose from "mongoose";
import connection from "../config/database.js";

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        category: {
            type: String,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        quantityInStock: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = connection.model("Product", productSchema);
