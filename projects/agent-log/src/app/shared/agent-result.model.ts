export class AgentResult {
    AccountName: number
    CreatedOn: Date
    Status: number
    CustomerId: string
    ResultId: string

    deserialize(input: any): AgentResult {
        Object.assign(this, input);
        return this;
      }
      
}