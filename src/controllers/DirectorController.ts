import { Request, Response } from "express";
import { IDirectorService } from "../services/director/IDirectorService";
import { BaseController } from "./BaseController";

export class DirectorController extends BaseController {
  constructor(private readonly _directorService: IDirectorService) {
    super();
  }

  // @route     GET api/v1/directors
  // @desc      GET all directors
  // @access    public
  public async getAllDirectors(req: Request, res: Response) {
    try {
      const directorReadDtos = await this._directorService.getAllDirectors();
      return super.ok(res, directorReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/directors/director/:id
  // @desc      GET a director by id
  // @access    public
  public async getDirectorById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const directorReadDto = await this._directorService.getById(id);
      if (!directorReadDto) return super.notFound(res);
      return super.ok(res, directorReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/directors/search?name=
  // @desc      GET some directors by name
  // @access    public
  public async getDirectorsByName(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const directorReadDtos = await this._directorService.getDirectorsByName(
        name as string
      );
      return super.ok(res, directorReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     POST api/v1/directors
  // @desc      create a director
  // @access    private & admin only
  public async createDirector(req: Request, res: Response) {
    try {
      const directorCreateDto = req.body;
      if (!directorCreateDto) return super.forbidden(res);
      const directorReadDto = await this._directorService.createDirector(
        directorCreateDto
      );
      return super.ok(res, directorReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     PUT api/v1/directors
  // @desc      update a director
  // @access    private & admin only
  public async updateDirector(req: Request, res: Response) {
    try {
      const directorUpdateDto = req.body;
      if (!directorUpdateDto) return super.forbidden(res);
      const directorReadDto = await this._directorService.updateDirector(
        directorUpdateDto
      );
      return super.ok(res, directorReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     DELETE api/v1/directors/director/:id
  // @desc      delete a director
  // @access    private & admin only
  public async deleteDirector(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this._directorService.deleteDirector(id);
      return super.ok(res);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }
}
