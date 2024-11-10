export class Reports {
    constructor({material_name = "", unit_price = 0, quantity = 0}) {
        this.material_name = material_name;
        this.unit_price = unit_price;
        this.quantity = quantity;
        this.total_price = quantity * unit_price;

    }
}