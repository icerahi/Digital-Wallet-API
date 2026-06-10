import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import axios from "axios";
import { envVars } from "../../config/env";

export const getCurrencyRates = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Free currency API from RapidAPI (example implementation)
  const options = {
    method: 'GET',
    url: 'https://currency-exchange.p.rapidapi.com/exchange',
    params: {
      from: 'USD',
      to: 'BDT',
      q: '1.0'
    },
    headers: {
      'X-RapidAPI-Key': envVars.RAPIDAPI_KEY || 'test-key-replace-me',
      'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Exchange rate fetched successfully",
      data: response.data,
      links: [
        { href: "/api/v1/external/currency-rates", rel: "self", type: "GET" }
      ]
    });
  } catch (error) {
    // If the API fails (e.g. no key), we return a mock response for demonstration
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Mock exchange rate (RapidAPI key not configured)",
      data: { rate: 110.50, from: "USD", to: "BDT" },
      links: [
        { href: "/api/v1/external/currency-rates", rel: "self", type: "GET" }
      ]
    });
  }
});

export const externalControllers = {
  getCurrencyRates
};
