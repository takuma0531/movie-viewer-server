import { Request, Response } from "express";
import { IUserService } from "../services/user/IUserService";
import { BaseController } from "./BaseController";

// TODO: subject to change
export class UserController extends BaseController {
  constructor(private readonly _userService: IUserService) {
    super();
  }

  // @route     GET api/v1/users
  // @desc      get all users
  // @access    private & admin only
  public async getAllUsers(req: Request, res: Response) {
    try {
      const userReadDtos = await this._userService.getAllUsers();
      return super.ok(res, userReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/users/search?name=""
  // @desc      get users by name
  // @access    private & admin only
  public async getUsersByName(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const userReadDtos = await this._userService.getUsersByName(
        name as string
      );
      return super.ok(res, userReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/users/:id
  // @desc      get a user by id
  // @access    private
  public async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userReadDto = await this._userService.getUserById(id);
      return super.ok(res, userReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     POST api/v1/users
  // @desc      register a user
  // @access    public
  public async createUser(req: Request, res: Response) {
    try {
      const userCreateDto = req.body;
      if (!userCreateDto) return super.forbidden(res);
      const userReadDto = await this._userService.createUser(userCreateDto);
      return super.created(res, userReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     PUT api/v1/users
  // @desc      update a user
  // @access    private
  public async updateUser(req: Request, res: Response) {
    try {
      const userUpdateDto = req.body;
      if (!userUpdateDto) return super.forbidden(res);
      const userReadDto = await this._userService.updateUser(userUpdateDto);
      return super.ok(res, userReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     POST api/v1/users/login
  // @desc      login as a user
  // @access    public
  public async loginUser(req: Request, res: Response) {
    try {
      const credential = req.body;
      if (!credential) return super.unauthorized(res);
      const authorizedResult = await this._userService.loginUser(credential);
      return super.ok(res, authorizedResult);

      // if (authorizedResult.isAuthorized) super.ok(res, authorizedResult);
      // else return super.unauthorized(res);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     DELETE api/v1/users
  // @desc      delte a user
  // @access    private
  public async deleteUser(req: Request, res: Response) {
    try {
      return super.ok(res);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/users/check-auth
  // @desc      return new token to check if current token is valid
  // @access    private
  public async returnAuthorizedResult(req: Request, res: Response) {
    try {
      const authorizedResult = this._userService.getAuthResult({});
      return super.ok(res, authorizedResult);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }
}
