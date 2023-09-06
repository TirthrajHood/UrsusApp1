import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const NAME_FIELD = 'Bear__c.Name';
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Bear__c.Location__Longitude__s';
 
const bearFields=[NAME_FIELD, LOCATION_LATITUDE_FIELD, LOCATION_LONGITUDE_FIELD];

export default class BearLocation extends LightningElement {
    @api recordId;
    name;
    mapMarkers=[];

    @wire(getRecord, {recordId:'$recordId', fields: bearFields})
    loadBearMap3({error, data}){
        if(error){

        } else if(data){
            this.name = getFieldValue(data, NAME_FIELD);
            const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
            const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);

            this.mapMarkers= [{
                location : {Latitude, Longitude},
                title : this.name,
                description : `coords of ${this.name}: ${Latitude} , ${Longitude}`
            }];
        }
    }
    get cardTitle(){
        return (this.name)?`${this.name}'s Location`:'Bear Location';
    }
}