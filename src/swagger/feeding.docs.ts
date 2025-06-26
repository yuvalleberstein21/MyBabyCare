const feedingDocs = {
  '/feed/{babyId}': {
    get: {
      tags: ['Feeding'],
      summary: 'קבלת רשימת האכלות לתינוק',
      parameters: [
        {
          name: 'babyId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'רשימת האכלות',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Feeding' },
              },
            },
          },
        },
        401: { description: 'משתמש לא מחובר' },
        404: { description: 'תינוק לא נמצא או לא שייך למשתמש' },
      },
    },
    post: {
      tags: ['Feeding'],
      summary: 'הוספת האכלה חדשה לתינוק',
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
                amount: { type: 'string' },
                time: { type: 'string', format: 'date-time' },
                notes: { type: 'string' },
              },
              required: ['type', 'time'],
            },
          },
        },
      },
      responses: {
        201: { description: 'האכלה נוצרה בהצלחה' },
        400: { description: 'שדות שגויים' },
        401: { description: 'משתמש לא מחובר' },
        404: { description: 'תינוק לא נמצא או לא שייך למשתמש' },
      },
    },
  },
  '/feed/{feedingId}': {
    put: {
      tags: ['Feeding'],
      summary: 'עדכון האכלה קיימת',
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
                amount: { type: 'string' },
                time: { type: 'string', format: 'date-time' },
                notes: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'האכלה עודכנה בהצלחה' },
        404: { description: 'האכלה לא נמצאה או לא שייכת למשתמש' },
      },
    },
    delete: {
      tags: ['Feeding'],
      summary: 'מחיקת האכלה',
      parameters: [
        {
          name: 'feedingId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: { description: 'האכלה נמחקה בהצלחה' },
        404: { description: 'האכלה לא נמצאה או לא שייכת למשתמש' },
      },
    },
  },
};

export default feedingDocs;
