import * as fs from "fs";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface Sell {
  id: number;
  productId: number;
  quantity: number;
  saleDate: string;
  clientId: number;
}

interface Customer {
  id: number;
  name: string;
  email: string;
}

// Función para grabar y leer datos del archivo JSON
const arraytojson = (data: object): { products: Product[]; sells: Sell[]; customers: Customer[] } | null => {
  try {
    // Grabar datos en un archivo JSON local
    fs.writeFileSync("./public/db.json", JSON.stringify(data, null, 2));
    console.log("File written successfully");

    // Leer datos del archivo JSON local
    const localData = fs.readFileSync("./public/db.json", "utf-8");

    // Parsear el contenido del archivo JSON
    const jsonData = JSON.parse(localData);

    return jsonData;
  } catch (error) {
    console.error("Error writing or reading file:", error);
    return null;
  }
};

// Función para obtener los 3 productos más vendidos
function getTopSellingProducts(sells: Sell[], products: Product[]): Product[] {
  const productSales = sells.reduce((acum, sell) => {
    const product = products.find((product) => product.id === sell.productId);
    if (product) {
      acum[product.id] = (acum[product.id] || 0) + sell.quantity;
    }
    return acum;
  }, {} as Record<number, number>);

  const sortedProducts = products
    .map((product) => ({
      ...product,
      totalSales: productSales[product.id] || 0,
    }))
    .sort((a, b) => b.totalSales - a.totalSales);

  return sortedProducts.slice(0, 3);
}

// Función para calcular el total de ingresos por categoría
function getTotalIncomeByCategory(sells: Sell[], products: Product[]): Record<string, number> {
  const categoryIncome: Record<string, number> = {};

  sells.forEach((sell) => {
    const product = products.find((product) => product.id === sell.productId);
    if (product) {
      const income = product.price * sell.quantity;
      const category = product.category;
      categoryIncome[category] = (categoryIncome[category] || 0) + income;
    }
  });

  return categoryIncome;
}

// Función para identificar a los clientes VIP
function getVipCustomers(sells: Sell[], products: Product[], customers: Customer[]): Array<{ customer: Customer; totalSpent: number }> {
  // Calcular el gasto total de cada cliente
  const customerSpending = sells.reduce((acc, sell) => {
    const product = products.find((product) => product.id === sell.productId);
    if (product) {
      const totalCost = product.price * sell.quantity;
      acc[sell.clientId] = (acc[sell.clientId] || 0) + totalCost;
    }
    return acc;
  }, {} as Record<number, number>);

  // Filtrar clientes con gasto mayor a $1,000,000 y mapearlos al formato requerido
  return customers
    .map((customer) => ({
      customer,
      totalSpent: customerSpending[customer.id] || 0,
    }))
    .filter((entry) => entry.totalSpent > 1000000);
}

function generateInventoryReport(products: Product[]): Array<{ name: string; category: string; stock: number; status: string }> {
  return products.map((product) => ({
    // Retorna el nombre, categoría y stock del producto
    name: product.name,
    category: product.category,
    stock: product.stock,
    // Asigna el estado basado en el stock
    status:
      product.stock < 10
        ? "Low Stock" // Bajo stock
        : product.stock <= 20
        ? "In Stock" // Stock suficiente
        : "Enough Stock", // Suficiente stock
  }));
}


// Datos iniciales
const initialData = {
  products: [
    { id: 1, name: "Televisor 50 inch 4k", price: 400000, category: "Electronics", stock: 10 },
    { id: 2, name: "Celular Samsung", price: 800000, category: "Electronics", stock: 5 },
    { id: 3, name: "Computadora Gamer", price: 1200000, category: "Electronics", stock: 3 },
    { id: 4, name: "Tablet iPad", price: 600000, category: "Electronics", stock: 8 },
    { id: 5, name: "Refrigerador", price: 80000, category: "Home Appliances", stock: 12 },
    { id: 6, name: "Lavadora", price: 70000, category: "Home Appliances", stock: 15 },
    { id: 7, name: "Secadora", price: 60000, category: "Home Appliances", stock: 10 },
    { id: 8, name: "Microondas", price: 40000, category: "Home Appliances", stock: 8 },
    { id: 9, name: "Cocina Eléctrica", price: 90000, category: "Home Appliances", stock: 5 },
    { id: 10, name: "Horno Eléctrico", price: 70000, category: "Home Appliances", stock: 12 },
  ],
  sells: [
    { id: 1, productId: 1, quantity: 2, saleDate: "2024-01-01", clientId: 10 },
    { id: 2, productId: 3, quantity: 1, saleDate: "2024-02-10", clientId: 6 },
    { id: 3, productId: 5, quantity: 3, saleDate: "2024-03-15", clientId: 5 },
    { id: 4, productId: 2, quantity: 1, saleDate: "2024-04-20", clientId: 3 },
    { id: 5, productId: 8, quantity: 2, saleDate: "2024-05-05", clientId: 10 },
    { id: 6, productId: 6, quantity: 1, saleDate: "2024-06-18", clientId: 1 },
    { id: 7, productId: 9, quantity: 2, saleDate: "2024-07-21", clientId: 2 },
    { id: 8, productId: 4, quantity: 1, saleDate: "2024-08-15", clientId: 4},
    { id: 9, productId: 10, quantity: 5, saleDate: "2024-09-10", clientId: 5 },
    { id: 10, productId: 7, quantity: 8, saleDate: "2024-10-01", clientId: 10 },
  ],
  customers: [
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
  ],
};

// Cargar datos y ejecutar las funciones
const jsonData = arraytojson(initialData);
if (jsonData) {
  const topSellingProducts = getTopSellingProducts(jsonData.sells, jsonData.products);
  console.log("Top 3 productos más vendidos:", topSellingProducts);

  const incomeByCategory = getTotalIncomeByCategory(jsonData.sells, jsonData.products);
  console.log("Ingresos por categoría:", incomeByCategory);

  const topSellingCustomers = getVipCustomers(jsonData.sells, jsonData.products, jsonData.customers);
  console.log("Clientes VIP (han comprado más de 1.000.000):", topSellingCustomers);

  const inventoryReport = generateInventoryReport(jsonData.products);
  console.log("Reporte de inventario:", inventoryReport);

}
