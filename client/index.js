const ready = require('document-ready');

const createStore = require('redux').createStore;
const watch = require('redux-watch');

const controllers = require('./controllers');
// const reductions = require('./reductions');
// const subscriptions = require('./subscriptions');

const store = createStore(state=>state);
const dispatch = store.dispatch;
const subscribe = store.subscribe;
const getState = store.getState;

const webFont = require('webfontloader');

ready(() => {
	loadFonts();
	fireController();
});

function loadFonts(){

	webFont.load({
		google: { families: ['Alef:hebrew'] },
		timeout: 30000
	});

}

function fireController(){
	const ctrl = controllers.getCtrlByPath();
	if (ctrl) ctrl(dispatch, subscribe, getState);
}