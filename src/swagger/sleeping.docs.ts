const sleepDocs = {
  '/sleep/{babyId}': {
    get: {
      tags: ['Sleep'],
      summary: 'קבלת רשימת שינות עבור תינוק',
      parameters: [
        {
          name: 'babyId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
        {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer', default: 50 },
        },
        {
          name: 'page',
          in: 'query',
          schema: { type: 'integer', default: 1 },
        },
        {
          name: 'startDate',
          in: 'query',
          schema: { type: 'string', format: 'date-time' },
        },
        {
          name: 'endDate',
          in: 'query',
          schema: { type: 'string', format: 'date-time' },
        },
      ],
      responses: {
        200: {
          description: 'רשימת שינות',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  sleeping: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        startTime: { type: 'string', format: 'date-time' },
                        endTime: { type: 'string', format: 'date-time' },
                        notes: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                      },
                    },
                  },
                  pagination: {
                    type: 'object',
                    properties: {
                      total: { type: 'integer' },
                      page: { type: 'integer' },
                      limit: { type: 'integer' },
                      pages: { type: 'integer' },
                    },
                  },
                },
              },
            },
          },
        },
        401: { description: 'לא מאומת' },
        404: { description: 'לא נמצאה שינה לתינוק' },
      },
    },
  },
  '/sleep/{babyId}/start': {
    post: {
      tags: ['Sleep'],
      summary: 'תחילת שינה',
      parameters: [
        {
          name: 'babyId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                startTime: { type: 'string', format: 'date-time' },
                notes: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'שינה התחילה בהצלחה' },
        400: { description: 'יש כבר שינה פתוחה / שגיאה בבקשה' },
      },
    },
  },
  '/sleep/{babyId}/end': {
    post: {
      tags: ['Sleep'],
      summary: 'סיום שינה',
      parameters: [
        {
          name: 'babyId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                endTime: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'שינה הסתיימה בהצלחה' },
        400: { description: 'שעת סיום לפני שעת התחלה' },
        404: { description: 'לא נמצאה שינה פתוחה' },
      },
    },
  },
  '/sleep/{sleepingId}': {
    put: {
      tags: ['Sleep'],
      summary: 'עריכת שינה',
      parameters: [
        {
          name: 'sleepingId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                startTime: { type: 'string', format: 'date-time' },
                endTime: { type: 'string', format: 'date-time' },
                notes: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'השינה עודכנה בהצלחה' },
        400: { description: 'שגיאה בעדכון' },
      },
    },
    delete: {
      tags: ['Sleep'],
      summary: 'מחיקת שינה',
      parameters: [
        {
          name: 'sleepingId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: { description: 'השינה נמחקה בהצלחה' },
        404: { description: 'שינה לא נמצאה' },
      },
    },
  },
};

export default sleepDocs;
