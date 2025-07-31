import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
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
      sender: decodedToken.phone,
      receiver: req.body.receiver,
      amount: req.body.amount,
    };

    if (payload.sender === payload.receiver) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "Sender and Receiver can be same. Choose a valid receiver."
      );
    }
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
      sender: decodedToken.phone,
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
const cashOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const payload = {
      sender: req.body.sender,
      receiver: decodedToken.phone,
      amount: req.body.amount,
    };
    const transactionInfo = await walletServices.cashOut(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Cash-out successfully",
      data: transactionInfo,
    });
  }
);

const getAllWallets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    const query = req.query;

    const result = await walletServices.getAllWallets(
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Retrieved All wallets successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleWallet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const walletId = req.params.id;

    const wallet = await walletServices.getSingleWallet(walletId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Wallet retrieved successfully",
      data: wallet,
    });
  }
);

const blockWallet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const walletId = req.params.id;

    const updatedWallet = await walletServices.blockWallet(walletId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Wallet blocked successfully",
      data: updatedWallet,
    });
  }
);

const unblockWallet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const walletId = req.params.id;

    const updatedWallet = await walletServices.unblockWallet(walletId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Wallet unblocked successfully",
      data: updatedWallet,
    });
  }
);

export const walletControllers = {
  myWallet,
  addMoney,
  withdrawMoney,
  sendMoney,
  cashIn,
  cashOut,
  getAllWallets,
  getSingleWallet,
  blockWallet,
  unblockWallet,
};
