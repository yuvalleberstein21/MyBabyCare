const babyDocs = {
  '/babies': {
    get: {
      tags: ['Babies'],
      summary: 'קבלת רשימת תינוקות של המשתמש',
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: 'רשימת תינוקות התקבלה בהצלחה',
        },
        401: {
          description: 'משתמש לא מאומת',
        },
      },
    },
    post: {
      tags: ['Babies'],
      summary: 'הוספת תינוק חדש',
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                birthDate: { type: 'string', format: 'date' },
                gender: { type: 'string', enum: ['male', 'female'] },
                notes: { type: 'string' },
                image: { type: 'string', format: 'binary' },
              },
              required: ['name', 'birthDate', 'gender'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'תינוק נוצר בהצלחה',
        },
        400: {
          description: 'נתונים שגויים',
        },
        401: {
          description: 'משתמש לא מאומת',
        },
      },
    },
  },
  '/babies/{babyId}': {
    get: {
      tags: ['Babies'],
      summary: 'קבלת פרטי תינוק לפי מזהה',
      security: [{ cookieAuth: [] }],
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
          description: 'פרטי תינוק',
        },
        404: {
          description: 'תינוק לא נמצא או לא שייך למשתמש',
        },
      },
    },
    put: {
      tags: ['Babies'],
      summary: 'עדכון פרטי תינוק',
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
                name: { type: 'string' },
                birthDate: { type: 'string', format: 'date' },
                notes: { type: 'string' },
                gender: { type: 'string', enum: ['male', 'female'] },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'תינוק עודכן בהצלחה',
        },
        400: {
          description: 'שגיאה בעדכון',
        },
        404: {
          description: 'תינוק לא נמצא או לא שייך למשתמש',
        },
      },
    },
  },
};

export default babyDocs;
