process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * Mailgun email credentials
   */
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  },

  domainModel: {
    stores: {
      pagination: {
        defaultPageLength: 10
      }
    },
    products: {
      pagination: {
        defaultPageLength: 20
      }
    }
  }
};