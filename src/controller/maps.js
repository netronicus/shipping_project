const fetch = require('node-fetch');

class Route {
    /**
     * 
     * @param {[[number,number],[number,number]]} locations Los dos puntos para calcular la distancia en formato [[latitudInicial,longitudInicial],[latitudFinal,longitudFinal]]
     */
    constructor(locations){
        this.start = locations[0];
        this.end = locations[1];
    }

    /**
     * 
     * @returns {number} Tiempo en minutos para finalizar el recorrido
     */
    async getTime(){
        const result = await this.getMapRoute();
        if(result && result.resourceSets){
            const routeInfo = result.resourceSets[0].resources[0];
            const timeInseconds = routeInfo.travelDuration / 60;
            return timeInseconds;
        }
        return null;
    }

    /**
     * 
     * @returns {*} Información sobre la ruta proveniente del API REST de Bing Maps
     */
    async getMapRoute() {
        return await fetch(`http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${this.start.join(',')}&wayPoint.2=${this.end.join(',')}&optimize=time&maxSolutions=1&distanceUnit=km&key=AgxYgI3rOj957XWju0X76coJzShPDXAETYxdLi_0J2JAVfQxW311yT-wEWvdV7Yg`)
        .then(async (res)=>res.json())
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    /**
     * 
     * @param {*} unit 'K' = Kilometros, 'M' = Millas, 'N' = Millas Náuticas
     * @returns 
     */
    distance(unit='K') {
        console.log(this.start,this.end);
        var radlat1 = Math.PI * this.start[0]/180;
        var radlat2 = Math.PI * this.end[0]/180;
        var theta = this.start[1]-this.end[1];
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}

module.exports = Route;