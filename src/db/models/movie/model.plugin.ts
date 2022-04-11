import { Schema } from "mongoose";
import { MovieDocument } from "../../../typings/model/movie";
import { MovieReadDto, MovieCreateDto } from "../../../typings/model/movie/dto";
import { Artist } from "../artist/artist.model";
import { Director } from "../director/director.model";
import { Genre } from "../genre/genre.model";
import { Comment } from "../comment/comment.model";
import { Rating } from "../rating/rating.model";
import { RatingDocument } from "../../../typings/model/rating";
import { DirectorDocument } from "../../../typings/model/director";
import { User } from "../user/user.model";
import { Movie } from "../movie/movie.model";

export const moviePlugin = (movieSchema: Schema<MovieDocument>) => {
  movieSchema.static(
    "toDocument",
    function (movieCreateDto: MovieCreateDto): MovieDocument {
      return new this(movieCreateDto);
    }
  );

  movieSchema.method("toReadDto", function (): MovieReadDto {
    const movieReadDto: MovieReadDto = {
      id: this._id,
      title: this.title,
      genre: this.genre,
      description: this.description,
      thumbnail: this.thumbnail,
      director: this.director,
      artists: this.artists,
      comments: this.comments,
      ratings: this.ratings,
      averageRating: this.averageRating,
      user: this.user,
    };
    return movieReadDto;
  });

  movieSchema.pre("save", async function (next) {
    try {
      console.log("document middleware invoked in movie plugin");

      // artist update
      if (this.artists.length != 0) {
        this.artists.forEach(async (artist) => {
          const artistDocument = await Artist.findById(artist);
          if (!artistDocument) throw "Something went wrong";
          artistDocument.movies.push(this._id);
          await Artist.findByIdAndUpdate(artistDocument.id, artistDocument);
        });
      }
      // director update
      const castedDirector = this.director as DirectorDocument;
      if (castedDirector?.name) {
        const directorDocument = await Director.findById(this.director);
        if (!directorDocument) throw "Something went wrong";
        this.director = directorDocument.id;
        directorDocument.movies.push(this._id);
        await Director.findByIdAndUpdate(directorDocument.id, directorDocument);
      }
      // genre update
      const genreDocument = await Genre.findById(this.genre);
      if (!genreDocument) throw "Something went wrong";
      genreDocument.movies.push(this.id);
      await Genre.findByIdAndUpdate(genreDocument.id, genreDocument);
      // user update
      const userDocument = await User.findById(this.user);
      if (!userDocument) throw "Something went wrong";
      userDocument.movies.push(this.id);
      await User.findByIdAndUpdate(userDocument.id, userDocument);
      next();
    } catch (err: any) {
      throw err;
    }
  });

  movieSchema.pre("updateOne", async function (next) {
    try {
      console.log("document middleware invoked in movie plugin (update)");
      // average rating update
      const movieDocument = await Movie.findById(this._id).populate("ratings");
      const ratingPoints: number[] = [];
      movieDocument!.ratings.forEach(
        (rating: string | RatingDocument): void => {
          const castedRating = rating as RatingDocument;
          ratingPoints.push(castedRating.point);
        }
      );
      const averageRating =
        ratingPoints.reduce((prev, curr) => prev + curr) / ratingPoints.length;
      movieDocument!.averageRating = averageRating;
      await Movie.findByIdAndUpdate(movieDocument!.id, movieDocument!);
      next();
    } catch (err: any) {
      throw err;
    }
  });

  movieSchema.post("remove", async function (res, next) {
    try {
      console.log("query middleware invoked in movie plugin");
      // user update
      const userDocument = await User.findById(this.user);
      const indexForUser = userDocument!.movies.indexOf(this._id);
      userDocument!.movies.splice(indexForUser, 1);
      await User.findByIdAndUpdate(userDocument!.id, userDocument!);

      // artist update
      this.artists.forEach(async (artist) => {
        const artistDocument = await Artist.findById(artist);
        if (!artistDocument) throw "Something went wrong";
        const index = artistDocument.movies.indexOf(this._id);
        artistDocument.movies.splice(index, 1);
        await Artist.findByIdAndUpdate(artistDocument.id, artistDocument);
      });
      // director update
      const directorDocument = await Director.findById(this.director);
      if (!directorDocument) throw "Something went wrong";
      const indexForDirector = directorDocument.movies.indexOf(this._id);
      directorDocument.movies.splice(indexForDirector, 1);
      await Director.findByIdAndUpdate(directorDocument.id, directorDocument);
      // genre update
      const genreDocument = await Genre.findById(this.genre);
      if (!genreDocument) throw "Something went wrong";
      const indexForGenre = genreDocument.movies.indexOf(this._id);
      genreDocument.movies.splice(indexForGenre, 1);
      await Genre.findByIdAndUpdate(genreDocument.id, genreDocument);
      // comment delete
      await Comment.deleteMany({ movie: this._id });
      // rating delete
      await Rating.deleteMany({ movie: this._id });
      next();
    } catch (err: any) {
      throw err;
    }
  });
};
