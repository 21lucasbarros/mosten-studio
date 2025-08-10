import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";

interface ModalCadastroProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    titulo: string;
    genero: string;
    imagem: string;
    descricao?: string;
  }) => void;
}

const cadastroSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório."),
  genero: z.string().min(1, "Gênero é obrigatório."),
  imagem: z.string().url("Insira uma URL válida."),
  descricao: z.string().optional(),
});

type CadastroSchema = z.infer<typeof cadastroSchema>;

export default function ModalCadastro({
  isOpen,
  onClose,
  onSubmit,
}: ModalCadastroProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CadastroSchema>({
    resolver: zodResolver(cadastroSchema),
  });

  const onFormSubmit = (data: CadastroSchema) => {
    onSubmit(data);
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex flex-row justify-between align-baseline mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Cadastrar Filme / Série
          </h2>

          <button className="cursor-pointer" onClick={onClose}>
            <X height={26} width={26} />
          </button>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="titulo"
          >
            Título<span className="text-red-500">*</span>
          </label>
          <input
            id="titulo"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#602cb5] transition ${
              errors.titulo ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Digite o título do filme"
            {...register("titulo")}
          />
          {errors.titulo && (
            <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="genero"
          >
            Gênero<span className="text-red-500">*</span>
          </label>
          <input
            id="genero"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#602cb5] transition ${
              errors.genero ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Ex: Ação, Drama, Comédia"
            {...register("genero")}
          />
          {errors.genero && (
            <p className="text-red-500 text-xs mt-1">{errors.genero.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="imagem"
          >
            Imagem (URL)<span className="text-red-500">*</span>
          </label>
          <input
            id="imagem"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#602cb5] transition ${
              errors.imagem ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="https://exemplo.com/imagem.jpg"
            {...register("imagem")}
          />
          {errors.imagem && (
            <p className="text-red-500 text-xs mt-1">{errors.imagem.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="descricao"
          >
            Descrição <span className="text-gray-400">(opcional)</span>
          </label>
          <textarea
            id="descricao"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#602cb5] transition resize-none"
            placeholder="Adicione uma breve descrição do filme"
            rows={3}
            {...register("descricao")}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit(onFormSubmit)}
            className="bg-[#602cb5] text-white px-8 py-2 rounded-md cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
