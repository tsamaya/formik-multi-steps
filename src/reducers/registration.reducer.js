import { v4 as uuidv4 } from 'uuid';

import {
  EDIT_COMPANY,
  EDIT_ACCOUNTING,
  ADD_SHAREHOLDER,
  EDIT_SHAREHOLDER,
  RESET_CONTEXT,
  REVIEW,
  DISPLAY_OPTIONAL_FORM,
} from 'actions/types';
import defaultRegistration from 'models/initial.context';

const reducer = (state, action) => {
  const { type = '', payload = {} } = action;
  console.log('[reducer]', type, payload);
  switch (type) {
    case RESET_CONTEXT:
      return defaultRegistration;

    case REVIEW:
      return { ...state, review: payload };

    case DISPLAY_OPTIONAL_FORM:
      return { ...state, displayOptionalForm: payload };

    case EDIT_COMPANY:
      return { ...state, company: payload };

    case EDIT_ACCOUNTING:
      return { ...state, accounting: payload };

    case ADD_SHAREHOLDER: {
      const { shareholders } = state;
      return {
        ...state,
        shareholders: [...shareholders, { id: uuidv4(), ...payload }],
      };
    }

    case EDIT_SHAREHOLDER: {
      const { shareholders } = state;
      return {
        ...state,
        shareholders: shareholders.map((shareholder) =>
          shareholder.id === payload.id
            ? { ...shareholder, ...payload }
            : shareholder
        ),
      };
    }

    default:
      return state;
  }
};

export default reducer;
