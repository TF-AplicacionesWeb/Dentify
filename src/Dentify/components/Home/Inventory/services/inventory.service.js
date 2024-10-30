import BaseService from "../../../../../shared/services/base.service.js";
import {Product} from "../models/product.entity.js";

export class InventoryService extends BaseService {
    constructor() {
        super();
    }

    async getInventory(userId = null) {
        const products = await this.getAll('inventory');

        return products
            .filter(product => product && (!userId || product.user_id === userId))
            .map(product => new Product(product.data || product));
    }
    async addProduct(product) {
        return await this.create('inventory', product);
    }
    async updateProduct(id,product) {
        return await this.update('inventory', id, product);
    }

    async deleteProduct(id) {

        return await this.delete('inventory', id);
    }


}