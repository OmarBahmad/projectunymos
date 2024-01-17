export const formatCPF = (value) => {
  if (!value) return '';

  const cleanedValue = value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

  if (cleanedValue.length <= 11) {
    return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
};

export const formatRG = (value) => {
  if (!value) return '';

  const cleanedValue = value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

  return cleanedValue.replace(/(\d{8})(\d{1})/, '$1-$2');
};

export const formatPhone = (value) => {
  if (!value) return '';

  const cleanedValue = value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

  if (cleanedValue.length <= 10) {
    return cleanedValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    return cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
};

export const formatCEP = (value) => {
  if (!value) return '';

  const cleanedValue = value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

  return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
};