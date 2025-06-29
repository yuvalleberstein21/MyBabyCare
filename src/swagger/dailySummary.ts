const dailySummaryDocs = {
  '/daily-summary/{babyId}': {
    get: {
      tags: ['Summary'],
      summary: 'קבלת סיכום יומי של האכלות, חיתולים ושינה לתינוק',
      parameters: [
        {
          name: 'babyId',
          in: 'path',
          description: 'מזהה התינוק',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'date',
          in: 'query',
          description: 'התאריך לקבלת הסיכום (פורמט YYYY-MM-DD)',
          required: true,
          schema: {
            type: 'string',
            format: 'date',
          },
        },
      ],
      responses: {
        '200': {
          description: 'סיכום יומי של התינוק',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  babyId: {
                    type: 'string',
                    description: 'מזהה התינוק',
                    example: '60a7c0c8f1d3c8001f0e4f4a',
                  },
                  date: {
                    type: 'string',
                    description: 'תאריך הסיכום בפורמט YYYY-MM-DD',
                    example: '2025-06-29',
                  },
                  feedings: {
                    type: 'array',
                    description: 'רשימת האכלות של התינוק ביום זה',
                    items: {
                      $ref: '#/components/schemas/Feeding',
                    },
                  },
                  diaperChanges: {
                    type: 'array',
                    description: 'רשימת החלפות חיתולים של התינוק ביום זה',
                    items: {
                      $ref: '#/components/schemas/Diaper',
                    },
                  },
                  sleepSessions: {
                    type: 'array',
                    description: 'רשימת פרקי שינה של התינוק ביום זה',
                    items: {
                      $ref: '#/components/schemas/Sleeping',
                    },
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'חוסר בפרמטרים נדרשים (babyId או date)',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'חסר תאריך או מזהה תינוק',
                  },
                },
              },
            },
          },
        },
        '500': {
          description: 'שגיאה בשרת',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'שגיאה בשרת',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Feeding: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'סוג ההאכלה',
            example: 'formula',
          },
          amount: {
            type: 'number',
            description: 'כמות ההאכלה במ"ל',
            example: 150,
          },
          time: {
            type: 'string',
            format: 'date-time',
            description: 'זמן ההאכלה',
            example: '2025-06-29T10:00:00Z',
          },
          notes: {
            type: 'string',
            description: 'הערות נוספות',
            example: 'היה רעב במיוחד',
          },
        },
      },
      Diaper: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'סוג החיתול (לכלוך/רטוב)',
            example: 'wet',
          },
          time: {
            type: 'string',
            format: 'date-time',
            description: 'זמן החלפת החיתול',
            example: '2025-06-29T12:00:00Z',
          },
          notes: {
            type: 'string',
            description: 'הערות נוספות',
            example: 'השתנה הרבה',
          },
        },
      },
      Sleeping: {
        type: 'object',
        properties: {
          startTime: {
            type: 'string',
            format: 'date-time',
            description: 'זמן התחלת השינה',
            example: '2025-06-29T14:00:00Z',
          },
          endTime: {
            type: 'string',
            format: 'date-time',
            description: 'זמן סיום השינה (אם ידוע)',
            example: '2025-06-29T16:00:00Z',
          },
        },
      },
    },
  },
};

export default dailySummaryDocs;
