import express, { Request, Response } from 'express'

import { DashboardQueries } from '../services/dashboard'

const dashboardRoutes = (app: express.Application) => {
    app.get('/products_in_orders', productsInOrders)
    app.get('/users_In_Order',usersInOrders)
    app.get('/mostExpensive5',mostExpensive5)
}

const dashboard = new DashboardQueries()

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders()
  res.json(products)
}

const usersInOrders = async (_req: Request, res: Response) => {
    const products = await dashboard.usersInOrders()
    res.json(products)
  }

const mostExpensive5 = async (_req: Request, res: Response) => {
    const products = await dashboard.mostExpesive5()
    res.json(products)
  }
export default dashboardRoutes