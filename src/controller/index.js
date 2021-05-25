const Route = require('./maps');
const { Sequelize, DataTypes } = require('sequelize');
const Database = require('../db/db');

/**
 * Shipping instance
 */
class Shipping extends Database {
    /**
     * 
     * @param {Object} shipping Datos para el pedido
     * @param {number} shipping.id ID
     * @param {string} shipping.customer customer
     * @param {string} shipping.descrip descrip
     * @param {string} shipping.status status
     * @param {number} shipping.origin_lat origin_lat
     * @param {number} shipping.origin_long origin_long
     * @param {number} shipping.current_lat current_lat
     * @param {number} shipping.current_long current_long
     * @param {number} shipping.end_lat end_lat
     * @param {number} shipping.end_long end_long
     * @returns {{id:number, customer:string, descrip:string, status:string, origin_lat:number, origin_long:number, current_lat:number, current_long:number, end_lat:number, end_long:number}} Shipping information
     */
    constructor(
        data
    ) {
        super();
        if(data){
            this.id = data.id;
            this.customer = data.customer;
            this.descrip = data.descrip;
            this.status = data.status;
            this.origin_lat = data.origin_lat;
            this.origin_long = data.origin_long;
            this.current_lat = data.current_lat;
            this.current_long = data.current_long;
            this.end_lat = data.end_lat;
            this.end_long = data.end_long;
        }
    }

    async save() {
        const route = new Route([[this.origin_lat,this.origin_long],[this.end_lat,this.end_long]]);
        if(route.distance()>20){
            return 400;
        }
        return await this.Shipping.create({
            customer: this.customer,
            descrip: this.descrip,
            status: this.status,
            origin_lat: this.origin_lat,
            origin_long: this.origin_long,
            current_lat: this.current_lat,
            current_long: this.current_long,
            end_lat: this.end_lat,
            end_long: this.end_long
        }).then(res=>res.toJSON());
    }
    /**
     * 
     * @returns {{id:number, customer:string, descrip:string, status:string, origin_lat:number, origin_long:number, current_lat:number, current_long:number, end_lat:number, end_long:number}} Shipping information
     */
    async get() {
        return await this.Shipping.findByPk(this.id).then(res=>res.toJSON())
    }

    /**
     * 
     * @returns {[{id:number, customer:string, descrip:string, status:string, origin_lat:number, origin_long:number, current_lat:number, current_long:number, end_lat:number, end_long:number}]} Shipping information
     */
    async getAll() {

        let data = [];
        await this.Shipping.findAll().then(res=>{
            data = res.map(r=>r.toJSON());
        })
        for(let i=0; i<data.length; i++){
            let route = new Route([
                [data[i].origin_lat,data[i].origin_long],
                [data[i].end_lat,data[i].end_long]
            ]);
            data[i].time = await route.getTime();
            data[i].distance = route.distance('K');
        }
        return data;
    }

    async updateItem(){
        const shipping = await this.Shipping.findByPk(this.id);
        return await shipping.update({
            current_lat: this.current_lat,
            current_long: this.current_long,
        }).then(res=>res.toJSON());
    }
}

module.exports = Shipping;