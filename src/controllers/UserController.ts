import { Request, Response } from "express";
// service
import { BaseController } from "./BaseController";

export class UserController extends BaseController {
  constructor() {
    super();
  }

  // @route     GET api/v1/users
  // @desc      get all users
  // @access    private & admin only
  public async getAllUsers(req: Request, res: Response) {
    const users: any[] = [];
    super.ok(res, users);
  }

  // @route     GET api/v1/users/search?name=""
  // @desc      get users by name
  // @access    private & admin only
  public async getUsersByName(req: Request, res: Response) {
    const users: any[] = [];
    super.ok(res, users);
  }

  // @route     GET api/v1/users/:id
  // @desc      get a user by id
  // @access    private
  public async getUserById(req: Request, res: Response) {
    const user: any = {};
    super.ok(res, user);
  }

  // @route     POST api/v1/users
  // @desc      register a user
  // @access    public
  public async createUser(req: Request, res: Response) {
    const user = req.body;
    super.ok(res, user);
  }

  // @route     PUT api/v1/users
  // @desc      update a user
  // @access    private
  public async updateUser(req: Request, res: Response) {
    const user = req.body;
    super.ok(res, user);
  }

  // @route     POST api/v1/users/login
  // @desc      login as a user
  // @access    public
  public async loginUser(req: Request, res: Response) {
    const credential = req.body;
    super.ok(res, credential);
  }

  // @route     DELETE api/v1/users
  // @desc      delte a user
  // @access    private
  public async deleteUser(req: Request, res: Response) {
    super.ok(res);
  }
}
