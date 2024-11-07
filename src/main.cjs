"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var products = [
    {
        id: 1,
        name: "Televisor 50 inch 4k",
        price: 400000,
        category: "Electronics",
        stock: 10,
    },
    {
        id: 2,
        name: "Celular Samsung",
        price: 800000,
        category: "Electronics",
        stock: 5,
    },
    {
        id: 3,
        name: "Computadora Gamer",
        price: 1200000,
        category: "Electronics",
        stock: 3,
    },
    {
        id: 4,
        name: "Tablet iPad",
        price: 600000,
        category: "Electronics",
        stock: 8,
    },
    {
        id: 5,
        name: "Refrigerador",
        price: 80000,
        category: "Home Appliances",
        stock: 12,
    },
    {
        id: 6,
        name: "Lavadora",
        price: 70000,
        category: "Home Appliances",
        stock: 15,
    },
    {
        id: 7,
        name: "Secadora",
        price: 60000,
        category: "Home Appliances",
        stock: 10,
    },
    {
        id: 8,
        name: "Microondas",
        price: 40000,
        category: "Home Appliances",
        stock: 8,
    },
    {
        id: 9,
        name: "Cocina Eléctrica",
        price: 90000,
        category: "Home Appliances",
        stock: 5,
    },
    {
        id: 10,
        name: "Horno Eléctrico",
        price: 70000,
        category: "Home Appliances",
        stock: 12,
    },
];
var sells = [
    { id: 1, productId: 1, quantity: 2, saleDate: "2024-01-01", clientId: 10 },
    { id: 2, productId: 3, quantity: 1, saleDate: "2024-02-10", clientId: 9 },
    { id: 3, productId: 5, quantity: 3, saleDate: "2024-03-15", clientId: 8 },
    { id: 4, productId: 2, quantity: 1, saleDate: "2024-04-20", clientId: 7 },
    { id: 5, productId: 8, quantity: 2, saleDate: "2024-05-05", clientId: 6 },
    { id: 6, productId: 6, quantity: 1, saleDate: "2024-06-18", clientId: 5 },
    { id: 7, productId: 9, quantity: 2, saleDate: "2024-07-21", clientId: 4 },
    { id: 8, productId: 4, quantity: 1, saleDate: "2024-08-15", clientId: 3 },
    { id: 9, productId: 10, quantity: 2, saleDate: "2024-09-10", clientId: 2 },
    { id: 10, productId: 7, quantity: 1, saleDate: "2024-10-01", clientId: 1 },
];
var customers = [
    { id: 1, name: "Carlos Pérez", email: "carlos.perez@example.com" },
    { id: 2, name: "Ana Gómez", email: "ana.gomez@example.com" },
    { id: 3, name: "Luis Ramírez", email: "luis.ramirez@example.com" },
    { id: 4, name: "María López", email: "maria.lopez@example.com" },
    { id: 5, name: "José Martínez", email: "jose.martinez@example.com" },
    { id: 6, name: "Laura Torres", email: "laura.torres@example.com" },
    { id: 7, name: "Pedro Fernández", email: "pedro.fernandez@example.com" },
    { id: 8, name: "Elena Ríos", email: "elena.rios@example.com" },
    { id: 9, name: "Sofía Vargas", email: "sofia.vargas@example.com" },
    { id: 10, name: "Manuel Ortiz", email: "manuel.ortiz@example.com" },
];
var arraytojson = function (data) {
    try {
        fs.writeFileSync("./public/db.json", JSON.stringify(data, null, 2));
        console.log("File written successfully");
    }
    catch (error) {
        console.error("Error writing file:", error);
    }
};
arraytojson({ products: products, sells: sells, customers: customers });