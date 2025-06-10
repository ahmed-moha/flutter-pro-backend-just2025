import { Request, Response } from 'express';

export class ProductController {
  async getProducts(req: Request, res: Response) {
    res.json({ message: 'Get products' });
  }

  async createProduct(req: Request, res: Response) {
    res.json({ message: 'Create product' });
  }
} 