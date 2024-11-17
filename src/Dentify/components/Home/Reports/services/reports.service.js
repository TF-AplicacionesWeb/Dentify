import BaseService from '../../../../../shared/services/base.service.js';
import {Reports} from "../model/reports.entity.js";

export class ReportsService extends BaseService {

    constructor() {
        super();
    }

    async generateReport(userId) {
        const data = await this.getDataInventory(userId);

        let averageUnitPrice = 0;
        let minPrice = Infinity;
        let maxPrice = 0;

        let totalQuantity = 0;
        let averagePerProduct;
        let mostProduct = null;
        let minProduct = null;

        let totalValueInventory = 0;

        data.forEach((item) => {
            const { quantity, unit_price, material_name } = item;

            if (unit_price < minPrice) minPrice = unit_price;
            if (unit_price > maxPrice) maxPrice = unit_price;

            averageUnitPrice += unit_price;

            totalQuantity += quantity;


            totalValueInventory += unit_price * quantity;


            if (!mostProduct || quantity > mostProduct.quantity) {
                mostProduct = { name: material_name, quantity };
            }
            if (!minProduct || quantity < minProduct.quantity) {
                minProduct = { name: material_name, quantity };
            }
        });


        averageUnitPrice = data.length ? averageUnitPrice / data.length : 0;
        averageUnitPrice = parseInt(averageUnitPrice);

        averagePerProduct = data.length ? totalQuantity / data.length : 0;
        averagePerProduct = parseInt(averagePerProduct);

        return {
            averageUnitPrice,
            minPrice,
            maxPrice,
            totalQuantity,
            averagePerProduct,
            mostProduct,
            minProduct,
            totalValueInventory,
        };
    }

    async getDataInventory(userId = null) {
        const inventory = await this.getAll('inventory');

        let allProducts = [];
        if (!Array.isArray(inventory)) {
            return [];
        }
        let data = inventory.filter(response => response && (!userId || response.user_id === userId));


        data.forEach(item => {
            const material_name = item.material_name;
            const quantity = item.quantity;
            const unit_price = item.unit_price;

            allProducts.push(new Reports({ material_name, quantity, unit_price }));
        });

        return allProducts;

    }
}