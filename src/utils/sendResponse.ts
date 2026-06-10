import { Response } from "express";

interface TMeta {
  total: number;
}

export interface THateoasLink {
  href: string;
  rel: string;
  type: string;
}

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
  links?: THateoasLink[];
}

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
    links: data.links,
  });
};
