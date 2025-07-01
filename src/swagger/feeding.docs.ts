const feedingDocs = {
  '/feed/{babyId}': {
    get: {
      tags: ['Feeding'],
      summary: 'קבלת רשימת האכלות לתינוק',
      security: [{ cookieAuth: [] }],
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
          schema: { type: 'integer', default: 10 },
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
          description: 'רשימת האכלות עם מידע על עמודים',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  feedings: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Feeding' },
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
        401: { description: 'משתמש לא מחובר' },
        404: { description: 'תינוק לא נמצא או לא שייך למשתמש' },
        500: { description: 'שגיאה בשרת' },
      },
    },
    post: {
      tags: ['Feeding'],
      summary: 'הוספת האכלה חדשה לתינוק',
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: 'babyId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                type: { type: 'string' },
                amount: { type: 'number' },
                time: { type: 'string', format: 'date-time' },
                notes: { type: 'string' },
              },
              required: ['type'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'האכלה נוצרה בהצלחה',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  feeding: { $ref: '#/components/schemas/Feeding' },
                },
              },
            },
          },
        },
        400: { description: 'שדות שגויים' },
        401: { description: 'משתמש לא מחובר' },
        404: { description: 'תינוק לא נמצא או לא שייך למשתמש' },
        500: { description: 'שגיאה בשרת' },
      },
    },
  },
  '/feed/{feedingId}': {
    put: {
      tags: ['Feeding'],
      summary: 'עדכון האכלה קיימת',
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: 'feedingId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                type: { type: 'string' },
                amount: { type: 'number' },
                time: { type: 'string', format: 'date-time' },
                notes: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'האכלה עודכנה בהצלחה',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  feeding: { $ref: '#/components/schemas/Feeding' },
                },
              },
            },
          },
        },
        400: { description: 'מזהה האכלה לא תקין או גוף בקשה לא תקין' },
        404: { description: 'האכלה לא נמצאה או לא שייכת למשתמש' },
        500: { description: 'שגיאה בשרת' },
      },
    },
    delete: {
      tags: ['Feeding'],
      summary: 'מחיקת האכלה',
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: 'feedingId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'האכלה נמחקה בהצלחה',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        404: { description: 'האכלה לא נמצאה או לא שייכת למשתמש' },
        500: { description: 'שגיאה בשרת' },
      },
    },
  },
};

export default feedingDocs;
