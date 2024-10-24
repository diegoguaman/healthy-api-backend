import mongoose, { Schema, Document, Model } from "mongoose";

// Definir la interfaz de la receta que extiende Document
export interface IRecipe extends Document {
  name: string;
  urlImage: string;
  phrase: string;
  preparationTime: number;
  ingredients: string[];
  people: number;
  steps: string[];
  caloricRate: number;
  isFavorite?: boolean;
  type?: "desayuno" | "comida" | "cena";
}

// Definir el esquema de Mongoose para el modelo de Receta
const RecipeSchema: Schema<IRecipe> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    urlImage: {
      type: String,
      required: true,
    },
    phrase: {
      type: String,
      required: true,
    },
    preparationTime: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    people: {
      type: Number,
      required: true,
    },
    steps: {
      type: [String],
      required: true,
    },
    caloricRate: {
      type: Number,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["desayuno", "comida", "cena"],
    },
  },
  {
    timestamps: true, // Agrega campos de createdAt y updatedAt automáticamente
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v; // Elimina el campo __v de la respuesta JSON
      },
    },
  }
);

// Exportar el modelo de Receta
const Recipe: Model<IRecipe> = mongoose.model<IRecipe>("Recipe", RecipeSchema);
export default Recipe;
