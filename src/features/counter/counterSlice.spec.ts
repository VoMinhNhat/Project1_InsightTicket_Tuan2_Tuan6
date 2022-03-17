import counterReducer, {
  CounterState,
  //@ts-ignore
  increment, //@ts-ignore
  decrement, //@ts-ignore
  incrementByAmount,
} from './ticketFireStore';

describe('counter reducer', () => {
  const initialState: CounterState = { //@ts-ignore
    value: 3,
    status: 'idle',
  };
  it('should handle initial state', () => { //@ts-ignore
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  it('should handle increment', () => { //@ts-ignore
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => { //@ts-ignore
    const actual = counterReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => { //@ts-ignore
    const actual = counterReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
