import { useState } from 'react'
import { Link, useParams } from 'react-router'

export default function PaginaProduto({ produtos, onAdicionar, onAdicionarEspera }) {
  const { id } = useParams()
  const [formulario, setFormulario] = useState({ nome: '', email: '' })
  const [mensagemEspera, setMensagemEspera] = useState('')
  const produto = produtos.find((item) => String(item.id) === String(id))

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const preco = Number(produto.price ?? 0)

  function handleSubmitListaEspera(evento) {
    evento.preventDefault()

    if (!formulario.nome.trim() || !formulario.email.trim()) {
      setMensagemEspera('Preencha nome e e-mail para entrar na lista de espera.')
      return
    }

    onAdicionarEspera(produto, formulario)
    setMensagemEspera(`Cadastrado com sucesso. Você vai receber um aviso quando ${produto.title} voltar.`)
    setFormulario({ nome: '', email: '' })
  }

  const relacionados = produtos
    .filter(
      (item) =>
        Number(item.estoque) > 0 &&
        String(item.category) === String(produto.category) &&
        String(item.id) !== String(produto.id)
    )
    .slice(0, 4)

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">R$ {preco.toFixed(2).replace('.', ',')}</p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">{produto.estoque} unidades disponíveis</p>

          {produto.estoque === 0 && (
            <form className="lista-espera" onSubmit={handleSubmitListaEspera}>
              <h2>Produto esgotado</h2>
              <p>Avise-me quando voltar</p>

              <label className="campo">
                <span>Nome</span>
                <input
                  type="text"
                  value={formulario.nome}
                  onChange={(evento) =>
                    setFormulario((atual) => ({ ...atual, nome: evento.target.value }))
                  }
                  placeholder="Seu nome"
                />
              </label>

              <label className="campo">
                <span>E-mail</span>
                <input
                  type="email"
                  value={formulario.email}
                  onChange={(evento) =>
                    setFormulario((atual) => ({ ...atual, email: evento.target.value }))
                  }
                  placeholder="seu@email.com"
                />
              </label>

              <button type="submit" className="botao botao-secundario">
                Quero receber o aviso
              </button>

              {mensagemEspera && <p className="mensagem-cupom">{mensagemEspera}</p>}
            </form>
          )}

          {produto.estoque > 0 && (
            <button
              className="botao botao-grande"
              onClick={() => onAdicionar(produto)}
              disabled={produto.estoque === 0}
            >
              Adicionar ao carrinho
            </button>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => (
          <article key={item.id} className="card">
            <Link to={`/produto/${item.id}`} className="card-link">
              <div className="card-imagem-moldura">
                <img src={item.image} alt={item.title} className="card-imagem" />
              </div>
              <h3 className="card-titulo">{item.title}</h3>
            </Link>
            <p className="preco">R$ {Number(item.price ?? 0).toFixed(2).replace('.', ',')}</p>
            <button className="botao" onClick={() => onAdicionar(item)} disabled={Number(item.estoque) === 0}>
              Adicionar ao carrinho
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
