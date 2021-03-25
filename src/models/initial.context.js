import accountingModel from './accounting.model';
import companyModel from './company.model';

const defaultRegistration = {
  // may be a data wrapper ?
  company: companyModel,
  shareholders: [],
  accounting: accountingModel,
  // internals
  review: false,
  displayOptionalForm: false,
};

export default defaultRegistration;
