import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer/rootReducer";

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
