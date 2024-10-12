export class Inventory {
    constructor(id, materialName, quantity, unitPrice, lastUpdated, userId) {
        this.id = id;
        this.materialName = materialName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.lastUpdated = lastUpdated;
        this.userId = userId;
    }
}