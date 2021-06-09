import supertest from 'supertest';
import chai from 'chat';
import index from "..";

global.index = index;
global.request = supertest(index);
global.expect = chai.expect;