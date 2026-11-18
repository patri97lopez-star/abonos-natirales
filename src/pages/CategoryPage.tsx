import {ArrowLeft, ArrowRight} from 'lucide-react';
import {Link, useRouter} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {
  getCategoryBySlug,
  getProductsByCategory,
  PRODUCT_CATEGORIES,
} from '../data/catalog';
import {MediaFrame} from '../components/MediaFrame';

export function CategoryPage({categorySlug}: {categorySlug: string}) {
  const {openQuoteModal} = useRouter();
  const category = getCategoryBySlug(categorySlug);
  const products = category ? getProductsByCategory(category.slug) : [];

  usePageSeo({
    title: category
      ? category.seoTitle
      : 'Categoría no encontrada | Abonos Naturales Hnos. Aguado',
    description: category
      ? category.seoDescription
      : 'Explora el catálogo de productos de Abonos Naturales Hnos. Aguado.',
    path: `/productos/${categorySlug}`,
  });

  if (!category) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-[#1F2421]">
          Categoría no encontrada
        </h1>
        <p className="mt-3 text-base text-[#4C544F]">
          La categoría solicitada no existe o ha cambiado de ubicación.
        </p>
        <Link
          to="/productos"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1B3B2B] px-5 py-2.5 text-sm font-medium text-[#FAF8F4]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F4]">
      <section className="border-b border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Ruta de navegación" className="text-xs text-[#4C544F]">
            <Link to="/" className="hover:text-[#1B3B2B]">
              Inicio
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <Link to="/productos" className="hover:text-[#1B3B2B]">
              Productos
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="font-medium text-[#1F2421]">{category.name}</span>
          </nav>

          <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs text-[#6E4E37] tabular-nums">
                Categoría {category.order}
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-5xl">
                {category.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3A403C]">
                {category.longDescription}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      intent: 'presupuesto',
                      productInterest: category.name,
                      title: `Presupuesto · ${category.name}`,
                    })
                  }
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1B3B2B] px-5 py-2.5 text-sm font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
                >
                  Solicitar presupuesto de esta gama
                </button>
                <Link
                  to="/productos"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#1F2421]/20 bg-[#FAF8F4] px-5 py-2.5 text-sm font-medium text-[#1F2421] hover:bg-white"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Todo el catálogo
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <MediaFrame
                src={category.image}
                alt={category.imageAlt}
                aspectClass="aspect-[4/3]"
                className="rounded-lg border border-[#1F2421]/10"
                branded
              />
            </div>
          </div>
        </div>
      </section>

      {/* Productos de la categoría */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-[#1F2421]">
            Referencias en {category.name}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
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
                  <h3 className="font-display text-xl font-semibold text-[#1F2421]">
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
                      Ver ficha técnica
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Navegación a otras categorías */}
      <section className="border-t border-[#1F2421]/10 bg-[#F3EFE6] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-semibold text-[#1F2421]">
            Otras categorías del catálogo
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_CATEGORIES.filter((c) => c.slug !== category.slug).map(
              (other) => (
                <Link
                  key={other.slug}
                  to={`/productos/${other.slug}`}
                  className="flex items-center justify-between rounded-md border border-[#1F2421]/10 bg-[#FAF8F4] px-4 py-3 text-sm font-medium text-[#1F2421] hover:border-[#1B3B2B]"
                >
                  <span className="truncate">{other.name}</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0 text-[#1B3B2B]" aria-hidden="true" />
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
