import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, currentUser, validateRequest } from '@mytuts/common';
import { Ticket } from '../models/ticket';

const router = express.Router();
export interface Req extends Request {
  params: any;
  currentUser?: any;
  body: any;
}
router.post(
  '/api/tickets',
  currentUser,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Req, res: Response) => {
    const { title, price } = req.body;
    console.log('req - ', req.session);

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
