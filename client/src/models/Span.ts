export interface Span {
    spanId: BigInt;
    parentSpanId: BigInt;
    operationName: string;
    references: any;
    startTime: BigInt;
    duration: number;
    tags: string;
    logs: string;
};