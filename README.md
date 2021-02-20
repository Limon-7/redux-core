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
            /*
            this is a case reducer: An object mapping from
            action types to case reducers, each of which handles
            one specific action type.
             */
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
    Example:

    ```js
    /// without bindActionCreators(actioncreatores,dispatch)
    const mapDispatchToProps = (dispatch) => {
      return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        reset: () => dispatch(reset()),
        dispatch,
      };
    };
    //using actionCreators(action_creators,dispatch)
    const mapDispatchToProps = (dispatch) => {
      return {
        dispatch,
        ...bindActionCreators({ increment, decrement, reset }, dispatch),
      };
    };
    ```

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

    1. #### redux library:
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

    2.  #### Redux Toolkit:
        The Redux Toolkit package is designed to help simplify several common Redux use cases, including store setup.
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

10. ### Selector:

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

11. ### How to style a redux?

    1.  **Essential:** These rules help prevent errors.

        - Do not muted state.
        - Must not have side effects. So the reducer can be predictable. We must not put any asynchronous code or generate random values, or logger like console code in reducer rather we modify side effect code outside of reducer.
        - Put serialized data in state or action.
        - Only one redux store for a single app.

    2.  **Strongly Recommended:**These rules have been found to improve readability and/or developer experience in most projects.

        - Use Redux Toolkit for writing redux logic.
        - Use immer for writing immutable state.
        - Structured files as feature folders or Duck pattern.
        - Put as much logic as possible in the reducer.
        - Reducer should own the state shape. For example if we pass a payload that doest not match the state object shape then raise a error.
        - Name state slice based on the stored data.

        ```js
        combineReducers({
          users: usersReducer,
          posts: postsReducer,
        });
        ```

        - Treat Reducers as State Machines: where the combination of both the current state and the dispatched action determines whether a new state value is actually calculated, not just the action itself unconditionally.

        ```js
        const initialUserState = {
            status: 'idle', // explicit finite state
            user: null,
            error: null
        }
        const IDLE_STATUS = 'idle';
        const LOADING_STATUS = 'loading';
        const SUCCESS_STATUS = 'success';
        const FAILURE_STATUS = 'failure';

        const fetchIdleUserReducer = (state, action) => {
            // state.status is "idle"
            switch (action.type) {
                case FETCH_USER:
                    return {
                        ...state,
                        status: LOADING_STATUS
                    }
                }
                default:
                    return state;
            }
        }

        // ... other reducers

        const fetchUserReducer = (state, action) => {
            switch (state.status) {
                case IDLE_STATUS:
                    return fetchIdleUserReducer(state, action);
                case LOADING_STATUS:
                    return fetchLoadingUserReducer(state, action);
                case SUCCESS_STATUS:
                    return fetchSuccessUserReducer(state, action);
                case FAILURE_STATUS:
                    return fetchFailureUserReducer(state, action);
                default:
                // this should never be reached
                    return state;
            }
        }
        ```

        - Normalize Complex Nested/Relational State.
        - Actions as Events, Not Setters: we recommend trying to treat actions more as "describing events that occurred", rather than "setters".
        - Actions should be written with meaningful, informative, descriptive type fields. like: SET_DATA,UPDATE_DATA
        - Use static typing.

    3.  **Recommended**:

        - Write Action Types as domain/eventName.

        1. [Domain] Action Type"=> "[Login Page] Login"
        2. "todos/addTodos"

        - Using action creators.
        - Use Thunk for async code.
        - Move complex logic outside of the componet usally into thunk.
        - Use selector function to read from store state. Using memoized selector functions for reading store state whenever possible,

## React Redux

1. ### How do we can provide store to our application?

   We can provide store available to any nested components that have been wrapped in the connect function.To do this, we wrap our app with the <Provider /> API provided by React Redux.
   Example:

   ```js
   <Provider store={store}>
     <app />
   </Provider>
   ```

2. ### connect

   connect() function is provided by react redux library which allows to read value from the redux.
   connect() function takes 2 arguments.

   - **mapStateToProps:** It called every time the store state changes. It receives the entire store state, and should return an object of data this component needs.
   - **mapDispatchToProps:** It is used for dispatching an action from store.

     Syntax:

   ```js
   connect(mapStateToProps, mapDispatchToProps)(component);
   ```

3. ### mapStateToProps()

   It is used for selecting the part of the data from the store that the connected component needs. It’s frequently referred to as just mapState for short.

- It is called every time the store state changes.
- It receives the entire store state, and should return an object of data this component needs.
  Synatx: function mapStateToProps(state,ownProps?)
  Example:

  ```js
  const mapStateToProps = (state, props) => ({
    collection: selectShopCollection(props.match.params.catagoryId)(state),
  });
  // we can use createStructuredSelector
  const mapStateToProps = createStructuredSelector({
    collection: selectShopCollection(props.match.params.catagoryId),
  });
  ```

4. ### mapDispatchToProps()

   It is used for dispatching actions to the store.
   `dispatch` is a function of the Redux store. This is the only way to trigger a state change.
   Synatx: function mapDispatchToProps(state,ownProps?)
   Example:

   ```js
   const mapStateToProps = (dispatch, ownProps) => ({
     removeItem: (item) => dispatch(removeItemFromCart(item)),
     //or
     addItem: () => dispatch(addItemFromCart(ownProps.id)),
   });
   ```

5. ### batch(fn:function):

   React `bacth` API allows any React updates in an event loop tick to be batched together into a single render pass.
   You can use it to ensure that multiple actions dispatched outside of React only result in a single render update.

   ```js
   function myThunk() {
     return (dispatch, getState) => {
       // should only result in one combined re-render, not two
       batch(() => {
         dispatch(increment());
         dispatch(increment());
       });
     };
   }
   ```

6. ### How can we make State destrutor?

```js
const mapStateToProps = (state) => ({
  currenUser: state.user.currentUser,
});
//using destructor
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});
```

7. ### Hooks in React Redux
   1. #### useSelector:
      `useSelector()` hook used to select a specific store state in a functional component. `useSelector()` is alternative for mapStateToProps. We can use multiple selector in a single component.
      Syntax: const getCout=useSelector(state);
      Example:
      ```js
      const collection = useSelector((state) =>
        selectShopCollection(props.match.params.catagoryId)(state)
      );
      ```
   2. ### useDispatch():
      This hook returns a reference to the dispatch function from the Redux store.
      Syntax: const dispatch=useDispatch();
      We can memoized a dispatched action using callback hooks.
      ```js
      const dispatch = useDispatch();
      const incrementCounter = useCallback(
        () => dispatch({ type: "increment-counter" }),
        [dispatch]
      );
      ```
   3. ### useStore():
      This hook returns a reference to the same Redux store that was passed in to the <Provider> component.
      Example:
      ```js
      const store = useStore();
      console.log("Current state", store.getState());
      ```

## Redux-thunk

Redux Thunk middleware allows us create side effects logic, including complex synchronous logic that needs access to the store, and simple async logic like AJAX requests.
Example:

```js
export const fetechCollectionsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchCollectionStart());
    const collectionsRef = firestore.collection("collections");
    collectionsRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionFailure(error.message)));
  };
};
```

## persistStore: from redux-persist

Redux-Persist saves the Redux Store when the app is closed or refreshed in the iPhone simulator.
Step to follow configarations:

- Create a persist config for persistReducer(config,reducer).
  - config object has 2 mandatory property **i.key ii.stroage**
    code:
  ```js
  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"], //reducer name
  };
  // simply export the persistReducer
  export default persistReducer(persistConfig, rootReducer);
  ```
- create a persistStore(passTheDefaultreduxstore).
  Code:

  ```js
  export const persistor = persistStore(store);
  export default { store, persistor };
  ```

- provide the persistStore to the root of the component tree using Persistgate Api.
  Code:

  ```jsx
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
  ```

## redux Data Shape

1. ### Why do we need normalize data shape?

   Many applications deal with data that is nested or relational in nature. For example, a blog editor could have many Posts, each Post could have many Comments, and both Posts and Comments would be written by a User.
   Code:

   ```js
   const blogPosts = [
     {
       id: "post1",
       author: { username: "user1", name: "User 1" },
       body: "......",
       comments: [
         {
           id: "comment1",
           author: { username: "user2", name: "User 2" },
           comment: ".....",
         },
         {
           id: "comment2",
           author: { username: "user3", name: "User 3" },
           comment: ".....",
         },
       ],
     },
   ];
   ```

   1. **Problem**
      - When a piece of data is duplicated in several places, it becomes harder to make sure that it is updated appropriately.
      - Nested data means that the corresponding reducer logic has to be more nested and therefore more complex. In particular, trying to update a deeply nested field can become very ugly very fast.
   2. **Solution:** To normalize the data
      - Each type of data gets its own "table" in the state.
      - Each "data table" should store the individual items in an object, with the IDs of the items as keys and the items themselves as the values.
      - Any references to individual items should be done by storing the item's ID.
      - Arrays of IDs should be used to indicate ordering.
   3. **Relationships and tables**
      ```js
        {
            entities: {
                authors : { byId : {}, allIds : [] },
                books : { byId : {}, allIds : [] },
                authorBook : {
                    byId : {
                        1 : {
                            id : 1,
                            authorId : 5,
                            bookId : 22
                        },
                        2 : {
                            id : 2,
                            authorId : 5,
                            bookId : 15,
                        },
                        3 : {
                            id : 3,
                            authorId : 42,
                            bookId : 12
                        }
                    },
                    allIds : [1, 2, 3]
                }
            }
        }
      ```

## Normalizing Data: Using Normalizr libray

1. ### Normalize:
   Normalizes input data per the schema definition provided.
   data: required Input JSON (or plain JS object) data that needs normalization.
   schema: required A schema definition
   Example: normalize(input,schema);
2. ###
