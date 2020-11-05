/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 * @override Unit
 */

import { VerifyResult } from "@sudoo/verify";
import { expect } from "chai";
import * as Chance from "chance";
import { createVerifyMixin } from "../../src";
import { ExampleAPI } from "../mock/example";

describe('Given [createVerifyMixin] function', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify');

    it('should be able to verify body - sad path', async (): Promise<void> => {

        let verifyResult: VerifyResult | undefined;

        const api: ExampleAPI = new ExampleAPI();
        api.useMixin(createVerifyMixin({
            onFailed: (result: VerifyResult) => verifyResult = result,
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
                {
                    actual: "undefined",
                    expect: "object",
                    slice: "type",
                    stack: [],
                },
            ],
        });
    });

    it('should be able to verify body - happy path', async (): Promise<void> => {

        let verifyResult: VerifyResult | undefined;

        const api: ExampleAPI = new ExampleAPI();
        api.useMixin(createVerifyMixin({
            onFailed: (result: VerifyResult) => verifyResult = result,
        }));

        await api.fetchWithBody(chance.string());

        expect(verifyResult).to.be.undefined;
    });
});
