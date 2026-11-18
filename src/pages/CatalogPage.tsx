import {useMemo, useState} from 'react';
import {ArrowLeft, ArrowRight, Search, X} from 'lucide-react';
import {Link, useRouter} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {PRODUCT_CATEGORIES, PRODUCTS} from '../data/catalog';
import {MediaFrame} from '../components/MediaFrame';
import {trackEvent} from '../services/analytics';

const PAGE_SIZE = 6;

export function CatalogPage() {
  const {openQuoteModal} = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  usePageSeo({
    title: 'Catálogo de Productos | Abonos Naturales Hnos. Aguado',
    description:
      'Catálogo profesional: piedra volcánica, marmolina, canto rodado, sustratos (orquídeas, bonsái, cactus), mantillos, abonos naturales, semilla de césped, malla geotextil, zahorra, jabre y arena de río.',
    path: '/productos',
  });

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.categorySlug === selectedCategory;
      if (!matchesCategory) {
        return false;
      }
      if (!query) {
        return true;
      }
      const categoryName =
        PRODUCT_CATEGORIES.find((c) => c.slug === product.categorySlug)?.name || '';
      const haystack = [
        product.name,
        product.shortSummary,
        product.description,
        categoryName,
        ...product.applications,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, safePage]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    if (value.trim().length >= 3) {
      trackEvent('catalog_search', {search_term: value.trim()});
    }
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(clamped);
    const gridEl = document.getElementById('catalogo-resultados');
    if (gridEl) {
      gridEl.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <div className="bg-[#FAF8F4]">
      {/* Cabecera catálogo */}
      <section className="border-b border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[#5F6F52]">
            Catálogo de fabricante · Uso particular y profesional
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-5xl">
            Productos para suelo, jardinería y cultivo
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3A403C]">
            Explora todas nuestras referencias —desde sustratos especializados,
            mantillos y enmiendas orgánicas hasta piedra volcánica, marmolina,
            canto rodado, semilla de césped, malla geotextil, zahorra, jabre y
            arena de río— o filtra por categoría.
          </p>

          {/* Buscador y filtros por categoría */}
          <div className="mt-8 space-y-4">
            <div className="relative max-w-xl">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4C544F]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Buscar piedra volcánica, marmolina, orquídeas, bonsái, jabre..."
                aria-label="Buscar productos en el catálogo"
                className="h-11 w-full rounded-md border border-[#1F2421]/20 bg-white pl-10 pr-10 text-sm text-[#1F2421] placeholder:text-[#4C544F]/70 focus:border-[#1B3B2B] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-[#4C544F] hover:text-[#1F2421]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Botones de filtro por categoría */}
            <div
              role="group"
              aria-label="Filtrar productos por categoría"
              className="flex flex-wrap gap-2"
            >
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`min-h-10 rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#1B3B2B] text-[#FAF8F4]'
                    : 'border border-[#1F2421]/15 bg-[#FAF8F4] text-[#1F2421] hover:bg-white'
                }`}
              >
                Todas las categorías ({PRODUCTS.length})
              </button>
              {PRODUCT_CATEGORIES.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`min-h-10 rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.slug
                      ? 'bg-[#1B3B2B] text-[#FAF8F4]'
                      : 'border border-[#1F2421]/15 bg-[#FAF8F4] text-[#1F2421] hover:bg-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Listado de productos filtrados y paginados */}
      <section id="catalogo-resultados" className="py-14 lg:py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-[#1F2421]">
              {selectedCategory === 'all'
                ? 'Referencias disponibles'
                : PRODUCT_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
            </h2>
            <p className="font-mono text-xs text-[#4C544F] tabular-nums">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1
                ? 'producto encontrado'
                : 'productos encontrados'}{' '}
              · Página {safePage} de {totalPages}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-lg border border-[#1F2421]/10 bg-[#F3EFE6] p-10 text-center">
              <p className="font-display text-lg font-semibold text-[#1F2421]">
                No hay productos que coincidan con &ldquo;{searchQuery}&rdquo;.
              </p>
              <p className="mt-2 text-sm text-[#4C544F]">
                También fabricamos mezclas y formulaciones a medida bajo
                pedido profesional.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setCurrentPage(1);
                  }}
                  className="min-h-10 rounded-md border border-[#1F2421]/20 bg-white px-4 py-2 text-sm font-medium text-[#1F2421] hover:bg-[#FAF8F4]"
                >
                  Restablecer filtros
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      intent: 'presupuesto',
                      productInterest: searchQuery || 'Mezcla personalizada',
                      title: 'Consultar producto o mezcla a medida',
                    })
                  }
                  className="min-h-10 rounded-md bg-[#1B3B2B] px-4 py-2 text-sm font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
                >
                  Consultar con fábrica
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedProducts.map((product) => {
                  const category = PRODUCT_CATEGORIES.find(
                    (c) => c.slug === product.categorySlug
                  );
                  return (
                    <article
                      key={product.slug}
                      className="flex flex-col overflow-hidden rounded-lg border border-[#1F2421]/10 bg-white"
                    >
                      <Link to={`/producto/${product.slug}`} className="block">
                        <MediaFrame
                          src={product.image}
                          alt={product.imageAlt}
                          aspectClass="aspect-[4/3]"
                          branded
                        />
                      </Link>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-xs font-medium text-[#6E4E37]">
                          {category?.name}
                        </p>
                        <h3 className="mt-1.5 font-display text-xl font-semibold text-[#1F2421]">
                          <Link
                            to={`/producto/${product.slug}`}
                            className="hover:text-[#1B3B2B]"
                          >
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4C544F]">
                          {product.shortSummary}
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-[#1F2421]/10 pt-4">
                          <Link
                            to={`/producto/${product.slug}`}
                            className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#1B3B2B] hover:text-[#6E4E37]"
                          >
                            Ver ficha
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              openQuoteModal({
                                intent: 'presupuesto',
                                productInterest: product.name,
                                title: `Solicitar información · ${product.name}`,
                              })
                            }
                            className="min-h-10 text-xs font-medium text-[#4C544F] underline underline-offset-4 hover:text-[#1B3B2B]"
                          >
                            Solicitar info
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Paginación (Anterior · 1 · 2 · 3 · 4 · Siguiente) */}
              {totalPages > 1 && (
                <nav
                  aria-label="Paginación del catálogo"
                  className="mt-12 flex flex-wrap items-center justify-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-[#1F2421]/20 bg-white px-4 py-2 text-sm font-medium text-[#1F2421] transition-colors hover:bg-[#F3EFE6] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Anterior
                  </button>

                  {Array.from({length: totalPages}, (_, idx) => idx + 1).map(
                    (pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => goToPage(pageNumber)}
                        aria-current={safePage === pageNumber ? 'page' : undefined}
                        className={`inline-flex h-10 min-w-10 items-center justify-center rounded-md px-3 font-mono text-sm font-medium tabular-nums transition-colors ${
                          safePage === pageNumber
                            ? 'bg-[#1B3B2B] text-[#FAF8F4]'
                            : 'border border-[#1F2421]/20 bg-white text-[#1F2421] hover:bg-[#F3EFE6]'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-[#1F2421]/20 bg-white px-4 py-2 text-sm font-medium text-[#1F2421] transition-colors hover:bg-[#F3EFE6] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Siguiente
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      {/* Índice de categorías con páginas individuales */}
      <section className="border-t border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-[#1F2421]">
            Explorar por categoría específica
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/productos/${cat.slug}`}
                className="flex items-center justify-between rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-4 transition-colors hover:border-[#1B3B2B]"
              >
                <div>
                  <span className="font-mono text-xs text-[#6E4E37] tabular-nums">
                    {cat.order}
                  </span>
                  <p className="mt-0.5 font-display text-sm font-semibold text-[#1F2421]">
                    {cat.name}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#1B3B2B]" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
