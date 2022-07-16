const mapSpan = (span) => {
    return {
        spanId: span.spanId.toString(),
        parentSpanId: span.parentSpanId.toString(),
        operationName: span.operationName,
        startTime: (new Date(span.startTime / 1000)),
        duration: span.duration,
    }
};

module.exports = mapSpan;