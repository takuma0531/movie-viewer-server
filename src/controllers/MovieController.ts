import { Request, Response } from "express";
import { MovieReadDto } from "../typings/model/movie/dto";
import { IMovieService } from "../services/movie/IMovieService";
import { BaseController } from "./BaseController";
import { ResponseMessageHandler } from "../utils/ResponseMessageHandler";
import { unlinkAsync } from "../utils/FileDeletionHandler";

export class MovieController extends BaseController {
  constructor(private readonly _movieService: IMovieService) {
    super();
  }

  // @route     GET api/v1/movies
  // @desc      get all movies
  // @access    public
  public async getAllMoivies(req: Request, res: Response) {
    try {
      const movieReadDtos = await this._movieService.getAllMovies();
      return super.ok(res, movieReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/movies/movie/:id
  // @desc      get a movie by id
  // @access    public
  public async getMovieById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const movieReadDto = await this._movieService.getMovieById(id);
      if (!movieReadDto) return super.notFound(res);
      return super.ok(res, movieReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/movies/search?title=
  // @desc      get movies by title
  // @access    public
  public async getMoviesByTitle(req: Request, res: Response) {
    try {
      const { title } = req.query;
      const movieReadDtos = await this._movieService.getMoviesByTitle(
        title as string
      );
      return super.ok(res, movieReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/movies/recent?limit=
  // @desc      get recent movies up to the specified number
  // @access    public
  public async getRecentMovies(req: Request, res: Response) {
    try {
      const { limit } = req.query;
      const movieReadDtos = await this._movieService.getLastestMovies(
        Number(limit)
      );
      return super.ok(res, movieReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     POST api/v1/movies
  // @desc      create a movie
  // @access    private
  public async createMovie(req: Request, res: Response) {
    try {
      const movieCreateDto: MovieReadDto = req.body;
      if (!movieCreateDto) return super.forbidden(res);
      const existingMovieReadDto = await this._movieService.getMovieByTitle(
        movieCreateDto.title
      );
      if (existingMovieReadDto != null) {
        if (req.file?.path) await unlinkAsync(req.file.path);
        return super.ok(res, {
          message: ResponseMessageHandler.returnResMsg("The movie"),
        });
      }
      movieCreateDto.thumbnail = req.file?.filename;
      const movieReadDto = await this._movieService.createMovie(movieCreateDto);
      return super.created(res, movieReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     PUT api/v1/movies
  // @desc      update a movie
  // @access    private
  public async updateMovie(req: Request, res: Response) {
    try {
      const movieUpdateDto = req.body;
      movieUpdateDto.thumbnail = req.file?.path;
      const movieReadDto = await this._movieService.updateMovie(movieUpdateDto);
      return super.ok(res, movieReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     DELELTE api/v1/movies/:id
  // @desc      delete a movie
  // @access    private
  public async deleteMovie(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this._movieService.deleteMovie(id);
      return super.ok(res);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }
}
