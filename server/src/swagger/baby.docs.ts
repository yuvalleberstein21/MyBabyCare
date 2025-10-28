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
        500: {
          description: 'שגיאה בשרת',
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
              required: ['name', 'birthDate', 'gender'],
              properties: {
                name: { type: 'string', example: 'יונתן' },
                birthDate: {
                  type: 'string',
                  format: 'date',
                  example: '2023-01-01',
                },
                gender: { type: 'string', enum: ['male', 'female'] },
                notes: { type: 'string', example: 'תינוק חמוד שאוהב לישון' },
                image: {
                  type: 'string',
                  format: 'binary',
                  description: 'קובץ תמונה של התינוק (אופציונלי)',
                },
              },
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
        500: {
          description: 'שגיאה בשרת',
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
        200: { description: 'פרטי תינוק' },
        401: { description: 'משתמש לא מאומת' },
        404: { description: 'תינוק לא נמצא או לא שייך למשתמש' },
        500: { description: 'שגיאה בשרת' },
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
                name: { type: 'string', example: 'דנה' },
                birthDate: {
                  type: 'string',
                  format: 'date',
                  example: '2023-02-15',
                },
                notes: { type: 'string', example: 'נולדה במשקל 3.1 ק"ג' },
                gender: { type: 'string', enum: ['male', 'female'] },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'התינוק עודכן בהצלחה' },
        400: { description: 'שגיאה בעדכון' },
        401: { description: 'משתמש לא מאומת' },
        404: { description: 'תינוק לא נמצא או לא שייך למשתמש' },
        500: { description: 'שגיאה בשרת' },
      },
    },

    delete: {
      tags: ['Babies'],
      summary: 'מחיקת תינוק לפי מזהה',
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
        200: { description: 'התינוק נמחק בהצלחה' },
        401: { description: 'משתמש לא מאומת' },
        404: { description: 'תינוק לא נמצא או לא שייך למשתמש' },
        500: { description: 'שגיאה בשרת' },
      },
    },
  },
};

export default babyDocs;
