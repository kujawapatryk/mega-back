import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utilits/errors";
import {pool} from "../utilits/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';




type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements  NewAdEntity{
    public description: string;
    public id: string;
    public lat: number;
    public lon: number;
    public name: string;
    public price: number;
    public url: string;
    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length>100){
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta ani przekraczać 100 znaków');
        }
        if(obj.description.length > 1000){
            throw new ValidationError('Opis nie może przekraczać 1000 znaków');
        }

        if (obj.price <0 || obj.price >999999){
            throw new ValidationError('Podana cene jast nie prawidłowa');
        }

        if (!obj.url || obj.url.length>100){
            throw new ValidationError('link ogłoszenia jest nie porawny');
        }
        if( typeof obj.lat !== 'number' || typeof obj.lon !== 'number'){
        throw new ValidationError('Nie mozna zweryfikowac ogłoszenia');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.lat = obj.lat;
        this.lon = obj.lon;
        this.price = obj.price;
        this.url = obj.url;

    }
    static async getOne(id: string):Promise<AdRecord| null> {
        const [results] =await pool.execute("SELECT * FROM `ads` WHERE id=:id",{id,}) as AdRecordResults;
        return results.length === 0 ? null : new AdRecord(results[0] as NewAdEntity)

    }
    static async findAll(name: string):Promise<SimpleAdEntity[]> {
        const [results] =await pool.execute("SELECT * FROM `ads` WHERE name LIKE :search",{search: `%${name}%`,}) as AdRecordResults;
        return results.map(result=>{
            const {id,lat,lon} = result;
            return {id,lat,lon}
        });

    }

    async insert(): Promise<void> {
        if(!this.id)
            this.id=uuid();
        else
            throw new Error('NIe mozna dodać ponownie do bazy danych');

        await  pool.execute("INSERT INTO `ads` (`id`,`name`,`description`,`price`, `url`, `lat`, `lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)",this)
    }

}