import { combineReducers } from 'redux';
import reglog from './reglog';
import login from './login';
import company from './company';
import bdcompany from './bdcompany';
import nav from './nav';
import managernav from './managernav';
import department from './department';
import employee from './employee';
import gonggao from './gonggao';
import tieba from './tieba';
import post from './post';
import article from './article';
import comment from './comment';
import elastic from './elastic';
import user from './user';
import innermsg from './innermsg';
import chat from './chat';
import twitter from './twitter';
import userlink from './userlink';

const rootReducer = combineReducers({
  reglog,
  login,
  company,
  bdcompany,
  nav,
  managernav,
  department,
  employee,
  gonggao,
  tieba,
  post,
  article,
  elastic,
  comment,
  user,
  innermsg,
  chat,
  twitter,
  userlink
});

export default rootReducer;
