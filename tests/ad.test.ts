// import {AdRecord} from "../records/ad.record";
//
// let ad: AdRecord;
//
// beforeAll(async () =>{
//
// });

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

test('adrecord rreturnes data form database for one entry',async ()=>{
    const ad = await AdRecord.getOne('45f2fcb5-a7ed-11ed-9050-d05099813d65');
    expect(ad).toBeDefined();
    expect(ad.name).toBe('testowa');
    expect(ad.id).toBe('45f2fcb5-a7ed-11ed-9050-d05099813d65');
});

test('test2', async ()=>{
    const ad=await AdRecord.getOne('45f2fcb5-a7ed-11ed-9050-d05099813d6a');
    expect(ad).toBeNull();
});

test('AdRecord.findAll test', async ()=>{
    const ad=await AdRecord.findAll('');
    expect(ad).not.toEqual([]);
    expect(ad[0].id).toBeDefined();

});

test('AdRecord.findAll test when searching "t"', async ()=>{
    const ad=await AdRecord.findAll('t');
    expect(ad).not.toEqual([]);
    expect(ad[0].id).toBeDefined();

});


test('AdRecord.findAll test for not exist', async ()=>{
    const ad=await AdRecord.findAll('-----------------------------------');

    expect(ad).toEqual([]);


});

test('AdRecord.findAll returns new id', async ()=>{

    const ad = new AdRecord(defaultObj);
    await ad.insert();
    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');

});


test('AdRecord.findAll inserts data to database', async ()=>{

    const ad = new AdRecord(defaultObj);
    await ad.insert();
    const res=await AdRecord.getOne(ad.id);
    expect(res).toBeDefined();


});
