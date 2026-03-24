"use client";

import { useState } from "react";

interface CreateRequestPayload {
  category: string;
  title: string;
  type: string;
  level: string;
  description?: string;
}

export default function NovaSolicitacaoPage() {
  const [form, setForm] = useState<CreateRequestPayload>({
    category: "APOs",
    title: "",
    type: "",
    level: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      status: "Pendente",
      createdAt: new Date().toISOString(),
    };

    try {
      // FUTURO:
      // await fetch("/api/requests", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      console.log("Payload enviado:", payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 p-6 max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Nova solicitação
        </h1>
        <p className="text-sm text-gray-500">
          Preencha os dados abaixo para criar uma nova solicitação
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-6 space-y-5"
      >
        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 text-sm"
          >
            <option value="APOs">APOs</option>
          </select>
        </div>

        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Título da solicitação
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-lg border-gray-300 text-sm"
            placeholder="Ex: Publicação de Livro"
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo da solicitação
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-lg border-gray-300 text-sm"
          >
            <option value="">Selecione</option>
            <option value="Publicação de Livro">Publicação de Livro</option>
            <option value="Artigo em Revista">Artigo em Revista</option>
            <option value="Registro de Software">Registro de Software</option>
            <option value="Depósito de Patente">Depósito de Patente</option>
          </select>
        </div>

        {/* Nível */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nível
          </label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-lg border-gray-300 text-sm"
          >
            <option value="">Selecione</option>
            <option value="Graduação">Graduação</option>
            <option value="Pós Graduação">Pós Graduação</option>
          </select>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descrição (opcional)
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full rounded-lg border-gray-300 text-sm"
            placeholder="Detalhes adicionais da solicitação"
          />
        </div>

        {/* Ações */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="text-sm text-gray-600 hover:underline"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Criar solicitação"}
          </button>
        </div>
      </form>
    </main>
  );
}