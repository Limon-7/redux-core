## REDUX

1.  ### What is Redux?

    Redux is a pattern and library for managing and updating application state, using events called "actions".

2.  ### Why do we need Redux?

    The patterns and tools provided by Redux make it easier to understand when, where, why, and how the state in your application is being updated, and how your application logic will behave when those changes occur.

3.  ### State:

    State is always kept in plain JavaScript objects and arrays. That means you may not put other things into the Redux state - no class instances, built-in JS types like Map / Set Promise / Date, functions, or anything else that is not plain JS data.

4.  ### Action:

    An action is a plain JavaScript object that has a type field. You can think of an action as an event that describes something that happened in the application.
    Example: A typical action looks like-

    Action Type: const ADD_TODOS="todos/todoAdded";

    ```js
    const addTodoAction = {
      type: ADD_TODOS,
      payload: "Buy milk",
    };
    ```

5.  ### Action Creator:
    An action creator is a function that creates and returns an action object.
    Syntax: const addToDo=(payload)=>(actionObject)
    Example:
    ```js
    export const addToDo=(payload)=>{
        return{
            type:'todos/todoAdded'
            payload:payload
        }
    }
    ```
    NgRx:
    ```js
    export const addToDo=createAction({
        '[Todo page] Todo',
           props<{name:string,isComplete:bool}>()
        }
    })
    ```
    props:The props method is used to define any additional metadata needed for the handling of the action.
6.  ### Reducer:

    A reducer is a function that receives the current state and an action object, decides how to update the state if necessary, and returns the new state: (state, action) => newState. You can think of a reducer as an event listener which handles events based on the received action (event) type. Reducers are pure function so we can predict result.
    Example:

    1. **Without redux-toolkit libaray**

    ```js
    const toggleReducer = (state = initialState, action) => {
      switch (action.type) {
        case TAB_SELECTED: {
          return {
            ...state,
            currentTab: action.payload,
          };
        }
        default:
          return state;
      }
    };
    ```

    2. **using Redux-toolkit createSlice() method**

    - using creteSlice() used to autometically carete action and reducer. It takes an option object as an argument which some defalut property like name,initial state,and reducers.The reducers property take case reducer.The main benefit of using createSlice({options}) is to we can write mutative code in reducer function.

    ```js
    export const slice = createSlice({
        name: "counter",//reducer name
        initialState: { //initial state
            value: 10,
        },
        reducers: {
            // this is a case reducer: An object mapping from action types to case reducers, each of which handles one specific action type.
            increment: (state, action) => {
            state.value += 1;
            },
            ...
        },
    });
    export const {increment}=slice.actions;
    export const slice.reducer
    ```

    - **prepare():**
      If want to customize action payload the reducer argument object should be an object instead of a function.This objcet conatain at least 2 properties: **i. reducer ii.prepare**. This reducer property is a case reducer function while the **prepare** field is a callback function.

    ```js
    export const slice = createSlice({
       name: "todo",//reducer name
       initialState: { //initial state
           todos: [],
       },
       reducers: {
           addTodo: {
               reducer:(state, action)=>{
                   state.push(action.payload)
               },
               prepare:(text)=>{
                   const id:nanoid(),
                   return {payload:{id,text}}
               }
           }
           ...
       },
    });
    export const {addTodo}=slice.actions;
    export const slice.reducer
    ```

    3. **using creteReducer() from Redux Toolkit:**
       createReducer():A utility that simplifies creating Redux reducer functions. It uses Immer internally so we can write mutative logical code. This function receives a builder callback objects as its argument. That builder provides addCase, addMatcher and addDefaultCase functions that may be called to define what actions this reducer will handle.
       Syntax: const reducer=(initialState,(builder)=>{
       bulder
       .addCase(action creator,reducer)//reducer=actual case reducer function.
       })
       Example:

    ```js
    const todosReducer=createReducer(initialState,(builder)=>{
        builder
            .addCase("todos/addTodos",(state,action)=>{
                const todo=action.payload
                state.todos.push(todo)
            })
            .addMatcher(action=>action.type.endsWith("complete"),(state,action)=>{....})
            .addDefaultCase((state,action)=>{state})
    });
    ```

    4. **[Using map Notation](https://redux-toolkit.js.org/api/createReducer)**

    ```js
    const counterReducer = createReducer(0, {
        increment: (state, action) => state + action.payload,
        decrement: (state, action) => state - action.payload
    })
    Or Action creators that were generated using createAction may be used directly as the keys here.
    const increment = createAction('increment')
    const decrement = createAction('decrement')

    const counterReducer = createReducer(0, {
        [increment]: (state, action) => state + action.payload,
        [decrement.type]: (state, action) => state - action.payload
    })
    ```

    5. **NgRx:**

    ```js
    const addTodoAction=createAction("[Todo Page] Todos",props<{title:string,isComplete:bool}>())
    const todosReducer=createReducer(
        initialState,
        on(addTodoAction,(state,action)=>({
                ...state,
                todos:[...state,action.payload]
            })
    );
    export function reducer(state: State | undefined, action: Action) {
        return todosReducer(state, action);
    }
    ```

    Note: reducer are pure function so don't update state directly.

7.  ### BindActionCreator:

    The bindActionCreator() is useful when we want to pass multiple action creators as a single props to a component.
    Syntax: bindActionCreators(action_creators,dispatch);

8.  ### Store:

    A store is an immutable object tree in Redux. A store is a state container which holds the application’s state. Redux can have only a single store in your application. Whenever a store is created in Redux, you need to specify the reducer.
    Store method:

    - getState():Returns the current state tree of your application. It is equal to the last value returned by the store's reducer.
    - dispatch(action): Dispatches an action. This is the only way to trigger a state change.

    - subscribe(listener): Adds a change listener. It will be called any time an action is dispatched, and some part of the state tree may potentially have changed. You may then call getState() to read the current state tree inside the callback.

    - replaceReducer(nextReducer): Replaces the reducer currently used by the store to calculate the state.You might need this if your app implements code splitting, and you want to load some of the reducers dynamically. You might also need this if you implement a hot reloading mechanism for Redux.
      - nextReducer (Function) The next reducer for the store to use.

9.  ### How To create a store and Pass other components?

    We can create store using redux library or reduxJs/toolkit libray.
    **redux library:**
    Syntax: const store=createStore(rootReducer,[preloadedState],[enhancer])
    Example:

    ```js
    export default function configureStore(preloadedState) {
      const middleware = [thunk];
      const middlewareEnhance = applyMiddleware(...middleware);
      const storeEnhancer = [middlewareEnhance];
      const composeEnhancer = composeWithDevTools(...storeEnhancer);

      const store = createStore(rootReducer, preloadedState, composeEnhancer);
      if (process.env.NODE_ENV !== "production") {
        if (module.hot) {
          module.hot.accept("../reducer/rootReducer", () => {
            const newRootReducer = require("../reducer/rootReducer").default;
            store.replaceReducer(newRootReducer);
          });
        }
      }
      return store;
    }
    ```

    **Redux Toolkit:**The Redux Toolkit package is designed to help simplify several common Redux use cases, including store setup.
    Syntax: const store=configureStore({reduxer,[middleware],[prelodaedState],[enhancer]})
    Example:

    ```js
    export default function configureStore(preloadedState) {
      const middleware = [thunk];
      const composeEnhancer = composeWithDevTools();

      const store = configureStore({
        reducer: rootReducer,
        middleware: middleware,
        preloadedState,
        enhancer: [someenhancer],
      });
      if (process.env.NODE_ENV !== "production") {
        if (module.hot) {
          module.hot.accept("../reducer/rootReducer", () => {
            const newRootReducer = require("../reducer/rootReducer").default;
            store.replaceReducer(newRootReducer);
          });
        }
      }
      return store;
    }
    ```

10. Selector:
    Selectors are pure functions that know how to extract specific pieces of information from a store state value. As an application grows bigger, this can help avoid repeating logic as different parts of the app need to read the same data.
    There are 2 types- of selector.

    1. `inputselector:` It is selector that only return a state.That does not use to createSelector.
    2. **output selector:** That use inputSelector and createSelector to build themsalves

    - Memozation: This is a common pattern to reduce or completely skip unnecessary computations. **Now it will react only to state.todos object change.**

    craeteSelector(): It takes two argument.

    1. First one is input selctor a collection of array
    2. Second argument is a function that will return the value we want out of the selector.
       Syntax: const todoSelector=(state)=>state.todos;

    Example: Both redux and ngrx are having same syantax.

    ```js
    const INITIAL_STATE={
        todos:[];
        toggle:false;
    };

    const todoSelector=(state)=>state.todos;
    const getSingleTodo=createSelector(
        [todoSelector],
        (todos)=>todos.isComplete!=false
    )
    ```

    #### How can we pass extra arguments to store?

    **Redux**

    ```js
    const todoSelector = (state) => state.todos;
    const getSingleTodo = (id) =>
      createSelector([todoSelector], (todos) => {
        const todo = todos.filter((x) => x.id === id);
        return todo ? todo : null;
      });
    ```

    **NgRx**

    ```js
    const getSingleTodo = createSelector([todoSelector], (todos, props) => {
      const todo = todos.filter((x) => x.id === props.id);
      return todo ? todo : null;
    });
    ```

## React Redux

#### Provider:

React Redux provides <Provider />, which makes the Redux store available to the rest of your app:

#### connect:

React Redux provides a connect function for you to connect your component to the store.
connect(mapStateToProps,mapDispatchToProps)

#### mapStateToProps:

It is used for selecting the part of the data from the store that the connected component needs.

```
const mapStateToProps=(state)=>({
    currenUser:state.user.currentUser
});
```

- state= top label root reducer.
- user = get value from user reducer
- currentUser= get currentUser value

export defalu connect(mapStateToProps)(Header)

#### mapDispatchToProps:

It is a function.It is used for dispatching actions to the store.it has two arguments.
.1.dispatch
.2. ownProps (optional)
The mapDispatchToProps function will be called with dispatch as the first argument. You will normally make use of this by returning new functions that call dispatch() inside themselves, and either pass in a plain action object directly or pass in the result of an action creator.

```
const mapDispatchToProps=dispatch=>({
    actionname:object=>dispatch(actionName(object));
})
```

Your mapDispatchToProps function should return a plain object:

### dispatch():

#### State destrutor:

```
const mapStateToProps = (state) => ({
    currenUser: state.user.currentUser,
});
To:
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
    currentUser,
    hidden,
});
```

### Selector:

There are 2 types- of selector.
.1. inputselector: It is selector that only return a state.That does not use to createSelector.
.2. output selector: That use inputSelector and createSelector to build themsalves

- Memozation: This is a common pattern to reduce or completely skip unnecessary computations. **Now it will react only to state.todos object change.**

craeteSelector(): It takes two argument.
.1. First one is input selctor a collection of array
.2. Second argument is a function that will return the value we want out of the selector.

```
createSelector([selectCart],cart=>cart.cartItems)
```

### persistStore: from redux-persist

Redux-Persist saves the Redux Store when the app is closed or refreshed in the iPhone simulator.
Step to follow configarations:

- create a persistStore(passTheDefaultreduxstore)
- setup root reducers with storage as using localStorage as default storage.
