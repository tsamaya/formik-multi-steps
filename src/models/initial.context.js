import accountingModel from './accounting.model';
import companyModel from './company.model';

const defaultRegistration = {
  company: companyModel,
  shareholders: [],
  accounting: accountingModel,
};

export default defaultRegistration;
