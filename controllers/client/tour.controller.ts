import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";

// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;
  // đứng từ database để truy vấn
  const tours = await sequelize.query(
    `
    SELECT tours.*, ROUND(price * (1 - discount/100), 0) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = '${slugCategory}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';
  `,
    {
      type: QueryTypes.SELECT,
    }
  );
  tours.forEach((tour) => {
    if (tour["images"]) {
      const images = JSON.parse(tour["images"]);
      tour["image"] = images[0]; // chỉ lấy ảnh đầu thôi
    }
    tour["price_special"] = +tour["price_special"]; // chuyển nó sang dạng số
  });
  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tour",
    tours: tours,
  });
};
