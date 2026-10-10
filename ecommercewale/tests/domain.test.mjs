import { test } from 'node:test';
import assert from 'node:assert/strict';
import '../public/domain.js';
const D=globalThis.EWDomain;
test('deductions are itemised and cumulative without changing the saved base',()=>{const q=D.estimate({buyback:20000},{power:'yes',screen:'damaged',body:'heavy',battery:'weak',accessories:'no'});assert.equal(q.base,20000);assert.equal(q.amount,9400);assert.equal(q.deductions.length,4);assert.equal(q.amount,q.base-q.deductions.reduce((n,x)=>n+x.amount,0));});
test('non-working phones require assessment instead of a fabricated price',()=>{const q=D.estimate({buyback:20000},{power:'no'});assert.equal(q.manual,true);assert.equal(q.amount,0);});
test('coverage is exact and constrained to launch cities',()=>{assert.equal(D.checkPin('Indore','452001'),true);assert.equal(D.checkPin('Ujjain','452001'),false);assert.equal(D.checkPin('Mumbai','400001'),false);assert.equal(D.checkPin('Dewas','455001x'),false);});
test('request validation rejects incomplete consent and invalid contacts',()=>{const input={type:'sell',city:'Dewas',name:'Tester',phone:'9876543210',pin:'455001',consent:true,product_id:'example-model',date:'2026-10-12',slot:'10am–1pm'};assert.equal(D.validateEnquiry(input),null);assert.match(D.validateEnquiry({...input,consent:false}),/agree/);assert.match(D.validateEnquiry({...input,phone:'1234567890'}),/mobile/);assert.match(D.validateEnquiry({...input,type:'payment'}),/Invalid/);});
