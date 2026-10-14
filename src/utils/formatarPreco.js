export function parsePreco(valor) {
  if (valor === null || valor === undefined || valor === '') return 0

  if (typeof valor === 'number' && Number.isFinite(valor)) return valor

  const texto = String(valor).trim().replace(/[^\d,.-]/g, '')

  if (!texto) return 0

  if (texto.includes(',') && texto.includes('.')) {
    return Number(texto.replace(/\./g, '').replace(',', '.'))
  }

  if (texto.includes(',')) {
    return Number(texto.replace(',', '.'))
  }

  return Number(texto)
}

export function formatarPreco(valor) {
  return parsePreco(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
