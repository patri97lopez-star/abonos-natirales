import {ArrowLeft, ArrowRight, Check, Download, FileText} from 'lucide-react';
import {Link, useRouter} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {getCategoryBySlug, getProductBySlug} from '../data/catalog';
import {MediaFrame} from '../components/MediaFrame';
import {trackEvent} from '../services/analytics';

export function ProductDetailPage({productSlug}: {productSlug: string}) {
  const {openQuoteModal} = useRouter();
  const product = getProductBySlug(productSlug);
  const category = product ? getCategoryBySlug(product.categorySlug) : undefined;

  usePageSeo({
    title: product
      ? `${product.name} | Abonos Naturales Hnos. Aguado`
      : 'Producto no encontrado | Abonos Naturales Hnos. Aguado',
    description: product
      ? product.shortSummary
      : 'Consulta la ficha de productos de Abonos Naturales Hnos. Aguado.',
    path: `/producto/${productSlug}`,
    structuredData: product
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          category: category?.name,
          brand: {
            '@type': 'Brand',
            name: 'Abonos Naturales Hnos. Aguado',
          },
        }
      : undefined,
  });

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-[#1F2421]">
          Producto no encontrado
        </h1>
        <p className="mt-3 text-base text-[#4C544F]">
          No hemos localizado la referencia solicitada en el catálogo.
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
      <section className="border-b border-[#1F2421]/10 bg-[#F3EFE6] py-10 lg:py-14">
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
            {category && (
              <>
                <span aria-hidden="true" className="mx-2">
                  /
                </span>
                <Link
                  to={`/productos/${category.slug}`}
                  className="hover:text-[#1B3B2B]"
                >
                  {category.name}
                </Link>
              </>
            )}
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="font-medium text-[#1F2421]">{product.name}</span>
          </nav>

          <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <MediaFrame
                src={product.image}
                alt={product.imageAlt}
                aspectClass="aspect-[4/3]"
                className="rounded-lg border border-[#1F2421]/10"
                branded
              />
            </div>

            <div className="lg:col-span-6">
              {category && (
                <p className="text-xs font-medium text-[#6E4E37]">
                  {category.name}
                </p>
              )}
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#3A403C]">
                {product.description}
              </p>

              {/* Aplicaciones */}
              <div className="mt-6 border-t border-[#1F2421]/10 pt-6">
                <h2 className="font-display text-base font-semibold text-[#1F2421]">
                  Aplicaciones principales
                </h2>
                <ul className="mt-3 space-y-2">
                  {product.applications.map((app) => (
                    <li
                      key={app}
                      className="flex items-start gap-2.5 text-sm text-[#3A403C]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#5F6F52]"
                        aria-hidden="true"
                      />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Acciones principales */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      intent: 'presupuesto',
                      productInterest: product.name,
                      title: `Solicitar información · ${product.name}`,
                    })
                  }
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1B3B2B] px-6 py-3 text-sm font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
                >
                  Solicitar información
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                {product.datasheetUrl ? (
                  <a
                    href={product.datasheetUrl}
                    download
                    onClick={() =>
                      trackEvent('datasheet_download', {product: product.slug})
                    }
                    className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#1F2421]/20 bg-white px-5 py-3 text-sm font-medium text-[#1F2421] hover:bg-[#FAF8F4]"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Descargar ficha técnica (PDF)
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      openQuoteModal({
                        intent: 'ficha_tecnica',
                        productInterest: product.name,
                        title: `Solicitar ficha técnica · ${product.name}`,
                      })
                    }
                    className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#1F2421]/20 bg-white px-5 py-3 text-sm font-medium text-[#1F2421] hover:bg-[#FAF8F4]"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Solicitar ficha técnica oficial
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formatos y características técnicas */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Formatos disponibles */}
            <div className="rounded-lg border border-[#1F2421]/10 bg-white p-6 lg:col-span-5">
              <h2 className="font-display text-xl font-semibold text-[#1F2421]">
                Formatos disponibles
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4C544F]">
                {product.formatsNote}
              </p>
              <ul className="mt-4 space-y-2 border-t border-[#1F2421]/10 pt-4 text-sm text-[#1F2421]">
                {product.availableFormats.map((fmt) => (
                  <li key={fmt} className="font-medium">
                    · {fmt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Características técnicas (sin datos inventados) */}
            <div className="rounded-lg border border-[#1F2421]/10 bg-white p-6 lg:col-span-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-xl font-semibold text-[#1F2421]">
                  Características técnicas y documentación
                </h2>
                <span className="text-xs text-[#6E4E37]">
                  {product.datasheetStatusLabel}
                </span>
              </div>

              <dl className="mt-5 divide-y divide-[#1F2421]/10 border-t border-[#1F2421]/10">
                {product.technicalSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-12 sm:gap-4"
                  >
                    <dt className="text-xs font-medium text-[#4C544F] sm:col-span-5">
                      {spec.label}
                    </dt>
                    <dd
                      className={`text-sm sm:col-span-7 ${
                        spec.verified
                          ? 'font-medium text-[#1F2421]'
                          : 'italic text-[#6E4E37]'
                      }`}
                    >
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-10">
            <Link
              to={category ? `/productos/${category.slug}` : '/productos'}
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#1B3B2B] hover:text-[#6E4E37]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver a {category ? category.name : 'Productos'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
