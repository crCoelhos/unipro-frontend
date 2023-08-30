import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

class CouponController {
  static createCoupon = async (couponData: {
    code: string;
    type: string;
    amount: string;
    expireDate: string;
    finishDate: string;
    isActive: boolean;
    usageCount: number;
    usageMax: number;
    isUniqueUse: boolean;
  }) => {
    const dataFromStorage = sessionStorage.getItem("user");
    let token = "";

    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      token = parsedData.token;
    }

    const config = {
      headers: {
        Authorization: token,
        Access: serverSideAccessToken,
      },
    };

    try {
      const response = await axios.post(
        `${url}admin/coupons`,
        couponData,
        config
      );
    } catch (error) {
      console.error(error);
    }
  };
}

export default CouponController;
