import { Request, Response } from "express";
import { IArtistService } from "../services/artist/IArtistService";
import { BaseController } from "./BaseController";

export class ArtistController extends BaseController {
  constructor(private readonly _artistService: IArtistService) {
    super();
  }

  // @route     GET api/v1/artists
  // @desc      get all artists
  // @access    public
  public async getAllArtists(req: Request, res: Response) {
    try {
      const artistReadDtos = await this._artistService.getAllArtists();
      return super.ok(res, artistReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route    GET api/v1/artists/search?name=
  // @desc     get some artists by name
  // @access   public
  public async getByName(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const artistReadDtos = await this._artistService.getArtistsByName(
        name as string
      );
      return super.ok(res, artistReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     POST api/v1/artists
  // @desc      register an artist
  // @access    private & admin only
  public async registerArtist(req: Request, res: Response) {
    try {
      const artistCreateDto = req.body;
      if (!artistCreateDto) return super.forbidden(res);
      const existingArtistReadDtos = await this._artistService.getArtistsByName(
        artistCreateDto.name
      );
      if (existingArtistReadDtos != null)
        return super.ok(res, {
          message: "The artist has already been registered",
        });
      const artistReadDto = await this._artistService.createArtist(
        artistCreateDto
      );
      if (!artistReadDto)
        return super.internalServerError(res, "something went wrong");
      return super.created(res, artistReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     PUT api/v1/artists
  // @desc      update an artist
  // @access    private & admin only
  public async updateArtist(req: Request, res: Response) {
    try {
      const artistUpdateDto = req.body;
      if (!artistUpdateDto) return super.forbidden(res);
      const artistReadDto = await this._artistService.updateArtist(
        artistUpdateDto
      );
      return super.ok(res, artistReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     DELETE api/v1/artists/:id
  // @desc      delete an artist
  // @access    private & admin only
  public async deleteArtist(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return super.forbidden(res);
      await this._artistService.deleteArtist(id);
      return super.ok(res);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }
}
