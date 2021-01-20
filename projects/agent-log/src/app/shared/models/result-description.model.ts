import { Deserializable } from "./deserializable.model"

export class ResultDescription implements Deserializable {
    public OccurrenceDateTime: Date
    public ProblemName: string
    public ExecutionTime: number
    public ProblemModuleName: string
    public ProblemLevelName: string
    public ProblemTypeName: string

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}