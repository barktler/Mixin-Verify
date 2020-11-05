/**
 * @author WMXPY
 * @namespace Verify
 * @description Stringed
 * @override Unit
 */

import { StringedResult } from "@sudoo/verify";
import { expect } from "chai";
import * as Chance from "chance";
import { createStringedVerifyMixin } from "../../src";
import { ExampleAPI } from "../mock/example";

describe('Given [createStringedVerifyMixin] function', (): void => {

    const chance: Chance.Chance = new Chance('verify-stringed');

    it('should be able to verify body - sad path', async (): Promise<void> => {

        let verifyResult: StringedResult | undefined;

        const api: ExampleAPI = new ExampleAPI();
        api.useMixin(createStringedVerifyMixin({
            onFailed: (result: StringedResult) => verifyResult = result,
        }));

        let error: Error = new Error(chance.string());

        try {
            await api.fetch();
        } catch (err) {
            error = err;
        }

        expect(error.message).to.be.equal("[Barktler] Pre Verify Failed");
        expect(verifyResult).to.be.deep.equal({
            succeed: false,
            invalids: [
                `Invalid Type of [ROOT]; Should be type of "object"; But got type of "undefined"`,
            ],
        });
    });

    it('should be able to verify body - happy path', async (): Promise<void> => {

        let verifyResult: StringedResult | undefined;

        const api: ExampleAPI = new ExampleAPI();
        api.useMixin(createStringedVerifyMixin({
            onFailed: (result: StringedResult) => verifyResult = result,
        }));

        await api.fetchWithBody(chance.string());

        expect(verifyResult).to.be.undefined;
    });
});
