const Form = require('../models/formModel');
const Enquiry = require('../models/enquiryModel');

exports.submitForm = async (req, res, next) => {
  try {
    const { name, type, enquiry, companyName, phone } = req.body;

    // Validate required fields
    if (!name || !type || !enquiry || !phone) {
      return res.status(400).json({
        error: 'Validation failed',
        details: 'All required fields must be provided'
      });
    }

    // Validate type
    if (!['company', 'individual'].includes(type)) {
      return res.status(400).json({
        error: 'Validation failed',
        details: 'Type must be either "company" or "individual"'
      });
    }

    // Company name required if type is company
    if (type === 'company' && !companyName) {
      return res.status(400).json({
        error: 'Validation failed',
        details: 'Company name is required for company type'
      });
    }

    // Prepare submission
    const submission = {
      name,
      type,
      enquiry,
      phone,
      companyName: type === 'company' ? companyName : ''
    };

    await Form.create(submission);

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.initializeDatabase = async () => {
  try {
    await Form.setupTable();
    console.log('Database table initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

exports.submitEnquiry = async (req, res) => {
  try {
    const { email, date } = req.body;

    if (!email || !date) {
      return res.status(400).json({
        error: 'Validation failed',
        details: 'Email and date are required'
      });
    }

    await Enquiry.create({ email, date });

    res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully'
    });
  } catch (err) {
    console.error('Error submitting enquiry:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: err.message || 'Something went wrong'
    });
  }
};

exports.initializeEnquiryTable = async () => {
  try {
    await Enquiry.setupTable();
    console.log('Enquiry table initialized');
  } catch (error) {
    console.error('Error initializing enquiry table:', error);
    throw error;
  }
};
