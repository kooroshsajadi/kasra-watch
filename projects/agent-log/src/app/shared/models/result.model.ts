import { Deserializable } from "./deserializable.model"

export class Result implements Deserializable {
    public LatestUpdateOn: Date
    public AccountName: string
    public Status: number
    public RequestId: string
    public CustomerId: string

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}