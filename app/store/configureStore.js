import {
	createStore,
	applyMiddleware,
	compose
} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore(initialState) {

	const store = createStore(rootReducer, initialState,
		// 触发 redux-devtools
		window.devToolsExtension ? compose(applyMiddleware(thunk), window.devToolsExtension()) : applyMiddleware(thunk)
	)
	return store
}