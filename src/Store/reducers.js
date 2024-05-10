import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import teacherProfileReducer from "./addTeacher/teacherProfileSlice";
import teacherContactReducer from "./addTeacher/teacherContactSlice";
import teacherFinanceReducer from "./addTeacher/teacherFinanceSlice";
import teacherSkillReducer from "./addTeacher/teacherSkillSlice";
import filterReducer from "./filterSlice";
import searchReducer from "./searchSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  teacherProfile: teacherProfileReducer,
  teacherContact: teacherContactReducer,
  teacherFinance: teacherFinanceReducer,
  teacherSkill: teacherSkillReducer,
  filter: filterReducer,
  search: searchReducer,
});

export default rootReducer;
