// import {AdRecord} from "../records/ad.record";
//
// let ad: AdRecord;
//
// beforeAll(async () =>{
//
// });

import {AdRecord} from "../records/ad.record";

test('adrecord rreturnes data form database for one entry',async ()=>{
    const ad = await AdRecord.getOne('45f2fcb5-a7ed-11ed-9050-d05099813d65');
    expect(ad).toBeDefined();
    expect(ad.name).toBe('testowa');
    expect(ad.id).toBe('45f2fcb5-a7ed-11ed-9050-d05099813d65');
});

test('test2', async ()=>{
    const ad=await AdRecord.getOne('45f2fcb5-a7ed-11ed-9050-d05099813d6a');
    expect(ad).toBeNull();
})