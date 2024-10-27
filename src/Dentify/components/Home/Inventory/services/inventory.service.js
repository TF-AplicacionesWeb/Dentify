import BaseService from "../../../../../shared/services/base.service.js";
import {Product} from "../model/product.entity.js";

export class InventoryService extends BaseService {
    constructor() {
        super('http://localhost:3000/');
    }

    async getInventory(userId = null) {
        const products = await this.getAll('inventory');

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
        const response = await super.create('inventory', product);
        return response.data;
    }

    async updateProduct(product) {
        const response = await super.update('inventory', product.id, product);
        return response.data;
    }

    async deleteProduct(id) {
        await super.delete('inventory', id);
    }

    async getProductById(id) {
        const response = await super.getById('inventory', id);
        return new Product(
            response.data.id,
            response.data.material_name,
            response.data.quantity,
            response.data.unit_price
        );
    }

}