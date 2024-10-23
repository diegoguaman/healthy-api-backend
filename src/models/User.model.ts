import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

const ROUNDS = 10;

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatarUrl?: string;
    gender?: string;
    weight?: number;
    height?: number;
    objetive?: string;
    ability?: string;
    typeDiet?: string;
    alergic?: string;
    checkPassword(passwordToCompare: string): Promise<boolean>;
  }

  const UserSchema: Schema<IUser> = new Schema(
    {
      name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        required: [true, "required field"],
        match: [EMAIL_PATTERN, "invalid email pattern"],
        trim: true,
        lowercase: true,
        unique: true,
      },
      password: {
        type: String,
        required: [true, "required field"],
        minlength: [8, "invalid length"],
      },
      avatarUrl: {
        type: String,
        default:
          "https://res.cloudinary.com/plasoironhack/image/upload/v1713603564/ironhack/book-club/ywkmjbnwfy1vdhta1qwd.png",
      },
      gender: {
        type: String,
      },
      weight: {
        type: Number,
        min: 0,
      },
      height: {
        type: Number,
        min: 0,
      },
      objetive: {
        type: String,
      },
      ability: {
        type: String,
      },
      typeDiet: {
        type: String,
      },
      alergic: {
        type: String,
      },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
          delete ret.__v;
          delete ret.password; // No mostrar la contraseña en la respuesta JSON
        },
      },
    }
  );
  
  // Hook pre-save para hashear la contraseña antes de guardar
  UserSchema.pre<IUser>("save", function (next) {
    if (this.isModified("password")) {
      bcrypt
        .hash(this.password, ROUNDS)
        .then((hash) => {
          this.password = hash;
          next();
        })
        .catch(next);
    } else {
      next();
    }
  });
  
  // Método para comparar contraseñas
  UserSchema.methods.checkPassword = function (
    passwordToCompare: string
  ): Promise<boolean> {
    return bcrypt.compare(passwordToCompare, this.password);
  };
  
  // Exportar el modelo de Usuario
  const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
  export default User;