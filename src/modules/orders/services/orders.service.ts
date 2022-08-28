import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from  'mongoose';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/order.dto';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) { }

  async create(payload: CreateOrderDto) {
    const newOrder = await new this.orderModel(payload);
    return newOrder.save();
  }

  findAll() {
    return this.orderModel
      .find()
      .populate('customer') 
      .populate('products') 
      .exec();
  }

  async findOne(id: string) {
    const ORDER = await this.orderModel
    .findById(id)
    .populate('customer')
    .populate('products') 
    .exec()
    if(!ORDER) {
      throw new NotFoundException(
        `ERROR_SERVICE: The order ${id} does not exist`,
      );
    }
    return ORDER;
  }

  async update(id: string, payload: UpdateOrderDto) {
    const ORDER = await this.orderModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
      if(!ORDER) {
        throw new NotFoundException(
          `ERROR_SERVICE: The order ${id} does not exist`,
        );
      }
      return ORDER;
  }

  async remove(id: string) {
    return await this.orderModel.findByIdAndDelete(id);
  }

  //----------------------------------------------------------------
  // # ADD / QUIT PRODUCT IN ORDER

  /* async addProducts(orderId: string, payload: Array<ProductsToOrderDto>) { 
    const order = await this.orderModel.findById(orderId);
    payload.forEach(
      (products) => 
      //order.products.push(products)
      order.products.addToSet(products)
    );
    return order.products;
    //console.log(payload);
    //return order.save();
  }

  async removeProduct(orderId: string, orderProductId: string) {
    const order = await this.orderModel.findById(orderId);
    order.products.pull(orderProductId);
    return order.save();
  } */
  
  async addProducts(id: string, productsIds: string[]) {  // 👈 
    const order = await this.orderModel.findById(id);
    productsIds.forEach((pId) => order.products.push(pId));
    return order.save();
  }

  async removeProduct(id: string, productId: string) { // 👈 
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order.save();
  }

}
