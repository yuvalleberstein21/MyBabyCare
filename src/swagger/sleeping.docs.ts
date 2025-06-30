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
      ],
      responses: {
        200: {
          description: 'רשימת שינות',
        },
        401: { description: 'לא מאומת' },
        404: { description: 'לא נמצא' },
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
        required: false,
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
        400: { description: 'בקשה לא תקינה' },
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
        required: false,
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
        200: { description: 'שינה הסתיימה' },
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
        required: true,
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
        200: { description: 'השינה עודכנה' },
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
        200: { description: 'השינה נמחקה' },
      },
    },
  },
};

export default sleepDocs;
