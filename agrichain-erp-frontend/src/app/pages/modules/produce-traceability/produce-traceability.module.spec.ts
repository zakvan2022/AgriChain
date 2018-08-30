import { ProduceTraceabilityModule } from './produce-traceability.module';

describe('ProduceTraceabilityModule', () => {
  let produceTraceabilityModule: ProduceTraceabilityModule;

  beforeEach(() => {
    produceTraceabilityModule = new ProduceTraceabilityModule();
  });

  it('should create an instance', () => {
    expect(produceTraceabilityModule).toBeTruthy();
  });
});
