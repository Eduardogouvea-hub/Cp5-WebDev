// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
export default function Estoque({ produtos, listaEspera = [] }) {
  // slice cria uma cópia, para o sort não alterar a lista original
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)

  const esperasPorProduto = listaEspera.reduce((acumulador, item) => {
    const chave = String(item.produtoId)

    if (!acumulador[chave]) {
      acumulador[chave] = {
        produtoId: chave,
        produtoNome: item.produtoNome,
        clientes: [],
      }
    }

    acumulador[chave].clientes.push({ nome: item.nome, email: item.email })
    return acumulador
  }, {})

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tabela-moldura" style={{ marginTop: '2rem' }}>
        <h2>Lista de espera</h2>
        {Object.keys(esperasPorProduto).length === 0 ? (
          <p>Nenhum cliente aguardando retorno no momento.</p>
        ) : (
          <table className="tabela">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Nome</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(esperasPorProduto).map((produto) =>
                produto.clientes.map((cliente) => (
                  <tr key={`${produto.produtoId}-${cliente.email}`}>
                    <td>{produto.produtoNome}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
