import test from 'tape';
import postReducer from '../redux/reducers/reducer';
import deepFreeze from 'deep-freeze';
import * as ActionTypes from '../redux/constants/constants';

test('action ADD_POST is working', (t) => {
  const stateBefore = { posts: [], post: null };
  const stateAfter = { posts: [{
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    cuid: null,
    slug: 'first-post',
    dateadded: null,
    updateddate: undefined,
  }], post: null };

  const action = {
    type: ActionTypes.ADD_POST,
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    cuid: null,
    slug: 'first-post',
    dateadded: null,
    updateddate: undefined,
  };
  deepFreeze(stateBefore);
  deepFreeze(action);
  t.deepEqual(postReducer(stateBefore, action), stateAfter);
  t.end();
});

test('action ADD_SELECTED_POST is working', (t) => {
  const stateBefore = {
    posts: [{
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      cuid: null,
      slug: 'first-post',
      dateadded: null,
      updateddate: undefined,
    }],
    selectedPost: null,
  };

  const stateAfter = {
    posts: [{
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      cuid: null,
      slug: 'first-post',
      dateadded: null,
      updateddate: undefined,
    }],
    post: {
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      cuid: null,
      slug: 'first-post',
      dateadded: null,
      updateddate: undefined,
    },
  };

  const action = {
    type: ActionTypes.ADD_SELECTED_POST,
    post: {
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      cuid: null,
      slug: 'first-post',
      dateadded: null,
      updateddate: undefined,
    },
  };

  deepFreeze(stateBefore);
  deepFreeze(action);
  t.deepEqual(postReducer(stateBefore, action), stateAfter);
  t.end();
});
