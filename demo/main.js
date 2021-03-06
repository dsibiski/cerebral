import './../node_modules/todomvc-common/base.css';
import './../node_modules/todomvc-app-css/index.css';
import './styles.css';

import React from 'react';
import App from './App.js';
import controller from './controller.js';
import ReactiveRouter from 'reactive-router';

// ACTIONS
import addTodo from './actions/addTodo.js';
import removeTodo from './actions/removeTodo.js';
import toggleTodoCompleted from './actions/toggleTodoCompleted.js';
import setVisibleTodos from './actions/setVisibleTodos.js';
import setNewTodoTitle from './actions/setNewTodoTitle.js';
import setAllChecked from './actions/setAllChecked.js';
import setCounters from './actions/setCounters.js';
import toggleAllChecked from './actions/toggleAllChecked.js';
import saveTodo from './actions/saveTodo.js';
import updateTodo from './actions/updateTodo.js';
import setFilter from './actions/setFilter.js';
import clearCompleted from './actions/clearCompleted.js';
import editTodo from './actions/editTodo.js';
import setTodoNewTitle from './actions/setTodoNewTitle.js';
import stopEditingTodo from './actions/stopEditingTodo.js';
import setUrl from './actions/setUrl.js';

// SIGNALS

controller.signal('newTodoTitleChanged', setNewTodoTitle);
controller.signal('newTodoSubmitted', addTodo, setVisibleTodos, setAllChecked, setCounters, [saveTodo], updateTodo);
controller.signal('removeTodoClicked', removeTodo, setVisibleTodos, setAllChecked, setCounters);
controller.signal('toggleCompletedChanged', toggleTodoCompleted, setVisibleTodos, setAllChecked, setCounters);
controller.signal('toggleAllChanged', toggleAllChecked, setVisibleTodos, setCounters);
controller.signal('routeChanged', setUrl, setFilter, setVisibleTodos);
controller.signal('clearCompletedClicked', clearCompleted, setVisibleTodos, setAllChecked, setCounters);
controller.signal('todoDoubleClicked', editTodo);
controller.signal('newTitleChanged', setTodoNewTitle);
controller.signal('newTitleSubmitted', stopEditingTodo);

// RENDER
React.render(controller.injectInto(App), document.querySelector('#app'));

// ROUTER
const router = ReactiveRouter({
  '/': controller.signals.routeChanged,
  '/active': controller.signals.routeChanged,
  '/completed': controller.signals.routeChanged
});

controller.eventEmitter.on('change', function (state) {
  router.set(state.url);
});

controller.eventEmitter.on('remember', function (state) {
  router.setSilent(state.url);
});
