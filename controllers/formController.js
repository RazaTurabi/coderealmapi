const Form = require('../models/formModel');
const Enquiry = require('../models/enquiryModel');

exports.submitForm = async (req, res, next) => {
  try {
    const { name, type, enquiry, companyName } = req.body;
    
    // Validate required fields
    if (!name || !type || !enquiry) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: 'Name, type, and enquiry are required fields' 
      });
    }
    
    // Validate type
    if (!['company', 'individual'].includes(type)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: 'Type must be either "company" or "individual"' 
      });
    }
    
    // Validate company name for company type
    if (type === 'company' && !companyName) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: 'Company name is required for company type' 
      });
    }
    
    const submission = {
      name,
      type,
      enquiry,
      companyName: type === 'company' ? companyName : ''
    };
    
    await Form.create(submission);
    
    res.status(200).json({ 
      success: true,
      message: 'Form submitted successfully' 
    });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};

exports.initializeDatabase = async () => {
  try {
    await Form.setupTable();
    console.log('Database table initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error; // Rethrow to handle in app.js
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

// add table init
exports.initializeEnquiryTable = async () => {
  try {
    await Enquiry.setupTable();
    console.log('Enquiry table initialized');
  } catch (error) {
    console.error('Error initializing enquiry table:', error);
    throw error;
  }
};