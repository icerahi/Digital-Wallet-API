import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { walletServices } from "./wallet.Services";

const myWallet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const info = await walletServices.myWallet(decodedToken.userId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User Wallet retrieved successfully",
      data: info,
    });
  }
);

const addMoney = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    const { amount } = req.body;
    const wallet = await walletServices.addMoney(decodedToken.userId, amount);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Money added successfully",
      data: wallet,
    });
  }
);

const withdrawMoney = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    const { amount } = req.body;
    const wallet = await walletServices.withdrawMoney(
      decodedToken.userId,
      amount
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Money withdraw successfully",
      data: wallet,
    });
  }
);

const sendMoney = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const payload = {
      sender: decodedToken.userId,
      receiver: req.body.receiver,
      amount: req.body.amount,
    };
    const wallet = await walletServices.sendMoney(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Send money successfully",
      data: wallet,
    });
  }
);
const cashIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    
    const payload = {
      sender: decodedToken.userId,
      receiver: req.body.receiver,
      amount: req.body.amount,
    };
    const transactionInfo = await walletServices.cashIn(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Cash-in successfully",
      data: transactionInfo,
    });
  }
);

export const walletControllers = {
  myWallet,
  addMoney,
  withdrawMoney,
  sendMoney,
  cashIn,
};
