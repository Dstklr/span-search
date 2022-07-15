export interface Span {
    spanId: string;
    parentSpanId: string;
    operationName: string;
    references: any;
    startTime: Date;
    duration: number;
    tags: string;
    logs: string;
};