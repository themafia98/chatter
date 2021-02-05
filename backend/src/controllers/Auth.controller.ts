import { Request, Response } from "express";

namespace AuthController {
  export const login = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };

  export const register = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };

  export const logout = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };
}

export default AuthController;
