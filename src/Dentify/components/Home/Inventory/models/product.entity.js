export class Product {
    constructor({ id = null, material_name = '', quantity = 0, unit_price = null, last_updated = '', user_id = null } = {}) {
        this.id = id;
        this.material_name = material_name;
        this.quantity = quantity;
        this.unit_price = unit_price;
        this.last_updated = new Date().toISOString().split('T')[0] || last_updated;
        this.user_id = user_id;
    }
}
