import { ComponentProps, ComponentType, ReactElement, useReducer } from 'react';
import { initialState, reducer } from './ChatContext.slice';
import { ChatDispatcherContext, ChatStoreContext } from './ChatContext.context';

const connectStore = (Component: ComponentType) => (
  props: ComponentProps<any>
): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ChatStoreContext.Provider value={state}>
      <ChatDispatcherContext.Provider value={dispatch}>
        <Component {...props} />
      </ChatDispatcherContext.Provider>
    </ChatStoreContext.Provider>
  );
};

export default connectStore;