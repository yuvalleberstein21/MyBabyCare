const authDocs = {
  '/auth/login': {
    post: {
      summary: 'התחברות משתמש',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', example: 'user@example.com' },
                password: { type: 'string', example: '123456' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'התחברות הצליחה',
        },
        400: {
          description: 'שגיאה בפרטי ההתחברות',
        },
      },
    },
  },
  '/auth/signup': {
    post: {
      summary: 'רישום משתמש חדש',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'email', 'password'],
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'נרשם בהצלחה' },
        400: { description: 'שגיאה בנתונים' },
      },
    },
  },
  '/auth/logout': {
    post: {
      summary: 'התנתקות משתמש',
      tags: ['Auth'],
      responses: {
        200: {
          description: 'התנתקות הצליחה',
        },
        400: {
          description: 'שגיאה בהתנתקות',
        },
      },
    },
  },
};

export default authDocs;
