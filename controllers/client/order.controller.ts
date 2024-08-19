import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helper/generate";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";

// [POST] /order/
export const order = async (req: Request, res: Response) => {
  const data = req.body;
  const dataOrder = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial",
  };
  console.log(dataOrder);
  const order = await Order.create(dataOrder);
  const orderId = order.dataValues.id;
  const code = generateOrderCode(orderId);
  await Order.update(
    { code: code },
    {
      where: {
        id: orderId,
      },
    }
  );
  for (const item of data.cart) {
    const dataItem = {
      orderId,
      tourId: item.tourId,
      quantity: item.quantity,
    };
    const infoTour = await Tour.findOne({
      where: {
        id: item.tourId,
        deleted: false,
        status: "active",
      },
      raw: true,
    });
    dataItem["price"] = infoTour["price"];
    dataItem["discount"] = infoTour["discount"];
    dataItem["timeStart"] = infoTour["timeStart"];
    await OrderItem.create(dataItem);
  }
  res.json({
    code: 200,
    message: "Đặt hàng thành công!",
    orderCode: code,
  });
};

// [GET] /order/success
export const success = async (req: Request, res: Response) => {
  const orderCode = req.query.orderCode;
  const order = await Order.findOne({
    where: {
      code: orderCode,
      deleted: false,
    },
    raw: true,
  });
  const itemsOrder = await OrderItem.findAll({
    where: {
      orderId: order["id"],
    },
    raw: true,
  });
  let totalPrice = 0;

  for (const item of itemsOrder) {
    item["price_special"] = item["price"] * (1 - item["discount"] / 100);
    item["total"] = item["price_special"] * item["quantity"];
    totalPrice += item["total"];

    const tourInfo = await Tour.findOne({
      where: {
        id: item["tourId"],
        deleted: false,
        status: "active",
      },
      raw: true,
    });

    if (tourInfo["images"]) {
      tourInfo["images"] = JSON.parse(tourInfo["images"]);
      item["image"] = tourInfo["images"][0];
    }

    item["title"] = tourInfo["title"];
    item["slug"] = tourInfo["slug"];
  }

  res.render("client/pages/order/success", {
    pageTitle: "Đặt hàng thành công",
    order: order,
    ordersItem: itemsOrder,
    totalPrice: totalPrice,
  });
};
