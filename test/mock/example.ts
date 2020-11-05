/**
 * @author WMXPY
 * @namespace Verify
 * @description Example
 * @override Mock
 */

import { Barktler, RequestDriver } from "@barktler/core";
import { mockDriver } from "@barktler/driver-mock";

export type ExampleAPIResponse = {

    readonly hello: string;
};

export class ExampleAPI extends Barktler<any, ExampleAPIResponse> {
    protected readonly defaultDriver: RequestDriver | null = mockDriver;

    public constructor() {

        super();
        super._declareRequestBodyPattern({
            type: 'map',
            map: {
                hello: {
                    type: 'string',
                },
            },
        });
        super._declareResponseDataPattern({
            type: 'map',
            map: {
                hello: {
                    type: 'string',
                },
            },
        });
    }

    public async fetch(): Promise<ExampleAPIResponse> {

        return await this._requestForData({
            url: 'example.com',
            method: 'GET',
        });
    }
}
