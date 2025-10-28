const diaperDocs = {
  '/diaper/{babyId}': {
    get: {
      tags: ['Diaper'],
      summary: 'קבלת רשימת החלפות חיתולים עבור תינוק',
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
        {
          name: 'type',
          in: 'query',
          schema: {
            type: 'string',
            enum: ['pee', 'poo', 'both', 'all'],
          },
        },
      ],
      responses: {
        200: {
          description: 'רשימת החלפות חיתולים',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  diaper: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        time: { type: 'string', format: 'date-time' },
                        type: {
                          type: 'string',
                          enum: ['pee', 'poo', 'both'],
                        },
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
        404: { description: 'לא נמצאו החלפות חיתולים' },
        500: { description: 'שגיאה בשרת' },
      },
    },
    post: {
      tags: ['Diaper'],
      summary: 'יצירת החלפת חיתול חדשה',
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
              required: ['type'],
              properties: {
                time: { type: 'string', format: 'date-time' },
                type: {
                  type: 'string',
                  enum: ['pee', 'poo', 'both'],
                },
                notes: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'החלפת חיתול נוצרה בהצלחה',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  diaper: {
                    type: 'object',
                    properties: {
                      babyId: { type: 'string' },
                      time: { type: 'string', format: 'date-time' },
                      type: { type: 'string', enum: ['pee', 'poo', 'both'] },
                      notes: { type: 'string' },
                      createdAt: { type: 'string', format: 'date-time' },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: 'בקשה לא תקינה' },
        500: { description: 'שגיאה בשרת' },
      },
    },
  },

  '/diaper/{diaperId}': {
    put: {
      tags: ['Diaper'],
      summary: 'עריכת החלפת חיתול',
      parameters: [
        {
          name: 'diaperId',
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
                time: { type: 'string', format: 'date-time' },
                type: {
                  type: 'string',
                  enum: ['pee', 'poo', 'both'],
                },
                notes: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'החלפת חיתול עודכנה בהצלחה',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  diaper: {
                    type: 'object',
                    properties: {
                      babyId: { type: 'string' },
                      time: { type: 'string', format: 'date-time' },
                      type: { type: 'string', enum: ['pee', 'poo', 'both'] },
                      notes: { type: 'string' },
                      createdAt: { type: 'string', format: 'date-time' },
                    },
                  },
                },
              },
            },
          },
        },
        404: { description: 'לא נמצאה החלפת חיתול' },
        500: { description: 'שגיאה בשרת' },
      },
    },

    delete: {
      tags: ['Diaper'],
      summary: 'מחיקת החלפת חיתול',
      parameters: [
        {
          name: 'diaperId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        204: { description: 'החלפת חיתול נמחקה בהצלחה (ללא תוכן)' },
        404: { description: 'לא נמצאה החלפת חיתול' },
        500: { description: 'שגיאה בשרת' },
      },
    },
  },
};

export default diaperDocs;
