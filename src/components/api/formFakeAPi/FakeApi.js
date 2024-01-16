const fakeApi = {
  getItems: async (tableName) => {
    const tableData = {
      maritalStatus: [
        { label: "Casado", value: "Casado" },
        { label: "Solteiro", value: "Solteiro" },
        { label: "Divorciado", value: "Divorciado" },
        { label: "Viúvo", value: "Viúvo" },
        { label: "Separado", value: "Separado" },
      ],
      gender: [
        { label: "Homem", value: "Homem" },
        { label: "Mulher", value: "Mulher" },
        { label: "Outro", value: "Outro" },
      ],
      proposalStatus: [
        { label: "Concluido", value: "finished" },
        { label: "Em espera", value: "awaiting" },
      ],
      filterOptions: [
        { label: "CPF", value: "document" },
        { label: "Nome", value: "name" },
        { label: "Cidade", value: "city" },
        { label: "Proposta", value: "proposal" },
      ]
    };
    return tableData[tableName] || [];
  },
};

export default fakeApi;
