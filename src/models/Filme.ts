import { Schema, model, models } from "mongoose";

const FilmeSchema = new Schema(
  {
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    descricao: { type: String },
    imagem: { type: String, required: true },
    gostei: { type: Number, default: 0 },
    naoGostei: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Filme || model("Filme", FilmeSchema);
