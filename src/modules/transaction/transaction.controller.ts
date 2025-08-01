/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { transactionServices } from "./transaction.service";

const myTransactions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const query = req.query;
    const result = await transactionServices.myTransactions(
      decodedToken.userId,
      query as Record<string, string>
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User Transactions retreived successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);
const getAllTransactions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await transactionServices.getAllTransactions(
      query as Record<string, string>
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User Transactions retreived successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleTransaction = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const transactionId = req.params.id;
    const transaction = await transactionServices.getSingleTransaction(
      transactionId
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Transaction retrieved successfully",
      data: transaction,
    });
  }
);

const updateTransactionStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const transactionId = req.params.id;
    const payload = req.body;

    const result = await transactionServices.updateTransactionStatus(
      transactionId,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Transaction status changed successfully",
      data: result,
    });
  }
);

export const transactionControllers = {
  myTransactions,
  getAllTransactions,
  getSingleTransaction,
  updateTransactionStatus,
};
