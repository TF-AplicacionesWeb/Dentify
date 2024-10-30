import BaseService from "../../../../../shared/services/base.service.js";
import {Product} from "../models/product.entity.js";

export class InventoryService extends BaseService {
    constructor() {
        super('http://localhost:3000/inventory');
    }

    async getInventory(userId = null) {
        const products = await this.getAll('');

        return products
            .filter(product => !userId || product.user_id === userId)
            .map(product => new Product(
                product.id,
                product.material_name,
                product.quantity,
                product.unit_price
            ));
    }
    async addProduct(product) {
        return await this.create('', product);
    }
    async updateProduct(id,product) {
        return await this.update('', id, product);
    }

    async deleteProduct(id) {

        return await this.delete('', id);
    }


}