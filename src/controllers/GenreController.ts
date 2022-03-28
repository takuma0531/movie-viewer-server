import { Request, Response } from "express";
import { IGenreService } from "../services/genre/IGenreService";
import { BaseController } from "./BaseController";

export class GenreController extends BaseController {
  constructor(private readonly _genreService: IGenreService) {
    super();
  }

  // @route     GET api/v1/genres
  // @desc      get all genres
  // @access    public
  public async getAllGenres(req: Request, res: Response) {
    try {
      const genreReadDtos = await this._genreService.getAllGenres();
      return super.ok(res, genreReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/genres/genre?name=
  // @desc      get a genre by name
  // @access    public
  public async getGenreByName(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const genreReadDto = await this._genreService.getGenreByName(
        name as string
      );
      return super.ok(res, genreReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/genres/genre/:id
  // @desc      get a genre by id
  // @access    public
  public async getGenreById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const genreReadDto = await this._genreService.getGenreById(id!);
      return super.ok(res, genreReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     POST api/v1/genres
  // @desc      register a genre
  // @access    private & admin only
  public async createGenre(req: Request, res: Response) {
    try {
      const genreCreateDto = req.body;
      if (!genreCreateDto) return super.forbidden(res);
      const existingGenreReadDto = await this._genreService.getGenreByName(
        genreCreateDto.name
      );
      if (existingGenreReadDto)
        return super.ok(res, {
          message: "The genre has already been registered",
        });
      const genreReadDto = await this._genreService.createGenre(genreCreateDto);
      if (!genreReadDto)
        return super.internalServerError(res, "Something went wrong");
      return super.created(res, genreReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     PUT api/v1/genres
  // @desc      update a genre
  // @access    private & admin only
  public async updateGenre(req: Request, res: Response) {
    try {
      const genreUpdateDto = req.body;
      if (!genreUpdateDto) return super.forbidden(res);
      const genreReadDto = await this._genreService.updateGenre(genreUpdateDto);
      return super.ok(res, genreReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     DELETE api/v1/genres/:id
  // @desc      delete a genre
  // @access    private & admin only
  public async deleteGenre(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this._genreService.deleteGenre(id);
      return super.ok(res);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }
}
