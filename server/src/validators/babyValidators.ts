import { Request, Response, NextFunction } from 'express';

export const validateCreateBaby = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, gender, birthDate, weight, height, notes } = req.body;
  const errors: string[] = [];

  //  Name
  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('שם התינוק נדרש');
  } else if (name.trim().length < 2) {
    errors.push('שם התינוק חייב להכיל לפחות 2 תווים');
  }

  //  Gender
  const allowedGenders = ['זכר', 'נקבה'];
  if (!gender || typeof gender !== 'string') {
    errors.push('מין התינוק נדרש');
  } else if (!allowedGenders.includes(gender)) {
    errors.push('מין התינוק חייב להיות זכר או נקבה');
  }

  //  Birthdate
  if (!birthDate || typeof birthDate !== 'string') {
    errors.push('תאריך לידה נדרש');
  } else {
    const parsed = Date.parse(birthDate);
    if (isNaN(parsed)) {
      errors.push('תאריך לידה לא תקין');
    } else if (new Date(parsed) > new Date()) {
      errors.push('תאריך הלידה לא יכול להיות בעתיד');
    }
  }

  //  Weight
  if (weight !== undefined && weight !== null) {
    const n = Number(weight);
    if (isNaN(n)) {
      errors.push('משקל חייב להיות מספר תקין');
    } else if (n < 0) {
      errors.push('המשקל לא יכול להיות שלילי');
    } else if (n > 20) {
      errors.push('המשקל לא יכול להיות מעל 20 ק"ג');
    }
  }

  //  Height
  if (height !== undefined && height !== null) {
    const n = Number(height);
    if (isNaN(n)) {
      errors.push('גובה חייב להיות מספר תקין');
    } else if (n < 0) {
      errors.push('הגובה לא יכול להיות שלילי');
    } else if (n > 120) {
      errors.push('הגובה לא יכול להיות מעל 120 ס"מ');
    }
  }

  //  Notes
  if (notes && typeof notes !== 'string') {
    errors.push('הערות חייבות להיות טקסט');
  } else if (notes && notes.length > 200) {
    errors.push('הערות לא יכולות להיות מעל 200 תווים');
  }

  if (errors.length > 0) {
    res.status(400).json({ error: errors[0] });
    return;
  }

  next();
};

export const validateUpdateBaby = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, gender, birthDate, weight, height, notes } = req.body;
  const errors: string[] = [];

  if (
    name !== undefined &&
    (typeof name !== 'string' || name.trim().length < 2)
  ) {
    errors.push('השם חייב להכיל לפחות 2 תווים');
  }

  if (gender !== undefined && !['זכר', 'נקבה'].includes(gender)) {
    errors.push('מין התינוק חייב להיות זכר או נקבה');
  }

  if (birthDate !== undefined) {
    const parsed = Date.parse(birthDate);
    if (isNaN(parsed)) errors.push('תאריך לידה לא תקין');
    else if (new Date(parsed) > new Date())
      errors.push('תאריך הלידה לא יכול להיות בעתיד');
  }

  if (
    weight !== undefined &&
    (typeof weight !== 'number' || weight < 0 || weight > 20)
  ) {
    errors.push('משקל חייב להיות מספר תקין בין 0 ל-20 ק"ג');
  }

  if (
    height !== undefined &&
    (typeof height !== 'number' || height < 0 || height > 120)
  ) {
    errors.push('גובה חייב להיות מספר תקין בין 0 ל-120 ס"מ');
  }

  if (
    notes !== undefined &&
    (typeof notes !== 'string' || notes.length > 200)
  ) {
    errors.push('הערות לא יכולות להיות מעל 200 תווים');
  }

  if (errors.length > 0) {
    res.status(400).json({ error: errors[0] });
    return;
  }

  next();
};
