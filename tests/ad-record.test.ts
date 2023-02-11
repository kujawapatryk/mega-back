import {AdRecord} from "../records/ad.record";
import {pool} from "../utilits/db";

afterAll( async () =>{
await pool.end();
});

const defaultObj = {
    name:'tenst dname',
    description: 'asfasfvxvsvsd',
    url: 'url2',
    price: 0,
    lat: 0,
    lon: 0,

}

test('can build AdRecord', ()=>{
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe('tenst dname'),
    expect(ad.description).toBe('asfasfvxvsvsd');
});

test('validates invalid price', ()=>{


    expect(()=> new AdRecord({
        ...defaultObj,
        price: -3,
    })).toThrow('Podana cene jast nie prawidłowa')

});

