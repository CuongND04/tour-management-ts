import { Request, Response } from "express";
import Tour from "../../models/tour.model";

// [GET] /cart/
export const index = async (req: Request, res: Response) => {
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
  });
};
// [POST] /cart/list-json
export const listJson = async (req: Request, res: Response) => {
  const tours = req.body;
  let total = 0;
  for (const tour of tours) {
    const infoTour = await Tour.findOne({
      where: {
        id: tour.tourId,
        deleted: false,
        status: "active",
      },
      raw: true,
    });
    tour["info"] = infoTour;
    tour["image"] = JSON.parse(infoTour["images"])[0];
    infoTour["price_special"] =
      infoTour["price"] * (1 - infoTour["discount"] / 100);
    infoTour["total"] = infoTour["price_special"] * tour.quantity;
    total += infoTour["total"];
  }

  res.json({
    tours: tours,
    total: total,
  });
};
