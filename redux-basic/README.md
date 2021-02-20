## Basic Redux

# what is redux?

11. ### How to style a redux?

        **Essential:** These rules help prevent errors.

            - Do not muted state.
            - Must not have side effects. So the reducer can be predictable. We must not put any asynchronous code or generate random values, or logger like console code in reducer rather we modify side effect code outside of reducer.
            - Put serialized data in state or action.
            - Only one redux store for a single app.

        **Strongly Recommended:**These rules have been found to improve readability and/or developer experience in most projects.

            - Use Redux Toolkit for writing redux logic.
            - Use immer for writing immutable state.
            - Structured files as feature folders or Duck pattern.
            - Put as much logic as possible in the reducer.
            - Reducer should own the state shape. For example if we pass a payload that doest not match the state object shape then raise a error.
            - Name state slice based on the stored data.

            ```
            combineReducers({
                users:usersReducer,
                posts:postsReducer
            })
            ```

            - Treat Reducers as State Machines: where the combination of both the current state and the dispatched action determines whether a new state value is actually calculated, not just the action itself unconditionally.

            ```
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

    **Recommended**:

        - Write Action Types as domain/eventName.
        1. [Domain] Action Type"=> "[Login Page] Login"
        2. "todos/addTodos"
        - Using action creators.
        - Use Thunk for async code.
        - Move complex logic outside of the componet usally into thunk.
        - Use selector function to read from store state. Using memoized selector functions for reading store state whenever possible,

12. ### Redux Configuration
